const Docker = require('dockerode')
const getStream = require('get-stream')
const fs = require('fs')
const { Task } = require('../models/index')

const docker = new Docker()

module.exports = class Nmap {
  constructor (task) {
    this._id = task.id
    this._target = task.target
    Task.update({ status: 'pending', rawdata: '' }, { where: { id: task.id } })
  }
  start () {
    console.log('nmap start scanning...')
    console.log('starting container')
    docker.createContainer({
      Image: 'auto-nmap',
      Cmd: [ 'python', 'AutoNMAP.py', this._target ],
      Tty: true
    }).then(container => {
      console.log('create container')
      container.attach({ stream: true, stdout: true, stderr: true })
        .then(stream => {
          this._filename = `output/${this._target}-${new Date().getTime()}.xml`
          console.log('scanning..')
          getStream(stream)
            .then(str => {
              console.log('All writes are now complete.')
              fs.writeFileSync(`public/${this._filename}`, str)
              Task.update({ status: 'done', rawdata: `/${this._filename}` }, { where: { id: this._id } })
            })
        })
      return container.start()
    })
  }
}
