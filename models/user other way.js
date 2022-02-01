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
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: {
      type: String,
    },
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

userSchema.pre("save", async function (next) {
  this.salt = uuidv1();
  //this.salt = userSchema.salt;                                              //somewhy it wasnt linking to the userSchema
  this.password = await userSchema.methods.encryptPassword(this.password);
  next();
});

// Encrypt the Password

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) {
      return "Doesnt have password";
    }
    try {
      return crypto
        .createHmac("sha1", userSchema.salt)
        .update(password)
        .digest("hex");
    } catch (e) {
      console.log("EncryptedPassword() CATCH");
      console.log(typeof password, password);
      console.log(typeof userSchema.salt, userSchema.salt);
      return e;
    }
  },
};

module.exports = mongoose.model("User", userSchema);
