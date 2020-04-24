const chocolateModel = require('../models/chocolate');

class ChocolateController {
  // index -> listagem completa
  async index(req, res) {
    const chocolates = await chocolateModel.find();
    return res.json(chocolates);
  }

  // req -> mid(jwt) -> mid (validacao) -> controller

  // store -> salvar dados
  async store(req, res) {
    const { key } = req.file;

    req.body.imagem = `localhost:3000/images/${key}`;

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
    return res.json({ msg: 'Chocolate foi deletado' });
  }
}

module.exports = new ChocolateController();
