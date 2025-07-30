const { v4: uuidv4 } = require("uuid");

const agentes = [
  {
    id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "1992/10/04",
    cargo: "delegado",
  },
  {
    id: "b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
    nome: "Marina Diniz",
    dataDeIncorporacao: "2005/05/15",
    cargo: "investigador",
  },
  {
    id: "a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6",
    nome: "Carlos Silva",
    dataDeIncorporacao: "2010/08/20",
    cargo: "perito",
  },
  {
    id: "d7e8f9a0-b1c2-d3e4-f5a6-b7c8d9e0f1a2",
    nome: "Ana Paula",
    dataDeIncorporacao: "2018/03/12",
    cargo: "agente",
  },
  {
    id: "f3a4b5c6-d7e8-f9a0-b1c2-d3e4f5a6b7c8",
    nome: "João Pedro",
    dataDeIncorporacao: "2020/11/30",
    cargo: "auxiliar",
  },
  {
    id: "e9f8a7b6-c5d4-e3f2-a1b0-c9d8e7f6a5b4",
    nome: "Luciana Costa",
    dataDeIncorporacao: "2019/07/22",
    cargo: "investigador",
  },
];

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
