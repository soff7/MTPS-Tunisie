const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb+srv://MTPS-Tunisie:Sofldh99@mtps.i6xs7.mongodb.net/MTPS-Tunisie?retryWrites=true&w=majority', 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
    console.log(`📊 Base de données: ${conn.connection.name}`);
    
    // Événements de connexion
    mongoose.connection.on('connected', () => {
      console.log('🔗 Mongoose connecté à MongoDB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('❌ Erreur de connexion Mongoose:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('🔌 Mongoose déconnecté');
    });
    
    return conn;
  } catch (error) {
    console.error(`❌ Erreur de connexion à MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;