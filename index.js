// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
// const nodemailer = require('nodemailer');
const superAdminRoutes = require('./routes/superAdminRoutes');

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/superadmins', superAdminRoutes);


// Routes
// app.use('/api', routes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
