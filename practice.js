const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practice-exercises")
 .then(() => console.log("Connected to mongoDB courses ..."))
 .catch((err) => console.error("Couldnt connect to db...",err));

 const courseSchema = new mongoose.Schema({
    name: String,
    author:String,
    tags:[String],
    date: {type:Date,default: Date.now},
    isPublished:Boolean,
    price:Number
 })

 const Course =  mongoose.model('Course',courseSchema);

 async function getCourses(){
    return await Course.find({isPublished:false})
    // console.log("OMM",);
 };

 async function run(){
    const result = await getCourses()
    console.log("Omm",result);
 };

//  run();


async function updateCourse(id){
    console.log('started',id);

try {
    // const upCourse = await Course.findById(id);
    // if(!upCourse) return;

    // upCourse.isPublished = true;
    
    // upCourse.author= 'Another Author';

    //* update first approch
const result = await Course.findByIdAndUpdate({_id:id},{
   $set: {
      author:'Lawda',
      isPublished:true
   }
},{new:true})


    console.log('result:',result);
} catch{
    ()=> console.log('Error:',err.message);
}


}

// updateCourse('631195286a3a49b7a51ab370')

async function removeCourse(id){
    // const result = await Course.deleteOne({_id: id});
    // console.log(result);
    // const result = await Course.deleteOne({_id:id})
    // console.log('reeee:',result);
 
    // const course = await Course.findByIdAndRemove(id);
    // console.log('ff',course);

    const course = await Course.findByIdAndRemove(id)
    console.log('ff',course);
 }
 removeCourse('631195286a3a49b7a51ab377')