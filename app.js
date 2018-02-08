const express=require('express');
const app=express();
const port=process.env.PORT || 5100;
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
var methodOverride = require('method-override')
const exphbs  = require('express-handlebars');

//addding routers
const notesRoute=require('./routes/notes')




///Connecting to database
mongoose.connect('mongodb://godiary:godiary@ds145188.mlab.com:45188/godiary')
.then(()=>{
  console.log('Connected to Database')
}).catch(()=>{
  console.log('Database connection error')
})

///Load notes model
var Note=require('./models/Notes');


//using the body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

///Method-override middleware
app.use(methodOverride('_method'))


///serve static files
app.use('/public',express.static('public'));

///using router
app.use('/notes',notesRoute);

///setting-up the views .. Hnadlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/',(req,res)=>{
  res.render('index')
})

app.get('/about',(req,res)=>{
  res.render('about');
})

app.listen(port,()=>{
  console.log('Server started at port '+port);
})
