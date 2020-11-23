const express = require('express');
const app = express();
const PORT = 5000;
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./db');

module.exports = app;

if (process.env.NODE_ENV === 'test') {
    after('close the session store', () => sessionStore.stopExpiringSessions())
}
  
const createApp = () => {
    // logging middleware
    app.use(morgan('dev'))
  
    // body parsing middleware
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
  
    // auth and api routes
    app.use('/auth', require('./auth'))
    app.use('/api', require('./api'))
  
    // static file-serving middleware
    app.use(express.static(path.join(__dirname, '../public')));
  
    // any remaining requests with an extension (.js, .css, etc.) send 404
    app.use((req, res, next) => {
      if (path.extname(req.path).length) {
        const err = new Error('Not found')
        err.status = 404
        next(err)
      } else {
        next()
      }
    })
  
    // sends index.html in case the user requests a resource currently not in the public folder
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/public/index.html'));
    })
  
    // error handling endware
    app.use((err, req, res, next) => {
      console.error(err)
      console.error(err.stack)
      res.status(err.status || 500).send(err.message || 'Internal server error.')
    })
  }
  
  const startListening = () => {
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () =>
      console.log(`Listening on port ${PORT}`)
    )  
}
  
const syncDb = () => db.sync()
  
async function bootApp() {
    await syncDb()
    await createApp()
    await startListening()
}
  
if (require.main === module) {
    bootApp()
  } else {
    createApp()
}
