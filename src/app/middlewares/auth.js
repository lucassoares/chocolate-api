const { promisify } = require("util");
const jwt = require("jsonwebtoken");

// body -> req.body - POST, PUT
// url -> req.params - DELETE, PUT, GET 1 info
// header -> req.headers -> POST, PUT, GET, DELETE -> token

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.status(401).json({ error: "Token com formato inválido" });
  }

  //parts = ["Bearer", "8394kdjsdkjsd"];

  const [scheme, token] = parts;
  // const scheme = parts[0];
  // const token = parts[1];

  if (!scheme === "Bearer") {
    return res.status(401).json({ error: "Token sem o prefixo Bearer" });
  }

  try {
    const tokenDecoded = await promisify(jwt.verify)(
      token,
      "0cc25b606fe928a0c9a58f7f209c4495"
    );
    console.log(tokenDecoded.id); //id do usuario que estava no token
    return next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
