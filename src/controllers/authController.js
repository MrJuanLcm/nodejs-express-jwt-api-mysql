const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const {
  CREATED,
  NOT_FOUND,
  UNAUTHORIZED,
  OK,
  CONFLICT,
} = require("http-status-codes");

// Tu clave secreta para firmar los tokens
const secretKey = process.env.APP_KEY;

const connect = require("../../database");

// El tiempo de expiración de un JWT
// Segundos = s
// Minutos = m
// Horas = h
// Días = d
let expiresIn = "5m";

// Función para generar un token de sesión
function generateToken(id, username) {
  const payload = { userId: id.toString(), username: username };
  // Para crear un JWT, utiliza la función sign proporcionada por el paquete jsonwebtoken
  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
}

const signIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const db = await connect();

  const [rows] = await db.query(`SELECT * FROM users WHERE username = ?`, [
    username,
  ]);

  const user = rows[0];

  if (!user) {
    res.status(NOT_FOUND);
    throw new Error("Usuario no encontrado");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(UNAUTHORIZED);
    throw new Error("Credenciales invalidas");
  }

  const token = generateToken(user.id, user.username);

  const responseData = {
    token_type: "Bearer",
    access_token: token,
    access_token_expires_in: expiresIn,
    scope: null,
  };

  res.status(CREATED).send(responseData);
});

const signUp = asyncHandler(async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  const db = await connect();

  const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  const user = rows[0];

  if (user) {
    res.status(CONFLICT);
    throw new Error("Usuario ya existe");
  }

  const pass = await bcrypt.hash(password, 10);

  await db.query(
    `
    INSERT INTO users (username, password, email, firstName, lastName)
    VALUES (?,?,?,?,?)
    `,
    [username, pass, email, firstName, lastName]
  );

  const responseData = {
    code: 200,
    message: "Successful",
    stack: null,
  };

  res.status(OK).send(responseData);
});

module.exports = {
  signIn,
  signUp,
};
