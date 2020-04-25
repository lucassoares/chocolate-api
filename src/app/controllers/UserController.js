const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user'); // imports node_modules imports internos

class UserController {
  // store -> salvar usuario no banco de dados
  async store(req, res) {
    const user = await userModel.create(req.body);

    user.senha = undefined; // removendo o valor senha do objeto user para responder a req

    return res.status(201).json(user);
  }

  // index -> listagem completa dos usuarios
  async index(req, res) {
    const users = await userModel.find();
    return res.json(users);
  }

  // auth -> verifica se a senha ta correta
  async auth(req, res) {
    const { email, senha } = req.body;

    // busca pelo usuario
    const user = await userModel.findOne({ email }); // email: email

    // verificando se a senha esta valida
    if (!(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ error: 'Credenciais invalidas' });
    }

    const { _id: id } = user;

    const token = jwt.sign({ id }, process.env.JWT_KEY, {
      expiresIn: '1d',
    });

    // enviar token para o usuario com status 200
    return res.json({ token });
  }

  // show -> listar apenas 1 usuario
  async show(req, res) {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    return res.json(user);
  }

  // update -> atualizar 1 usuario
  async update(req, res) {
    const { userId } = req.params;
    const user = await userModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    return res.json(user);
  }

  // destroy -> deletar 1 usuario
  async destroy(req, res) {
    const { userId } = req.params;
    await userModel.findByIdAndDelete(userId);
    return res.json({ msg: 'Usuario foi deletado' });
  }
}

module.exports = new UserController();
