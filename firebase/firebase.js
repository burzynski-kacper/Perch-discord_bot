const admin = require('firebase-admin');

const serviceAccount = require('./firebase-perchBot.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://perchbot-e0168-default-rtdb.europe-west1.firebasedatabase.app/"
});

module.exports = admin;