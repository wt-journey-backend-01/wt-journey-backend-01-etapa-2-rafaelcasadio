const agentesRepository = require("../repositories/agentesRepository");
const { agenteSchema } = require("../utils/agenteValidation");
const { validate: isUuid } = require("uuid");

class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

const getAgentes = (req, res, next) => {
  try {
    const agentes = agentesRepository.findAll();
    if (!agentes) next(new ApiError("Agentes não encontrados", 404));
    res.status(200).json(agentes);
  } catch (error) {
    next(new ApiError("Erro ao listar agentes."));
  }
};

const getAgenteById = (req, res, next) => {
  const { id } = req.params;
  if (!isUuid(id)) next(new ApiError("Id Inválido", 400));
  try {
    const agente = agentesRepository.findById(id);
    if (!agente) next(new ApiError("Agente não encontrado", 404));
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
  if (!isUuid(id)) next(new ApiError("Id Inválido", 400));
  try {
    const data = agenteSchema.parse(req.body);
    const updated = agentesRepository.update(id, data);
    if (!updated) next(new ApiError("Agente não encontrado.", 404));
    res.status(200).json(updated);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const patchAgente = (req, res, next) => {
  const { id } = req.params;
  if (!isUuid(id)) next(new ApiError("Id Inválido", 400));
  try {
    const data = agenteSchema.partial().parse(req.body);
    const updated = agentesRepository.update(id, data);
    if (!updated) next(new ApiError("Agente não encontrado.", 404));
    res.status(200).json(updated);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const deleteAgente = (req, res, next) => {
  const { id } = req.params;
  if (!isUuid(id)) next(new ApiError("Id Inválido", 400));
  try {
    const removed = agentesRepository.remove(id);
    if (!removed) next(new ApiError("Agente não encontrado.", 404));
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
