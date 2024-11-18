const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(5000, () => console.log(`Server running on http://localhost:5000`));
