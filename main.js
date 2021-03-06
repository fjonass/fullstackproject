const express = require('express'); // npm install express
const app = express();
const session = require('express-session'); // npm install express-session
const path = require('path'); // npm install path
const fs = require('fs'); // npm install fs
const parser = require('body-parser');
const port = process.env.PORT || 5001;
var sea = '';
var sea2 = '';

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

app.get('/search', (req, res) => {

    var items = data;
    
    // change data in itemListPage.ejs file and display it
    res.render('itemListPageSearch', {
        items: items,
        name: sea2
    });
});


app.use(express.urlencoded({
    extended: true
  }))

app.post('/search', (req, res) => {
    //res.writeHead(200, { 'Content-Type': 'text/html' });
    console.log(`search: ${req.body.cari}`);
    var seaArr = req.body.cari.toLowerCase();
    sea = '/itemListPage' + seaArr;

    if(
    seaArr == 'electronic'|| 
    seaArr == 'toys'||
    seaArr == 'outdoor'||
    seaArr == 'fashion'||
    seaArr == 'office'||
    seaArr == 'personal_care'||
    seaArr == 'pets'||
    seaArr == 'books'||
    seaArr == 'grocery'
    )
    res.redirect(sea);
    
    else
    {
        sea2 = req.body.cari;
        res.redirect('/search');
    }

   /* res.write(`<br>`);
    res.write(`Email: ${req.body.Emaill}`);
    res.write(`<br>`);
    if(req.body.subject)
        res.write(`Comment: ${req.body.subject}`);
    else
        res.write(`Comment: n/a`);
    res.write(`<br>`);
    if(req.body.check)
        res.write(`Newsletter: Yes, I would like to sign up for the newsletter.`);
    else
        res.write(`No, thank you.`);*/
    res.end();
});


app.listen(port, () => {
    console.log('Server is running at http://localhost:5001...');
});

