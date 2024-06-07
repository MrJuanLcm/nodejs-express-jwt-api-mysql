const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  const msg = `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`;
  console.log(msg);
});
