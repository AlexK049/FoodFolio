const crypto = require('crypto');

module.exports = class {
    id = null;
    firstname = null;
    lastname = null;
    username = null;
    password = null;
    salt = null;
  
    constructor(data) {
      this.id = data.user_id;
      this.firstname = data.user_firstname;
      this.lastname = data.user_lastname;
      this.username = data.user_username;
      this.salt = data.user_salt;
      this.password = data.user_passwordhash;
    }

      toJSON() {
        return {
          id: this.id,
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
        }
      }
    }