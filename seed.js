const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/incident_log', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const incidentSchema=new mongoose.Schema({
    title: String,
    description: String,
    severity: String,
    reported_at: { type: Date, default: Date.now }
});

const Incident=mongoose.model('Incident', incidentSchema);

async function seedData() {
    // await Incident.deleteMany(); 

    await Incident.insertMany([
        {
            title: "Autonomous car accident",
            description: "Self-driving car failed to detect pedestrian.",
            severity: "High"
        },
        {
            title: "AI misdiagnosis in hospital",
            description: "AI system incorrectly diagnosed patients leading to treatment delays.",
            severity: "Medium"
        },
        {
            title:"Chatbot gave wrong financial advice",
            description: "AI chatbot gave misleading investment recommendations.",
            severity: "Low"
        }
    ]);

    console.log("Sample incidents inserted!");
    mongoose.disconnect();
}

seedData();
