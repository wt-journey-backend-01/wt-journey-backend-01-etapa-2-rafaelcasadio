const { v4: uuidv4 } = require("uuid");

const agentes = [
  {
    id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "1992/10/04",
    cargo: "delegado",
  },
];

const findAll = () => agentes;

const findById = (id) => agentes.find((a) => a.id === id);

const create = (data) => {
  const novoCaso = { id: uuidv4(), ...data };
  agentes.push(novoCaso);
  return novoCaso;
};

const update = (id, data) => {
  const index = agentes.findIndex((a) => a.id === id);
  if (index !== -1) {
    agentes[index] = { ...agentes[index], ...data };
    return agentes[index];
  }
  return null;
};

const remove = (id) => {
  if (!id) return false;
  const index = agentes.findIndex((a) => a.id === id);
  if (index !== -1) {
    agentes.splice(index, 1);
    return true;
  }
};

module.exports = { findAll, findById, create, update, remove };
