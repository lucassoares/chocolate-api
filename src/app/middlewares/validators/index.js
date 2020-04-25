const yup = require('yup');

class Validators {
  async chocolateValidator(req, res, next) {
    const chocolateValidation = yup.object().shape({
      nome: yup.string().required(),
      marca: yup.string().required(),
      valor: yup.number().required(),
    });

    const validateChocolate = await chocolateValidation.isValid(req.body);

    if (!validateChocolate) {
      return res.status(400).json({ error: 'Dados não enviados corretamente' });
    }

    return next();
  }

  async userValidator(req, res, next) {
    const userValidation = yup.object().shape({
      email: yup.string().email().required(),
      senha: yup.string().required(),
      nome: yup.string().required(),
    });

    const validateUser = await userValidation.isValid(req.body);

    if (!validateUser) {
      return res.status(400).json({ error: 'Dados não enviados corretamente' });
    }

    return next();
  }
}

module.exports = new Validators();
