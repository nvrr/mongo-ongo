const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
 .then(() => console.log('Connected to mongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err))


  const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {type:Date, default: Date.now},
    isPublished: Boolean
  })

  const Course = mongoose.model('Course', courseSchema);

async function createCourse(){

    
    
       const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: [ 'angular','frontend'],
        isPublished: true
       })
    
        const result = await course.save()
console.log(result);    
}

async function getCourses(){
const courses = await Course
//    .find({author:'Mosh',isPublished: true})
// .find({price: {$gte : 10,lte: 20}})
// .find({price: {$in:[10,15,20]}})
// Logical or and (and operator is same done what .find({author:'Mosh',isPublished: true} doooo,but some complex things AND operator useful )
// .find()
// .or([{author:'Praba'},{isPublished:true}])

// Regular expressions
// Starts with Mosh
// .find({author: /^Mosh/})
//Ends with Hamadani case sensitive
// .find({author: /Hamadani$/})

//Ends with Hamadani case in-sensitive (put i at end)
// .find({author: /Hamadani$/i})

//Contains Mosh ;;it means author name can be in beging or moddle or end
// to make case insensitive put i at end
// .find({author: /.*Mosh.*/i})
.find({author:'Mosh',isPublished: true})
   .limit(10)
   .sort({name:1}) //ascend 1 desend -1
   .select({name: 1 , tags: 1})
   //count number of documents
   .count()

console.log(courses);
}

getCourses()