const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
 .then(() => console.log('Connected to mongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err))


  const courseSchema = new mongoose.Schema({
    category:{
      type:String,
      required:true,
      enum:['web','mobile','network'],
      lowercase:true,
      // uppsercase:true,
      trim:true
    },
    name: {type:String, 
      require:true, 
      minlength:5,
      maxlength:255,},
    author: String,
    tags: {
      type: Array,
    //   validate: {
    //     validator:function(v){
    //     return v && v.length > 0;
    //   },
    //   message:'A course should have at least one tag'
    // },},

    //** Aysnc validator */
    validate: {
      isAsync: true,
      validator:function(v,callback=()=>{}){
      //  return setTimeout(() => {
      //     const result = v && v.length > 0;
      //     callback(result);
      //   },1000)
      return new Promise((resolve) => {
          const result = v && v.length > 0;
          resolve(result)
      },2000)
     
    },
    message:'A course should have at least one tag'
  },},
    
    date: {type:Date, default: Date.now},
    isPublished: Boolean,
    price: {
      type: Number,
      required: function(){
        return this.isPublished
      },
      min:10,
      max:200,
      // get:(v)=> Math.round(v),
      set:(v)=> Math.round(v)
    }
  })

  const Course = mongoose.model('Course', courseSchema);
  // console.log('courseObj:',Course);
async function createCourse(){
  
       const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        // tags:null,
        tags: [ 'angular','frontend'],
        isPublished: true,
        price:15.6,
        category:'WEB'
       })
       console.log('courseObj:',course);
    
        try{
          const result = await course.save()
// console.log('Result',result);    
        } catch(e){
          for(field in e.errors)
          console.log(e.errors[field].message);
          // console.log('ErrorMess:',e.message);         
        }
}

async function getCourses(){

    const pageNumber = 2;
    const pageSize = 10;

const courses = await Course
//    .find({author:'Mosh',isPublished: true})
// .find({price: {$gte : 10,$lte: 20}})
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
.find({_id:'6311fa8846c15332521f085a'})
// Pagination
// .skip((pageNumber -1) * pageSize)
  //  .limit(pageSize)
  //  .sort({name:1}) //ascend 1 desend -1
   .select({name: 1 , tags: 1,price:1})
   //count number of documents
//    .count()

console.log(courses[0].price);
}

getCourses()
// createCourse()
