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


app.use(express.urlencoded({
    extended: true
  }))

app.get('/', (req, res) => {

    // change data in index.ejs file (see footer for testing purpose) and display it
    res.render('index', {
     
    });
});

app.get('/itemListPage', (req, res) => {
    var items = data;

    // get corresponding category to show only corresponding items
    categorySearch = req.query.category.toLowerCase();

    // sort items, sorts ALL items of database at the moment
    var sort = req.query.sort;
    items = sortProducts(items, sort);
    
    // change data in itemListPage.ejs file and display it
    res.render('itemListPage', {
        items: items,
        category: categorySearch
    });
});

app.get('/cartPage', (req, res) => {

    //check if cart empty
    var stats = fs.statSync('./resources/data/cart.json');
    var x = 0;

    if(stats.size == 0 || stats.size < 3){
    res.render('cartPageEmpty', {
    });
    }

    else{
    var cartData = fs.readFileSync('./resources/data/cart.json');
    var cdata = JSON.parse(cartData);
    var c_items = cdata;
    
    
    for(var i = 0; i < cdata.length; i++)
    {
        x += cdata[i].price;
    }

    res.render('cartPage', {
        c_items: c_items,
        totalx: x
    });
    }

});

app.get('/search', (req, res) => {
    var items = data;

    // sort items, sorts ALL items of database at the moment
    var sort = req.query.sort;
    items = sortProducts(items, sort);
    
    // change data in itemListPage.ejs file and display it
    res.render('itemListPageSearch', {
        items: items,
        name: sea2
    });
});

app.post('/search', (req, res) => {
    //res.writeHead(200, { 'Content-Type': 'text/html' });
    console.log(`search: ${req.body.cari}`);
    var seaArr = req.body.cari.toLowerCase();
    sea = '/itemListPage' + '?category=' + seaArr;

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

    res.end();
});

app.post('/cart', (req, res) => {
    //send item ID to server
    var stats = fs.statSync('./resources/data/cart.json');
    var cartData = fs.readFileSync('./resources/data/cart.json');
    if(stats.size > 0)
    {
        var cdata = JSON.parse(cartData);
    }
    else
    {
        var cdata = [];
    }
    var search_field = "id";
    var search_value = req.body.id;

    for (var i=0 ; i < data.length ; i++)
    {
        if (data[i][search_field] == search_value) {
            cdata.push(data[i]);
        }
    }

    fs.writeFile('./resources/data/cart.json', JSON.stringify(cdata), 'utf-8', function(err) {
        if (err) throw err
        console.log(`added to cart`);
    })

    //lastly redirect to cart page to see the item has been added
    res.redirect('/cartPage');
    res.end();
});

app.post('/rcart', (req, res) => {

    var cartData = fs.readFileSync('./resources/data/cart.json');
    var cdata = JSON.parse(cartData);
    var search_field = "id";
    var search_value = req.body.id;
    var new_cdata = [];

    for (var i=0 ; i < cdata.length ; i++)
    {
        if (cdata[i][search_field] != search_value) {
            new_cdata.push(cdata[i]);
        }
    }

    fs.writeFile('./resources/data/cart.json', JSON.stringify(new_cdata), 'utf-8', function(err) {
        if (err) throw err
        console.log(`removed from cart`);
    })

    res.redirect('/cartPage');
    res.end();
});

/* 404 route, has to be the last route!!! */
app.get('*', function(req, res){
    res.status(404).send('<p style="font-size:160%;">Error 404! Page not found!</p>');
  });


app.listen(port, () => {
    console.log('Server is running at http://localhost:5001...');
});

/*------------------------------------------*/

function sortProducts(items, sort) {
    // sort items if sort is not undefined
    if (sort === "PriceAscending") {
        items.sort((a, b) => {
            return a.price - b.price;
        });
    } else if (sort === "PriceDescending") {
        items.sort((a, b) => {
            return b.price - a.price;
        });
    } else if (sort === "NameAscending") {
        items.sort((a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            if (a < b) return -1;
            else if (a > b) return 1;
            else return 0;
        });
    } else if (sort === "NameDescending") {
        items.sort((a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            if (a < b) return 1;
            else if (a > b) return -1;
            else return 0;
        });
    } else if (sort === "NoSort") {
        items.sort((a,b) => {
            return a.id - b.id;
        });
    }
    return items;
}
