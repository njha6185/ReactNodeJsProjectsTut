const express= require('express');
const router=express.Router();

const courses = [
    {id:1,name:"C1"},
    {id:2,name:"C12"},
    {id:3,name:"C13"},
    {id:4,name:"C14"},
];

router.get('/',(req,res)=>{
    res.send(courses);
});

router.get('/:id',(req,res)=>{
  const course=courses.find(c=>c.id===parseInt(req.params.id));
  if(!course) res.status(404).send('Course not found');
  res.send(course);
});

router.get('/api/test/:id',(req,res)=>{
  res.send(req.query );
});

router.post('/',(req,res)=>{
  const schema=Joi.object({
      name: Joi.string().min(3).required()
  })

  const { error, value } = schema.validate(req.body);
  //console.log(error,value);
  if(error){
      res.status(404).send(error.details[0].message);
      return;
  }
  const course = {
      id:courses.length+1,
      name:req.body.name
  };
  courses.push(course);
  res.send(course)
});



router.put('/:id',(req,res)=>{
  const course=courses.find(c=>c.id===parseInt(req.params.id));
  if(!course) return res.status(404).send('Course not found');

  const schema=Joi.object({
      name: Joi.string().min(3).required()
  })

  const { error, value } = schema.validate(req.body);
  //console.log(error,value);
  if(error){
      res.status(404).send(error.details[0].message);
      return;
  }
  course.name = req.body.name;
  res.send(course)
});

router.delete('/:id',(req,res)=>{
  const course=courses.find(c=>c.id===parseInt(req.params.id));
  if(!course) return res.status(404).send('Course not found');

  const index=courses.indexOf(course);
  courses.splice(index,1)
  res.send(courses)
});

module.exports=router;