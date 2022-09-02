const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mongo-exercises")
 .then(() => console.log("Connected to mongoDB courses ..."))
 .catch((err) => console.error("Couldnt connect to db...",err));

 const courseSchema = new mongoose.Schema({
    name: String,
    author:String,
    tags:String,
    date: {type:Date,default: Date.now},
    isPublished:Boolean,
    price:Number
 })

 const Course = mongoose.model('Course',courseSchema);

 async function getCourses(){
    return await Course
   //   .find({isPublished:true,tags:'backend'})
   //   .sort({name: 1})
   //   .select({name:1,author:1});

   // sol1
   // .find({isPublished:true,tags:{$in: ["frontend","backend"]}})
   .find({isPublished:true})
   .or([{tags:'frontend'}, {tags:'backend'}])
   .sort({price:-1})
   .select({author:1,name:1,price:1})
  
 }

 async function run(){
    const courses =  await getCourses();
    console.log('corrrrdee:',courses);
 }

//  run()


//* Updating Document
async function updateCourse(id){
// const course = await Course.findById(id)
// if(!course) return;

// course.isPublished = true;
// course.author= 'Another Author'

// // or
// // course.set({
// //   isPublished:true,
// //   author:'Another Author'
// // })

// const result = await course.save()

//* update first approch
// const result = await Course.updateOne({_id:id},{
//    $set: {
//       author:'NVRRR',
//       isPublished:false
//    }
// })

// console.log(result);
// console.log('Updated COurse:', result);

const course = await Course.findByIdAndUpdate(id, {
   $set: {
      author:'Gobbi',
      isPublished:false
   }
},
{new: true})


console.log(course);


}

updateCourse('1234512345cd')