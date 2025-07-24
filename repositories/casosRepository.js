const { v4: uuidv4 } = require("uuid");

const casos = [
  {
    id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    titulo: "homicidio",
    descricao:
      "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
  },
];

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
