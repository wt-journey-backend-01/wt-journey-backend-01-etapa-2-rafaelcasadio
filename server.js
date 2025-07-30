const express = require("express");
const agentesRoutes = require("./routes/agentesRoutes");
const casosRoutes = require("./routes/casosRoutes");
const {errorHandler} = require('./utils/errorHandler');
const setupSwagger = require('./docs/swagger');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/agentes", agentesRoutes);
app.use("/casos", casosRoutes);

app.use(errorHandler);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(
    `Servidor do Departamento de Polícia rodando em localhost:${PORT}`
  );
});
