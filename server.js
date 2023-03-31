const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const gu = require('./gru');
const session = require('express-session');
const { off } = require('process');

var usname ="";







app.use(session({
  secret: 'mysecret', 
  resave: false,
  saveUninitialized: false
}));





app.get('/', (req, res) => {
    var message = "";
    res.send(`
      <form action="/login" method="post">
        <input type="text" name="username" placeholder="Username">
        <input type="password" name="password" placeholder="Password">
        <button type="submit">Login</button>
      </form>
      <p>${message}</p>
    `);
  });

  


  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    req.session.username = username;
    usname=req.session.username;
    if(true==gu.login(usname,password)){
        fs.readFile('index.html', (err, data) => {
            if (err) {
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('404 Not Found');
            } else {
              const hh = gu.mag(req.session.username);
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(hh);
              res.end();
            }
          });
    }else{
message='wrong'
res.send(`
<form action="/login" method="post">
  <input type="text" name="username" placeholder="Username">
  <input type="password" name="password" placeholder="Password">
  <button type="submit">Login</button>
</form>
<p>${message}</p>
`);

    }



  




})

app.post("/submit-form", (req, res) => {


    const fileName = `./user/${req.session.username}.txt`;
    const { name } = req.body;
const esname = req.session.username;


  const filepath = `./grou/${name}.txt`;
 
    gu.add(filepath, esname);
    gu.add(fileName, name);
    const hh = gu.mag(req.session.username);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(hh);
    res.end();
 
    
  

});

app.post("/grbutton",(req,res)=>{
  const hh = gu.mag(req.session.username);
const {grname} = req.body;
var gg =gu.beg(grname,hh,req.session.username)
res.writeHead(200, { "Content-Type": "text/html" });
res.write(gg);
res.end();


})



app.post("/submitgr",(req,res)=>{
  var ero=false;
  const { lend, bor,money,group } = req.body;
  const b =fs.readFileSync(`./grou/${group}.txt`,'utf-8')
  const t=b.split('\n');
if(lend==bor){
ero =true;
}

if (/^\d+$/.test(money)) {
}else{
  ero = true;
}

if (t.includes(lend)) {
} else {
  ero = true;
}
if (t.includes(bor)) {
} else {
  ero = true;
}


if(ero ==true){
  var hh = gu.mag(req.session.username);
  var gg =gu.beg(group,hh,req.session.username)
  gg=gg.replace('<p style="display: none;">${message}</p>','<p>error</p>')
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(hh);
  res.end();



}else{
  gu.bor( lend, bor,money,group,req.session.username )
  var hh = gu.mag(req.session.username);
  var gg =gu.beg(group,hh,req.session.username)
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(gg);
  res.end();

}




})










const server = http.createServer(app);



const port = 4000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
