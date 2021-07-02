const https = require('https')


let postData =  {
  name: "larasamuelson",
  answer: ''
};

let response 

const postOptions = {
  'method': 'POST',
  'hostname': 'backend-evaluation.vcomm.io',
  'headers': {
    'Authorization': 'Bearer Q5Cm2xxYgCjnMpS8NYbqqPHf2zJ3ukmc',
    'Content-Type': 'application/json'
  }
};

const post = https.request(postOptions, function (res) {
  let chunks = [];
  
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    let body = Buffer.concat(chunks);
    console.log(body.toString());
    response = body.toString()
  });

  res.on("error", function (error) {
    console.error(error);
  });
});



const getOptions = {
  'method': 'GET',
  'hostname': 'backend-evaluation.vcomm.io',
  'path': '/?name=larasamuelson',
  'headers': {
    'Authorization': 'Bearer Q5Cm2xxYgCjnMpS8NYbqqPHf2zJ3ukmc'
  },
};

const get = https.request(getOptions, function (res) {
  let chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    let body = Buffer.concat(chunks);
    let resBody = JSON.parse(body)
    let number = JSON.stringify(resBody.numbers[0] * resBody.numbers[1] + resBody.numbers[2])
    postData.answer = require("crypto").createHmac("sha256", resBody.secret )
      .update(number)
      .digest("hex");

    //send post request once hex digest is received 
    post.write(JSON.stringify(postData));
    post.end();

  });

  res.on("error", function (error) {
    console.error(error);
  });
});
// send get request
get.end();


