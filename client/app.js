'use strict'

var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

async function fetchDatabase(data) {
    
    const div = document.querySelector("#app")
    const ul = document.createElement("ul")
    // const res = await window.fetch('http://localhost:4000/')
    await window.fetch('http://localhost:4000/')
    // await window.fetch('/')
    .then(res => res.json())
    .then(json => {
        console.log(json)
        json.result.forEach(element => {
            const li = document.createElement("li")
            const p = document.createElement("p")
            p.innerText = element.name
            li.appendChild(p)
            ul.appendChild(li)
            
        });
        div.appendChild(ul)
    })
    
    // div.appendChild()
}

fetchDatabase()