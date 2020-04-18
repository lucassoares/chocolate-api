const bcrypt = require("bcryptjs");
const mongoose = require("../../config/database");

// modulos node_modules
// modulos internos

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
    timestamps: true, // data de criacao e data de modificacao dos dados no banco
  }
);

UserSchema.pre("save", async function (next) {
  const hashPassword = await bcrypt.hash(this.senha, 10);
  this.senha = hashPassword;
  next();
});

// $2a$10$xTZkWfrtd3LgXSgbxO1HMODi4cojleo9PNDdw1qgYpAd0ytoUfspO 123456

// $2a$10$mB9Mt45myQwGJ4t5jnY5qesSmdr8uVU7QrRPHr8hKySMovY69Luvy 123456

// CONTROLLER -> MODEL -> SAVE -> (HOOK) -> NEXT -> SALVAR NO BANCO DE DADOS

const User = mongoose.model("User", UserSchema);
module.exports = User;
