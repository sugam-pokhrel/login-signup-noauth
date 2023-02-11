const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config() //this is importing the dotenv file which contains the hidden phrases
const ejs=require('ejs'); //this is exporting ejs
const { dirname } = require('path');


const app=express();
app.set('view engine','ejs') //using the engine as ejs
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

mongoose.connect(process.env.HOST); //connect to the desired database // change the host name for 

const User = mongoose.model(process.env.SCHEMA, { name: String,password:String}/* this is creating a schema in the database*/);

// const data = new User({ name: 'test' ,password:'test'}); this is just for testing purpose
// data.save().then(() => console.log('User Saved'));


app.get('/',(req,res)=>{

  res.send('<h1>please <a href="login">login</a> or signup</h1>')


    
 
    
    
})

app.get('/login',(req,res)=>{
  res.render('login')

})

app.get('/postdata',(req,res)=>{
  res.render('adduser')
})

app.post('/postdata',(req,res)=>{
  const name=req.body.name;
  const password=req.body.password;
  var data = new User({ name: name ,password:password})
  data.save().then(() => {console.log('User Saved')
  res.redirect('/login')}
  ); //the above code is listening to any post request on signup page


app.post('/login',(req,res)=>{
  const name=req.body.name;
  const password=req.body.password;
  User.findOne({ name: name,password:password }, function (err, found) {if(found){
    User.find({}, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result)
        res.render('index',{data:result})
      }
    });  
    
  }});

})  ;
//this above code hears any post request from login page and checks weather the user is present in the databse or not  and if it is than shows the desired page




  





  // var post = new User({ name: 'test' ,password:'test'});
  // post.save(function (err, post) {
  //   if (err) { return next(err) }
  //   res.json(201, post)
  // })
  

})


app.listen(process.env.PORT);