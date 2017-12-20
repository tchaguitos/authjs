const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const modelUser = mongoose.model('User');

let userController = {};

userController.allUsers = (req, res) => {

  modelUser.find()
    .then(results => res.json(results))
    .catch(err => res.send(err));
}

userController.newUser = (req, res) => {

  if(req.body.username && req.body.password) {
    if(req.body.password2 && req.body.password == req.body.password2) {

      modelUser.findOne({ 'username': req.body.username })
        .then(user => {

          if(user) {
            res.json({ success: false, message: 'This username has no available' });
          
          } else {

            bcrypt.hash(req.body.password, 10)
              .then(hash => {

                let encryptedPassword = hash;
                
                let newUser = new modelUser({
                  username: req.body.username,
                  password: encryptedPassword,
                  email: req.body.email,
                  isAdmin: req.body.isAdmin
                });

                newUser.save()
                  .then(() => res.json({ success: true, message: 'User created with success', statusCode: 201 }))
                  .catch(err => res.json({ success: false, message: err, statusCode: 500 }));
              })

              .catch(err => res.json({ success: false, message: err, statusCode: 500 }));
          }
        })
    
    } else {

      res.json({ success: false, message: 'Passwords doesnt match', statusCode: 400 });
    }

  } else {

    res.json({ success: false, message: 'Username and password fields are requireds', statusCode: 400 });
  }
}

module.exports = userController;