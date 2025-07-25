import express from "express";

const app = express();
const port = 8080;

app.get('/', (req, res)=>{
  res.send('hello worlds!')
})

app.listen(port, () => {
  console.log(`My server is http://localhost:${port}`);
})