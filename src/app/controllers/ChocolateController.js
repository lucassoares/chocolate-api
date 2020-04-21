const yup = require("yup");
const chocolateModel = require("../models/chocolate");

class ChocolateController {
  // index -> listagem completa
  async index(req, res) {
    const chocolates = await chocolateModel.find();
    return res.json(chocolates);
  }

  // store -> salvar dados
  async store(req, res) {
    const chocolateValidation = yup.object().shape({
      nome: yup.string().required(),
      marca: yup.string().required(),
      valor: yup.number().required(),
    });

    const validateChocolate = await chocolateValidation.isValid(req.body); // true ou false

    if (!validateChocolate) {
      return res.status(400).json({ error: "Dados não enviados corretamente" });
    }
    const chocolate = await chocolateModel.create(req.body);
    return res.status(201).json(chocolate);
  }

  // show -> listar apenas 1 chocolate
  async show(req, res) {
    const { id } = req.params;
    const chocolate = await chocolateModel.findById(id);
    return res.json(chocolate);
  }

  // update -> atualizar 1 chocolate
  async update(req, res) {
    const { id } = req.params;
    const chocolate = await chocolateModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json(chocolate);
  }

  // destroy -> deletar 1 chocolate
  async destroy(req, res) {
    const { id } = req.params;
    await chocolateModel.findByIdAndDelete(id);
    return res.json({ msg: "Chocolate foi deletado" });
  }
}

module.exports = new ChocolateController();
