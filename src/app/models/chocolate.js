const mongoose = require("../../config/database");

const ChocolateSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    marca: {
      type: String,
    },
    valor: {
      type: Number,
    },
    imagem: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Chocolate = mongoose.model("Chocolate", ChocolateSchema);
module.exports = Chocolate;
