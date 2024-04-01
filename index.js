const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    process.env.UV_THREADPOOL_SIZE = 16;
    const express = require('express');
    const cors = require('cors');
    const { router } = require('./routes/routes');
    const bodyParser = require('body-parser');
    const path = require('path');

    const app = express();
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(router);
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    const port = process.env.PORT || 4500;
    app.listen(port, () => {
        console.log(`Worker ${process.pid} is running`);
        console.log(`app running on port ${port}...`);
    });
}
