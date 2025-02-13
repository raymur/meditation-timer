import express from "express";
var app = express();
var port = process.env.PORT || 3000;
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}
app.use('/', express.static('dist'));
var server = app.listen(port);
console.log("listening on " + port)
