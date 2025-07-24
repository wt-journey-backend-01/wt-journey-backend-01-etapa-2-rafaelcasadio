const agentesRepository = require("../repositories/agentesRepository");
const { agenteSchema } = require("../utils/agenteValidation");
const { validate: isUuid, validate } = require("uuid");

class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

const getAgentes = (req, res, next) => {
  try {
    let agentes = agentesRepository.findAll();
    const { cargo, sort } = req.query;
    if (cargo) {
      if (cargo !== "inspetor" && cargo !== "delegado")
        return next(
          new ApiError('Cargo deve ser "inspetor" ou "delegado"', 400)
        );
      agentes = agentes.filter((a) => a.cargo === cargo);
    }
    if (sort) {
      if (sort !== "dataDeIncorporacao" && sort !== "-dataDeIncorporacao")
        return next(
          new ApiError(
            'Sort deve ser "dataDeIncorporacao" ou "-dataDeIncorporacao"',
            400
          )
        );
      if (sort === "dataDeIncorporacao")
        agentes = agentes.sort(
          (a, b) =>
            new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao)
        );
      else if (sort === "-dataDeIncorporacao")
        agentes = agentes.sort(
          (a, b) =>
            new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao)
        );
    }
    res.status(200).json(agentes);
  } catch (error) {
    next(new ApiError("Erro ao listar agentes."));
  }
};

const getAgenteById = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) return next(new ApiError("Id Inválido", 400));
  try {
    const agente = agentesRepository.findById(id);
    if (!agente) {
      return next(new ApiError("Agente não encontrado", 404));
    }
    res.status(200).json(agente);
  } catch (error) {
    next(new ApiError("Erro ao listar agente por id."));
  }
};

const createAgente = (req, res, next) => {
  try {
    const data = agenteSchema.parse(req.body);
    const agente = agentesRepository.create(data);
    res.status(201).json(agente);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const updateAgente = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) return next(new ApiError("Id Inválido", 400));
  try {
    const data = agenteSchema.parse(req.body);
    const updated = agentesRepository.update(id, data);
    if (!updated) return next(new ApiError("Agente não encontrado.", 404));
    res.status(200).json(updated);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const patchAgente = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) return next(new ApiError("Id Inválido", 400));
  try {
    const data = agenteSchema.partial().parse(req.body);
    const updated = agentesRepository.update(id, data);
    if (!updated) return next(new ApiError("Agente não encontrado.", 404));
    res.status(200).json(updated);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const deleteAgente = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) return next(new ApiError("Id Inválido", 400));
  try {
    const removed = agentesRepository.remove(id);
    if (!removed) return next(new ApiError("Agente não encontrado.", 404));
    res.status(204).send();
  } catch (error) {
    next(new ApiError("Erro ao remover agente.", 500));
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
