const bcrypt = require('bcryptjs');
const mongoose = require('../../config/database');

const UserSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  const hashPassword = await bcrypt.hash(this.senha, 10);
  this.senha = hashPassword;
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
