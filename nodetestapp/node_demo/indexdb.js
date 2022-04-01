const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log("Connected to DB"))
    .catch(err=>console.log("Not able to connect DB ",err));

const courseSchema = new mongoose.Schema({
    name:{type:String, required:true},
    category:{
        type:String,
        enum: ['web','mobile','network'],
        lowercase:true,
        trim:true

    },
    author:String,
    tags: [String],
    tagsadded:{
        type:Array,
        validate:{
            validator: function(v){
                return v && v.length > 0;
            },
            message:"Must have atlease 1 tag"
        }
    },
    asynctagsadded:{
        type:Array,
        validate:{
            isAsync: true,
            validator: function(v,callback){
                setTimeout(()=>{
                    //do some async work
                    const res = v && v.length > 0;
                    callback(result)
                },4000)
            },
            message:"Must have atlease 1 tag"
        }
    },
    date: {type:Date, default:Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){return this.isPublished}, // can not use arrow fxn as it does not have this,
        max:2000,
        min:10,
        get:v=>Math.round(v),
        set:v=>Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        //name:"angular js course",
        author:"nitish",
        tags:['angular','frontend'],
        isPublished: true
    });
    try {
        //await course.validate()
        const result = await course.save();
        console.log(result);
    } catch (err) {
        console.log(err.message);
        for (field in err.errors){
            console.log(err.errors[field].message);
        }
    }

}

//gt, gte, lt, lte, eq, in, nin
//or, and
async function getCourse(){
    const pageNo=2;
    const pageSize=10;
    //const courses= await Course.find();
    const courses= await Course
        .find({author:"mosh", isPublished:true})
        .skip((pageNo-1)*pageSize)
        //.find({price:20})
        //.find({price:{$gt : 20}})
        //.find({price:{$gte : 20, $lte: 40}})
        //.find({price:{$in : [10,14,23]}})

        //.find()
        //.or([{author:"mosh"},{isPublished:true}])
        //.and([])

        //.find({author:/^mosh/, isPublished:true})
        //.find({author:/^mosh/, isPublished:true})
        //.find({author:/.*mosh.*/i, isPublished:true})
        .limit(pageSize)
        .sort({name:1})
        //.select({name:1})
        .count();
    console.log(courses);
}

//getCourse();
createCourse();
