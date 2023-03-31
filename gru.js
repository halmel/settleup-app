const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


exports.add= function(path,username){
if (fs.existsSync(path)) {
    const data = fs.readFileSync(path,'utf-8')
const lines=data.split('\n');
var x =true;
for (let i = 0; i < lines.length; i++) {

    if (lines[i]==username){



        x=false;
    }




  }

if (x){
    
    const tea = data+`${username}\n`;
    fs.writeFileSync(path,tea)
    return
}else{
    return
}
}else{
fs.writeFileSync(path,`${username}\n`)



}
}











exports.mag=function(username){


    const fileName = `./user/${username}.txt`;
    let fileContents = fs.readFileSync(fileName, 'utf8')
    let pata =fs.readFileSync('./index.html','utf-8')
    pata=pata.replace('${username}',username)





        const lins=fileContents.split('\n');
        var dgrup="";
        if ((lins.length-1)==0){
            return fileContents;
        }else{
          for (let i = 1; i < lins.length - 1; i++) {
            if (lins[i]==NaN){

            }else{
                dgrup +=`   <form action="/grbutton" method="post">
                <input type="hidden" name="grname" value="${lins[i]}" style="display: none;"/>
                <button type="submit">${lins[i]}</button>
            </form>`;

            }
          }

          const mpata = pata.replace(
            '<div class="bar-item">no grups</div>',
            dgrup
          );

          return mpata;
        }

        
    

    }




    exports.login= function(username, password) {
        const fileName = `./user/${username}.txt`;
      if (fs.existsSync(fileName)) {
        const filecontents = fs.readFileSync(fileName, 'utf-8');
      const lel = filecontents.split('\n');
      const fileContents =lel[0];
      
      
      
      
         if (fileContents==password){
            return true;
          }else {
            return false;
          }
        }
      
          else { 
                fs.writeFileSync(fileName, `${password}\n`, (err) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).send('Failed to save username');
                  }
                  return true;
                });
              }
        
      
      
      
      };

      exports.beg=function(name,data,username){
        var l =`<datalist id="myList">
        <option value="Option 1">
      </datalist>`
        let c =fs.readFileSync(`./grou/${name}.txt`,'utf-8');
        const r = c.split('\n')
        var f;
for (let index = 0; index <r.length; index++) {
  const element = r[index];

  f+=`<option value="${element}">`
}
l=l.replace('<option value="Option 1">',f)










        const basic =`        <div class="trens-box">
        <div class="trens">lender</div><div class="trens">borower</div><div class="trens">money</div><div class="trens">submiter</div>
        <div class="trens">no money lend</div>
    <form action="/submitgr" method="POST"id="forma">
      <input type="text" name="lend" placeholder="lender" list="myList">
      <input type="text" name="bor" placeholder="boroer" list="myList">
      <input type="text" name="money" placeholder="amount">
      <input type="hidden" value="${name}" name="group" style="display: none;">
      <button type="submit" >add borroing</button>
    </form>
    ${l}`;
        const fileName = `./trens/${name}.txt`;
        var l =data.replace(`<!--form-->`,basic);
        if(fs.existsSync(fileName)){
          let eta =fs.readFileSync(fileName, 'utf-8');
          if(eta == 0) {
            return l;



          }else{
            let lines = eta.split('\n')
            var x = data.replace(`<!--form-->`,basic);
            var y ='';
            var k=new Array(r.length).fill(0);
            for (let i = 0; i < lines.length -1; i++){
              var lins = lines[i].split(' ');
              k = k.map(str => parseInt(str));
y+=`<div class="trens">${lins[0]}</div><div class="trens">${lins[1]}</div><div class="trens">${lins[2]}</div><div class="trens">${lins[3]}</div>`
k[r.indexOf(`${lins[0]}`)]+=parseInt(lins[2]);
k[r.indexOf(`${lins[1]}`)]-=parseInt(lins[2]);



            }
            var juj;
            for(let i = 0; i < r.length -1; i++){
            juj+=`<h1>${r[i]}: ${k[i]}</h1>;
            `
            }
            juj=juj.replace('undefined','')
            var htr=`<div class="balance">
            <h1>balance:</h1>
            ${juj}</div>`
            y+=htr;
            x=x.replace('<div class="trens">no money lend</div>',y)
            return x;



          }
        }else{
          fs.writeFileSync(fileName,'')
          return l;
        }



      }

      exports.bor=function(lend,bor,money,name,username){
        fs.appendFileSync(`./trens/${name}.txt`,`${lend} ${bor} ${money} ${username}\n`)
return;


      }
