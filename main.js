const { app, BrowserWindow } = require('electron')
const pug = require('pug')
const fs = require('fs')
const tempy = require('tempy')

let win

function preparePug (filepath, vars={}) {
  const newFilepath = tempy.file({ extension: 'html' })
  fs.writeFileSync(newFilepath, pug.compileFile(filepath)(vars))
  return newFilepath
}

function createWindow () {
  win = new BrowserWindow({ width: 1600, height: 800 })
  win.loadFile(preparePug(`${__dirname}/pug/index.pug`))
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})