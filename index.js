const express= require("express");
const cors= require("cors");
const { router } = require("./routes/routes");
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(router)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const port = process.env.PORT || 4500;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
