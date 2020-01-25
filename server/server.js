const expressStarter = require('express-starter');
const PORT = process.env.PORT || 3000

expressStarter.start(PORT,
  (express, app, io) => {
    // preload
    // set up routes and middleware before loading configs
    app.use((req, res, next) => {
      console.log(`Request @ ${req.originalUrl}`);
      next();
    });
    app.use(express.static('public'));
  },
  (express, app, io) => {
    // postload
    // could catch unhandled requests here
    app.use((req, res, next) => {
      if(res.responsePromise instanceof Promise) {
        res.responsePromise
          .then((response) => res.send(response))
          .catch((error) => res.status(500).send(error));
      } else {
        next();
      }
    })
  });
