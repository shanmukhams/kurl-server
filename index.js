const express = require('express');
const app = express();


const logger = require('./services/startup/logging');
require('./services/startup/db');
require('./services/startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));

