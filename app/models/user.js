var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var saltRounds = 10;

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function () {
    this.on('creating', function (model, attrs, options) {
      return new Promise(function (resolve, reject) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(model.get('password'), salt, undefined, function (err, hash) {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        });
      })
        .then(function (hash) {
          model.set('password', hash);
        })
        .catch(function (err) {
          console.log('error creating user', err);
        });
    });
  }
});

module.exports = User;