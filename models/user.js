const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid").v1;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// Virtual field

userSchema
  .virtual("password")
  .set( function (password) {
    this._password = password;
    this.salt = uuidv1();
    //console.log(userSchema.methods.encryptPassword(password));
    this.hashed_password = this.encryptPassword(password);
  })
  .get( function() {
    return this._password;
  });

// Encrypt the Password

userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function (password) {
    if (!password) {
      return "Doesnt have password";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (e) {
      console.log(typeof password, password);
      console.log(typeof this.salt, this.salt);
      return e;
    }
  },
};

module.exports = mongoose.model("User", userSchema);
