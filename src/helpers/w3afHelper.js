const Docker = require('dockerode')
const getStream = require('get-stream')
const { JSDOM } = require('jsdom')
const Sqrl = require('squirrelly')

const fs = require('fs')
const { Task } = require('../models/index')

const docker = new Docker()

const myTemplate = fs.readFileSync('./module/w3af/template.html').toString()

Sqrl.defineHelper('sum', (...args) => args.reduce((pV, cV) => pV + cV))
Sqrl.defineHelper('avg', (num, total) => num * 100 / total)
const compiledTemplate = Sqrl.Compile(myTemplate)

module.exports = class W3af {
  constructor (task) {
    this._id = task.id
    this._target = task.target
    this._filename = 'myOutput.html'
    Task.update({ status: 'pending', rawdata: '' }, { where: { id: task.id } })
  }

  start () {
    console.log('starting container')
    docker.createContainer({
      Image: 'gryffin-w3af',
      // Cmd: [ 'ls' ],
      Env: [ `TARGET=${this._target}` ],
      Tty: true
    }).then(container => {
      console.log('create container')
      container.attach({ stream: true, stdout: true, stderr: true })
        .then(stream => {
          this._filename = `output/${this._target}-${new Date().getTime()}-report.html`
          console.log('scanning..')
          getStream(stream)
            .then(str => {
              console.log('All writes are now complete.')
              Task.update({ status: 'done', rawdata: `/${this.genReport(str)}` }, { where: { id: this._id } })
            })
        })
      return container.start()
    })
  }

  genReport (html) {
    const dom = new JSDOM(html)
    // console.log(html)
    const serviryList = dom.window.document.querySelectorAll('b>h3')
    const infoCount = [...serviryList].filter(x => x.textContent.toLowerCase() === 'info').length
    const lowCount = [...serviryList].filter(x => x.textContent.toLowerCase() === 'low').length
    const mediumCount = [...serviryList].filter(x => x.textContent.toLowerCase() === 'medium').length
    const highCount = [...serviryList].filter(x => x.textContent.toLowerCase() === 'high').length

    // console.log(myTemplate)
    const infoHTMl = Sqrl.Render(compiledTemplate, { infoCount: infoCount, lowCount: lowCount, mediumCount: mediumCount, highCount: highCount })
    dom.window.document.querySelector('div.thumbnail>div.row').insertAdjacentHTML('afterend', infoHTMl)
    fs.writeFileSync(`public/${this._filename}`, dom.serialize())
    return `${this._filename}`
  }
}
