const route=require('express').Router();
const Note=require('../models/Notes')
var methodOverride = require('method-override')
var flash=require('connect-flash');
route.get('/',(req,res)=>{
  Note.find({},function(err,docs){
    if(err){
      console.log(err);

    }else{

      res.render('notes/index',{data:docs})
    }
  })
})

route.post('/',(req,res)=>{
  ///check errors
  const errors=[];
  if(!req.body.title){
    errors.push({text:'Your Notes must have a title bro !'})
  }
  if(!req.body.details){
    errors.push({text:'You should add some details for the Notes !'})
  }
  if(errors.length>0){
    res.render('notes/add',{errors:errors,title:req.body.title,details:req.body.details})
  }else{
    //save data to mongodb
    const newUser={
      title:req.body.title,
      details:req.body.details
    }
    new Note(newUser)
    .save()
    .then(idea=>{
      req.flash('success_msg','New Notes added')
      res.redirect('/notes');
    })
  }
})
route.get('/add',(req,res)=>{
  res.render('notes/add')
})

//edit the notes

route.get('/edit/:id',(req,res)=>{
  //get the id from the req object and find them in mongodb and update it
  Note.findOne({_id:req.params.id})
.then((data)=>{
  res.render('notes/edit',{data:data})
})
})


///edit process
route.put('/:id',(req,res)=>{
  ///find a notes
  Note.findOne({_id:req.params.id})
  .then(data=>{
    data.title=req.body.title;
    data.details=req.body.details;
    data.save()
    .then(data=>{
req.flash('success_msg','Notes Updated')
      res.redirect('/notes')
    })
  })

})

//deleting the notes
route.delete('/:id',(req,res)=>{
  //get the note and delete it
  Note.findOne({_id:req.params.id})
  .remove()
  .then(data=>{
    req.flash('success_msg','Notes removed');
    res.redirect('/notes')
  })
})

module.exports=route;
