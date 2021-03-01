const express = require('express'); // npm install express
const app = express();
const session = require('express-session'); // npm install express-session
const path = require('path'); // npm install path
const port = process.env.PORT || 5001;

app.use(express.static(__dirname));
// app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, () => {
    console.log('Server is running at http://localhost:5001...');
});

