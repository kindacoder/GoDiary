const route=require('express').Router();

route.get('/',(req,res)=>{
  res.render('notes')
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
      res.redirect('/ideas');
    })
  }
})
route.get('/add',(req,res)=>{
  res.render('notes/add')
})

module.exports=route;
