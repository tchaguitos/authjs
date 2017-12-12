const mongoose = require('mongoose');
const modelUser = mongoose.model('User');

let userController = {};

userController.allUsers = (req, res) => {

  modelUser.find()
    .then(results => res.json(results))
    .catch(err => res.send(err));
}

module.exports = userController;