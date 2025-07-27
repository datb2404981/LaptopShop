import express from "express";
import 'dotenv/config'
import WebRouters from "./routers/web";
import path from "path";

const app = express();
const port = process.env.PORT;

//config view engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

//config routers
WebRouters(app);

//config static files: images/css/js
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`My server is http://localhost:${port}`);
});