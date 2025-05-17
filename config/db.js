const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Utilisez votre chaîne de connexion MongoDB existante
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://MTPS-Tunisie:Sofldh99@mtps.i6xs7.mongodb.net/?retryWrites=true&w=majority&appName=Mtps', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Erreur de connexion à MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;