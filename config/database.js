const mongoose = require('mongoose');

const connectDatabase = () => {
  const mongodbURI = process.env.MONGODB_URI;

  mongoose
    .connect(mongodbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
});

const CollectionModel = mongoose.model("collection1", LoginSchema);

module.exports = {
  collection: CollectionModel,
  connectDatabase: connectDatabase,
};
