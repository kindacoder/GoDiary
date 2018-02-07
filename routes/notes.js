const route=require('express').Router();

route.get('/',(req,res)=>{
  res.render('notes')
})
route.get('/add',(req,res)=>{
  res.render('notes/add')
})

module.exports=route;
