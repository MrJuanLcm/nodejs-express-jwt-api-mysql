require("dotenv").config(); //  se utiliza para cargar variables de entorno desde un archivo .env
const express = require("express");
const axios = require("axios");
const { notFound, errorHandler } = require("./src/middlewares/errorMiddleware");
const { protect } = require("./src/middlewares/authMiddleware");
const helmet = require("helmet");

const app = express();

if (process.env.NODE_ENV === "development") {
  /* Morgan es un middleware para Node.js y Express que se utiliza para 
  registrar las solicitudes HTTP y los errores.*/
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.get("/", (req, res) => res.json({ status: "Server ok" }));

app.use("/api/auth", require("./src/routes/authRoutes"));

app.use("/api/user", [protect], require("./src/routes/userRoutes"));

// Helmet como middleware de seguridad
app.use(helmet());

app.use([notFound, errorHandler]);

module.exports = app;
