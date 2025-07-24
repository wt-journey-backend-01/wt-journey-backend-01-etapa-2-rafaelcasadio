const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const { casoSchema } = require("../utils/casoValidation");
const { validate: isUuid } = require("uuid");

class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

const getCasos = (req, res, next) => {
  try {
    const casos = casosRepository.findAll();
    if (!casos) next(new ApiError("Casos não encontrados", 404));
    res.status(200).json(casos);
  } catch (error) {
    next(new ApiError("Erro ao listar casos."));
  }
};

const getCasoById = (req, res, next) => {
  const { id } = req.params;
  if (!isUuid(id)) next(new ApiError("Id Inválido", 400));
  try {
    const caso = casosRepository.findById(id);
    if (!caso) next(new ApiError("Caso não encontrado", 404));
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
      next(
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
  if (!isUuid(id)) next(new ApiError("Id Inválido", 400));
  try {
    const data = casoSchema.parse(req.body);
    const agenteExiste = agentesRepository.findById(data.agente_id);
    if (!agenteExiste)
      next(
        new ApiError("Agente não encontrado para o agente_id informado", 404)
      );
    const updated = casosRepository.update(id, data);
    if (!updated) next(new ApiError("Caso não encontrado.", 404));
    res.status(200).json(updated);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const patchCaso = (req, res, next) => {
  const { id } = req.params;
  if (!isUuid(id)) next(new ApiError("Id Inválido", 400));
  try {
    const data = casoSchema.partial().parse(req.body);
    if (data.agente_id) {
      const agenteExiste = agentesRepository.findById(data.agente_id);
      if (!agenteExiste)
        next(
          new ApiError("Agente não encontrado para o agente_id informado", 404)
        );
    }
    const updated = casosRepository.update(id, data);
    if (!updated) next(new ApiError("Caso não encontrado.", 404));
    res.status(200).json(updated);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const deleteCaso = (req, res, next) => {
  const { id } = req.params;
  if (!isUuid(id)) next(new ApiError("Id Inválido", 400));
  try {
    const removed = casosRepository.remove(id);
    if (!removed) next(new ApiError("Caso não encontrado.", 404));
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
