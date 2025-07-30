const agentesRepository = require("../repositories/agentesRepository");
const { agenteSchema } = require("../utils/agenteValidation");
const { validate } = require("uuid");

const getAgentes = (req, res, next) => {
  try {
    let agentes = agentesRepository.findAll();
    const { cargo, sort } = req.query;
    if (cargo) {
      if (cargo !== "inspetor" && cargo !== "delegado")
        throw new ApiError('Cargo deve ser "inspetor" ou "delegado"', 400);
      agentes = [...agentes].filter((a) => a.cargo === cargo);
    }
    if (sort) {
      agentes = agentes.filter(
        (a) => a.dataDeIncorporacao && !isNaN(new Date(a.dataDeIncorporacao))
      );

      if (sort !== "dataDeIncorporacao" && sort !== "-dataDeIncorporacao")
        throw new ApiError(
          'Sort deve ser "dataDeIncorporacao" ou "-dataDeIncorporacao"',
          400
        );
      if (sort === "dataDeIncorporacao")
        agentes = [...agentes].sort(
          (a, b) =>
            new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao)
        );
      else if (sort === "-dataDeIncorporacao")
        agentes = [...agentes].sort(
          (a, b) =>
            new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao)
        );
    }
    res.status(200).json(agentes);
  } catch (error) {
    next(error);
  }
};

const getAgenteById = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) throw new ApiError("ID deve ser um UUID válido", 400);
  try {
    const agente = agentesRepository.findById(id);
    if (!agente) {
      throw new ApiError("Agente não encontrado", 404);
    }
    res.status(200).json(agente);
  } catch (error) {
    next(error);
  }
};

const createAgente = (req, res, next) => {
  try {
    const { id, ...rest } = req.body;
    const data = agenteSchema.parse(rest);
    const agente = agentesRepository.create(data);
    res.status(201).json(agente);
  } catch (error) {
    next(error);
  }
};

const updateAgente = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) throw new ApiError("ID deve ser um UUID válido", 400);
  try {
    const data = agenteSchema.parse(req.body);
    const updated = agentesRepository.update(id, data);
    if (!updated) throw new ApiError("Agente não encontrado.", 404);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const patchAgente = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) throw new ApiError("ID deve ser um UUID válido", 400);
  try {
    const data = agenteSchema.partial().parse(req.body);
    const updated = agentesRepository.update(id, data);
    if (!updated) throw new ApiError("Agente não encontrado.", 404);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteAgente = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) throw new ApiError("ID deve ser um UUID válido", 400);
  try {
    const removed = agentesRepository.remove(id);
    if (!removed) throw new ApiError("Agente não encontrado.", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  patchAgente,
  deleteAgente,
};
