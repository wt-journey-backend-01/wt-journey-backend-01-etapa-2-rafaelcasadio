const { v4: uuidv4 } = require("uuid");

const casos = [];

const findAll = () => casos;

const findById = (id) => casos.find((c) => c.id === id);

const create = (data) => {
  const novoCaso = { id: uuidv4(), ...data };
  casos.push(novoCaso);
  return novoCaso;
};

const update = (id, data) => {
  const index = casos.findIndex((c) => c.id === id);
  if (index !== -1) {
    casos[index] = { ...casos[index], ...data };
    return casos[index];
  }
  return null;
};

const remove = (id, data) => {
  const index = casos.findIndex((c) => c.id === id);
  if (index !== -1) {
    casos.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { findAll, findById, create, update, remove };
