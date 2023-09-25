const mongoose = require('mongoose');
const faker = require('faker'); 
const MONGO_URL= 'mongodb+srv://nka:aVFFVWiuSi9DuxR8@cluster0.adm6m4a.mongodb.net/';
const DB_NAME = 'db1'
const taskSchema = new mongoose.Schema({
    Task: {type: String, required: true},
    Description: {type: String, required: true},
    Assignees: {type: String, required: true},
    owner: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'User'
    }
 });
 
 const Task = mongoose.model('Task', taskSchema);

 mongoose.connect(MONGO_URL,{
    dbName: DB_NAME
}).then(
    ()=>{
        console.log("connected to database")
    }
).catch((err)=>{
    console.log('error connecting' + err)
});
 

const NUM_TASKS = 100;

async function seedDatabase() {
  try {
    for (let i = 0; i < NUM_TASKS; i++) {
      const task = new Task({
        Task: faker.random.arrayElement(['Onboarding Call', 'Account Review', 'Customer Feedback', 'Update Call']),
        Description: faker.lorem.paragraph(),
        Assignees: faker.name.findName(),
        owner: new  mongoose.Types.ObjectId() 
      });

      await task.save();
    }
    console.log(`${NUM_TASKS} tasks injected successfully.`);
  } catch (err) {
    console.error('Error injecting tasks to database:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
