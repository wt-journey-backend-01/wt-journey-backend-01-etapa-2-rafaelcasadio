const { v4: uuidv4 } = require("uuid");

const casos = [
  {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
        dataOcorrencia: "2007-07-10"
    },
    {
        id: "b2c3d4e5-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
        titulo: "furto",
        descricao: "Relato de furto de veículo na região central, ocorrido entre 20:00 e 21:00 do dia 11/07/2007.",
        status: "fechado",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
        dataOcorrencia: "2007-07-11"
    },
    {
        id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        titulo: "roubo",
        descricao: "Roubo a mão armada registrado às 18:45 do dia 12/07/2007 no bairro Centro.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
        dataOcorrencia: "2007-07-12"
    },
    {
        id: "d7e8f9g0-h1i2-j3k4-l5m6-n7o8p9q0r1s2",
        titulo: "sequestro",
        descricao: "Caso de sequestro relatado às 14:20 do dia 13/07/2007, envolvendo uma vítima de 30 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
        dataOcorrencia: "2007-07-13"
    },
    {
        id: "t3u4v5w6-x7y8-z9a0-b1c2-d3e4f5g6h7i8",
        titulo: "estupro",
        descricao: "Denúncia de estupro recebida às 09:15 do dia 14/07/2007, com a vítima sendo uma mulher de 25 anos.",
        status: "aberto",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
        dataOcorrencia: "2007-07-14"
    }
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

const remove = (id) => {
  const index = casos.findIndex((c) => c.id === id);
  if (index !== -1) {
    casos.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { findAll, findById, create, update, remove };
