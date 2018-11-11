const { remote } = require('electron')
const marked = remote.require('marked')
const convert = () => document.getElementById('converted').innerHTML = marked(document.getElementById('editor').value)