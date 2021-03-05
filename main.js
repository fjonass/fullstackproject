const express = require('express'); // npm install express
const app = express();
const session = require('express-session'); // npm install express-session
const path = require('path'); // npm install path
const fs = require('fs'); // npm install fs
const port = process.env.PORT || 5001;

// Template ejs
app.set('views', __dirname + '');
app.set('view engine', 'ejs'); // npm install ejs

// Load .css files so that they work too
app.use(express.static(__dirname + "/"));

// Read JSON file
var allData = fs.readFileSync('./resources/data/data.json');
var data = JSON.parse(allData);


app.get('/', (req, res) => {
    var test = "This is a test if EJS works";
    var test2 = data[0].description;

    // change data in index.ejs file (see footer for testing purpose) and display it
    res.render('index', {
        testi: test,
        testi2: test2
    });
});

app.get('/itemListPage'+'(Electronic|Toys|Outdoor|Fashion|Office|Personal_Care|Pets|Books|Grocery)?', (req, res) => {
    var items = data;
    // get corresponding category to show only corresponding items
    var categorySearch = req.url.split("/itemListPage")[1].toLowerCase();

    // change data in itemListPage.ejs file and display it
    res.render('itemListPage', {
        items: items,
        category: categorySearch
    });
});

app.get('/cartPage', (req, res) => {

    res.render('cartPage', {
        
    });
});

app.listen(port, () => {
    console.log('Server is running at http://localhost:5001...');
});

