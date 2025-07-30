const { v4: uuidv4 } = require("uuid");

const agentes = [];

const findAll = () => agentes;

const findById = (id) => agentes.find((a) => a.id === id);

const create = (data) => {
  const novoAgente = { id: uuidv4(), ...data };
  agentes.push(novoAgente);
  return novoAgente;
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
  return false;
};

module.exports = { findAll, findById, create, update, remove };
