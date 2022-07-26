const mongoose = require('mongoose');

//?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://' + process.env.DB_USER + '@cluster0.dms4q.mongodb.net/social-network',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));