import express from "express";
var app = express();
var port = process.env.PORT || 3000;
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    const host = req.header('host').split('.');
    let isWww = null;
    if (host[0] === 'www')
      isWww = host.pop(0);
    const redirectHost = host.join('.')
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${redirectHost}${req.url}`)
    else if (isWww)
      res.redirect(`https://${redirectHost}${req.url}`)
    else
      next()
  })
}
app.use('/', express.static('dist'));
var server = app.listen(port);
console.log("listening on " + port)
