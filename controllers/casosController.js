const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const { casoSchema } = require("../utils/casoValidation");
const { validate: isUuid, validate } = require("uuid");

class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

const getCasos = (req, res, next) => {
  try {
    let casos = casosRepository.findAll();
    const { status, id } = req.query;
    if (status) {
      if (status !== "aberto" && status !== "solucionado")
        return next(new ApiError('Status deve ser "aberto" ou "solucionado"', 400));
      casos = casos.filter((c) => c.status === status);
    }
    if (id) {
      if (!validate(id)) return next(new ApiError("Id Inválido", 400));
      casos = casos.filter((c) => c.agente_id === id);
    }
    res.status(200).json(casos);
  } catch (error) {
    next(new ApiError("Erro ao listar casos."));
  }
};

const getCasoById = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) return next(new ApiError("Id Inválido", 400));
  try {
    const caso = casosRepository.findById(id);
    if (!caso) {
      return next(new ApiError("Caso não encontrado", 404));
    }
    res.status(200).json(caso);
  } catch (error) {
    next(new ApiError("Erro ao listar caso po id."));
  }
};

const createCaso = (req, res, next) => {
  try {
    const data = casoSchema.parse(req.body);
    const agenteExiste = agentesRepository.findById(data.agente_id);
    if (!agenteExiste)
      return next(
        new ApiError("Agente não encontrado para o agente_id informado", 404)
      );
    const caso = casosRepository.create(data);
    res.status(201).json(caso);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const updateCaso = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) return next(new ApiError("Id Inválido", 400));
  try {
    const data = casoSchema.parse(req.body);
    const agenteExiste = agentesRepository.findById(data.agente_id);
    if (!agenteExiste)
      return next(
        new ApiError("Agente não encontrado para o agente_id informado", 404)
      );
    const updated = casosRepository.update(id, data);
    if (!updated) return next(new ApiError("Caso não encontrado.", 404));
    res.status(200).json(updated);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const patchCaso = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) return next(new ApiError("Id Inválido", 400));
  try {
    const data = casoSchema.partial().parse(req.body);
    if (data.agente_id) {
      const agenteExiste = agentesRepository.findById(data.agente_id);
      if (!agenteExiste)
        return next(
          new ApiError("Agente não encontrado para o agente_id informado", 404)
        );
    }
    const updated = casosRepository.update(id, data);
    if (!updated) return next(new ApiError("Caso não encontrado.", 404));
    res.status(200).json(updated);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const deleteCaso = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) return next(new ApiError("Id Inválido", 400));
  try {
    const removed = casosRepository.remove(id);
    if (!removed) return next(new ApiError("Caso não encontrado.", 404));
    res.status(204).send();
  } catch (error) {
    next(new ApiError("Erro ao remover caso.", 500));
  }
};

module.exports = {
  getCasos,
  getCasoById,
  createCaso,
  updateCaso,
  patchCaso,
  deleteCaso,
};
