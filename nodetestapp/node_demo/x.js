//using reference (Normalisation)

const { default: mongoose } = require("mongoose")

let author = {
    name:'Mosh'
}

let course={
    author:'id'
}

//using embedded document
let course1={
    author1 : {
        name:'Mosh'
    }
}

//hybrid
let author2 = {
    name:'Mosh',
    //50 other property
}

let course2={
    author:'id',
    author:{
        id:'ref',
        name:'mosh'
    }
}

//reference
const Courses = mongoose.model('Courses', new mongoose.Schema({
    name:String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'author2'
    }
}));

const Courses1 = mongoose.model('Courses', new mongoose.Schema({
    name:String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:authorschema
    }
}))
