const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const connect = require("../../database");

const { OK, NOT_FOUND } = require("http-status-codes");

const editUser = asyncHandler(async (req, res) => {
  const { username, password, email, firstName, lastName, id } = req.body;

  const db = await connect();

  const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);
  const user = rows[0];

  if (!user) {
    res.status(NOT_FOUND);
    throw new Error("Usuario no encontrado");
  }

  const pass = await bcrypt.hash(password, 10);

  await db.query(
    `UPDATE users SET username=?, password=?, email=?, firstName=?, lastName=? WHERE id = ?`,
    [username, pass, email, firstName, lastName, id]
  );

  const responseData = {
    code: OK,
    message: "Successful",
    stack: null,
  };

  res.status(OK).send(responseData);
});

module.exports = { editUser };
