const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const cors =  require('cors');

const postRoutes = require('./routes/posts');

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);

// const CONNECTION_URL = 'mongodb+srv://cyberpunk:CYBER123PUNK@cluster0.rp9ou.mongodb.net/MEMORIES_DB?retryWrites=true&w=majority';
const CONNECTION_URL = 'mongodb://localhost/memories_db'
const PORT = process.env.port || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);