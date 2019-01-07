process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster');

/*if (cluster.isMaster) {
  cluster.fork();
} else {}*/

const express = require('express');
const crypto = require('crypto');
const app = express();
const Worker = require('webworker-threads').Worker;


/*function doWork(duration) {
  const start = Date.now();
  while(Date.now() - start < duration) {}
}*/

app.get('/', (req, res) => {
    //doWork(5000);
    const worker = new Worker(function() {
      this.onmessage = function() {
        let counter = 0;
        while (counter < 1e9) {
          counter++;
        }
        postMessage(counter);
      }
    });

    worker.onmessage = function(message) {
      console.log(message.data);
      res.send(''+message.data);
    }

    worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('That was fast!');
})

app.listen(3000);
