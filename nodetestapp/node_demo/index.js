const Joi = require('joi');
const express = require('express');
const courses=require("./routes/courses")

const app = express();

app.set('view engine','pug');
app.set('views','./views')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/api/courses',courses);

app.use((req,res,next)=>{
    //console.log("logging");
    next();
});

const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    // res.send('Hello World nodemon!');
    console.log("Before");
    setTimeout(()=>{
        console.log("timeoutover");
    },2000);
    console.log("After");
    res.render('index',{title:"My app", message:"hello world"})
  });

  app.get('/testCallBack', (req, res) => {
    // res.send('Hello World nodemon!');
    console.log("Before");
    //setTimeout(()=>{
        getUser(1,(user)=>{
          console.log("User : ",user);
          getRepo(user,(repo)=>{
            console.log(user," : ", repo);
          })
        });
    //},2000);
    console.log("After");
    res.render('index',{title:"My app", message:"hello world"})
    
  });

  app.get('/testNamedFunction', (req, res) => {
    // res.send('Hello World nodemon!');
    console.log("Before");
    //setTimeout(()=>{
        getUser(1,getRepo1);
    //},2000);
    console.log("After");
    res.render('index',{title:"My app", message:"hello world"})
    
  });

  app.get('/testPromise', (req, res) => {
    // res.send('Hello World nodemon!');
    console.log("Before");
    //setTimeout(()=>{
        getUser1(1)
          .then(user=>getRepo2(user))
          .then(repo=>displayRepo1(repo[0]))
          .then(rep=>console.log(rep))
          .catch(err=>console.log(err));
    //},2000);
    console.log("After");
    res.render('index',{title:"My app", message:"hello world"})
    
  });

  app.get('/testPromiseasyncawait', (req, res) => {
    // res.send('Hello World nodemon!');
    console.log("Before");
    //setTimeout(()=>{
      displayAsyncAwait()
    //},2000);
    console.log("After");
    res.render('index',{title:"My app", message:"hello world"})
    
  });

  async function displayAsyncAwait(){
    try {
      const user=await getUser1(1);
    console.log('between');
    const rep=await getRepo2(user)
    const repo=await displayRepo1(rep[0]);
    console.log(repo);
    } catch (error) {
      console.log(error);
    }
}
  //==========================

  function getUser1(id,){
    return new Promise((resolve,reject)=>{
      //Kick off some async code
      setTimeout(()=>{
        console.log("Reading user from DB...");
        resolve( {id:id,user:"nitish"});
      },2000)
    })
  }

  function getRepo2(user){
    return new Promise((resolve,reject)=>{
      //some async code
      console.log("Reading Repo from DB...");
      setTimeout(()=>{
        resolve( ['repo1DB','repo2DB','repo3DB']);
      },2000)
    })          
  }

  function displayRepo1(repo){
    return new Promise((resolve,reject)=>{
      console.log("Repo1",repo);
      resolve( repo);
    })
  }
//====================================
  function displayRepo(repo){
    console.log("Repo"," : ", repo);
  }

  function getRepo1(user){
    console.log("User : ",user);
          getRepo(user,displayRepo)
  }

  //====================================

  function getUser(id,callback){
    setTimeout(()=>{
      console.log("Reading user from DB...");
      callback( {id:id,user:"nitish"});
    },2000)
  };

  function getRepo(user,callback){
    setTimeout(()=>{
      callback( ['repo1','repo2','repo3']);
    },2000)
  };



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });