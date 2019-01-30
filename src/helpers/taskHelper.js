const Nmap = require('./nmapHelper')
const W3af = require('./w3afHelper')
const Exploit = require('./expHelper')


const { Task } = require('../models/index')
let _checkTaskHandler = null

module.exports = async task => {
  if (_checkTaskHandler === null) {
    _checkTaskHandler = setInterval(_checkTask, 10000)
  }
  if (task.scanner === 'nmap') {
    console.log('a')
    const nmap = new Nmap(task)
    nmap.start()
  } else if (task.scanner === 'w3af') {
    console.log('b')
    const w3af = new W3af(task)
    w3af.start()
  } else if (task.scanner === 'exploit') {
    console.log('c')
    const exp = new Exploit(task)
    exp.start()
  } else {
    throw Error(`Scanner ${task.scanner} not found.`)
  }
}

const _checkTask = () => {
  Task.find({ where: { status: 'pending' } })
    .then(task => {
      if (task === null) {
        clearInterval(_checkTaskHandler)
        _checkTaskHandler = null
        return
      }
      // TODO
      ;
    })
}
