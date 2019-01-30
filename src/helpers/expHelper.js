const util = require('util')
const exec = util.promisify(require('child_process').execFile)
const { Task } = require('../models/index')

module.exports = class Exploit {
  constructor (task) {
    this._id = task.id
    this._target = task.target
    Task.update({ status: 'pending', rawdata: '' }, { where: { id: task.id } })
  }
  start () {
    console.log('autoExploit task start...')
    exec('python3', ['AutoScan.py', this._target], { cwd: 'module/exploit' })
      .then((stdout, stderr) => {
        console.log('nmap scan exploit done.')
        Task.update({ status: 'done', rawdata: stdout.toString() }, { where: { id: this._id } })
      })
      // .catch(err => Task.update({ status: 'error', rawdata: err.message }, { where: { id: this._id } }))
  }
}
