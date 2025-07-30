const { v4: uuidv4 } = require("uuid");

const agentes = [
  {
    id: uuidv4(),
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "1992/10/04",
    cargo: "delegado",
  },
  {
    id: uuidv4(),
    nome: "Marina Diniz",
    dataDeIncorporacao: "2005/05/15",
    cargo: "investigador",
  },
  {
    id: uuidv4(),
    nome: "Carlos Silva",
    dataDeIncorporacao: "2010/08/20",
    cargo: "perito",
  },
  {
    id: uuidv4(),
    nome: "Ana Paula",
    dataDeIncorporacao: "2018/03/12",
    cargo: "agente",
  },
  {
    id: uuidv4(),
    nome: "João Pedro",
    dataDeIncorporacao: "2020/11/30",
    cargo: "auxiliar",
  },
  {
    id: uuidv4(),
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
