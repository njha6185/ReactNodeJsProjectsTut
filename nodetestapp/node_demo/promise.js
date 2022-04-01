
const p=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(13);
        //reject(new Error('Error message'));
    },2000);
    
})

p.then(result=>{
    console.log(result);
})
.catch(err=>console.log('Error:', err.message));

const p1=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log("FB API...");
        resolve(1);
        //reject(new Error('Error message'));
    },2000);
    
})

const p2=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log("Insta API...");
        resolve(2);
        //reject(new Error('Error message'));
    },2000);
    
})

Promise.all([p,p1,p2])
    .then(result=>console.log(result))
    .catch(err=>console.log(err))

    Promise.race([p,p1,p2])
    .then(result=>console.log(result))
    .catch(err=>console.log(err))