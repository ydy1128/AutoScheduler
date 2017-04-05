var spawn = require('child_process').spawn,
py = spawn('python', ['crawler.py']);

py.on('close', function (code) {
  console.log('child process exited with code ' + code);
});
