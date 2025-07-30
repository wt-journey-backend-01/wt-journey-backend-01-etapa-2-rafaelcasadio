const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");
const { casoSchema } = require("../utils/casoValidation");
const validator = require("validator");
const { z } = require("zod");
const { ApiError } = require("../utils/errorHandler");

function isValidUUID(uuid) {
  return validator.isUUID(uuid);
}

const getCasos = (req, res, next) => {
  try {
    let casos = casosRepository.findAll();
    const { status, agente_id } = req.query;
    if (status) {
      if (status !== "aberto" && status !== "solucionado")
        throw new ApiError(
          "Status Inválido. Valores permitido: aberto , solucionado",
          400
        );
      casos = [...casos].filter((c) => c.status === status);
    }
    if (agente_id) {
      if (!isValidUUID(agente_id))
        throw new ApiError("agente_id deve ser um UUID válido", 400);
      casos = [...casos].filter((c) => c.agente_id === agente_id);
    }
    res.status(200).json(casos);
  } catch (error) {
    next(error);
  }
};

const getCasoById = (req, res, next) => {
  const { id } = req.params;
  if (!isValidUUID(id)) throw new ApiError("ID deve ser um UUID válido", 400);
  try {
    const caso = casosRepository.findById(id);
    if (!caso) {
      throw new ApiError("Caso não encontrado", 404);
    }
    res.status(200).json(caso);
  } catch (error) {
    next(error);
  }
};

const getAgenteByCasoId = (req, res, next) => {
  const { caso_id } = req.params;
  if (!isValidUUID(caso_id))
    throw new ApiError("ID deve ser um UUID válido", 400);
  try {
    const caso = casosRepository.findById(caso_id);
    if (!caso) throw new ApiError("Caso não encontrado", 404);
    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) throw new ApiError("Agente responsavel não encontrado", 404);
    res.status(200).json(agente);
  } catch (error) {
    next(error);
  }
};

const searchCasos = (req, res, next) => {
  let { q } = req.query;
  q = q.toLowerCase();
  if (!q || typeof q !== "string" || q.trim() === "") {
    throw new ApiError("Query de busca inválida", 400);
  }
  try {
    const casos = casosRepository.findAll();
    const termo = q.toLowerCase();
    const resultados = casos.filter(
      (c) =>
        c.titulo.toLowerCase().includes(termo) ||
        c.descricao.toLowerCase().includes(termo)
    );
    res.status(200).json(resultados);
  } catch (error) {
    next(error);
  }
};

const createCaso = (req, res, next) => {
  try {
    if ("id" in req.body) {
      throw new ApiError("Não é permitido definir o ID do caso", 400);
    }
    const data = casoSchema.parse(req.body);
    if (!isValidUUID(data.agente_id))
      throw new ApiError("agente_id deve ser um UUID válido", 400);
    const agenteExiste = agentesRepository.findById(data.agente_id);
    if (!agenteExiste)
      throw new ApiError(
        "Agente não encontrado para o agente_id informado",
        404
      );
    const caso = casosRepository.create(data);
    res.status(201).json(caso);
  } catch (error) {
    if (error instanceof z.ZodError) {
      let mensagens = "";
      if (Array.isArray(error.errors)) {
        mensagens = error.errors.map((e) => e.message).join("; ");
      } else if (error.message) {
        mensagens = error.message;
      } else {
        mensagens = "Erro desconhecido";
      }
      return next(new ApiError(`Erro de validação: ${mensagens}`, 400));
    } else {
      next(error);
    }
  }
};

const updateCaso = (req, res, next) => {
  const { id } = req.params;
  if (!isValidUUID(id)) throw new ApiError("ID deve ser um UUID válido", 400);
  try {
    if ("id" in req.body) {
      // Não permitir alteração do id
      throw new ApiError("Não é permitido alterar o ID do caso", 400);
    }
    // Validação completa para PUT
    const data = casoSchema.parse(req.body);
    if (!isValidUUID(data.agente_id))
      throw new ApiError("agente_id deve ser um UUID válido", 400);
    const agenteExiste = agentesRepository.findById(data.agente_id);
    if (!agenteExiste)
      throw new ApiError(
        "Agente não encontrado para o agente_id informado",
        404
      );
    const updated = casosRepository.update(id, data);
    if (!updated) throw new ApiError("Caso não encontrado.", 404);
    res.status(200).json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      let mensagens = "";
      if (Array.isArray(error.errors)) {
        mensagens = error.errors.map((e) => e.message).join("; ");
      } else if (error.message) {
        mensagens = error.message;
      } else {
        mensagens = "Erro desconhecido";
      }
      return next(new ApiError(`Erro de validação: ${mensagens}`, 400));
    } else {
      next(error);
    }
  }
};

const patchCaso = (req, res, next) => {
  const { id } = req.params;
  if (!isValidUUID(id)) throw new ApiError("ID deve ser um UUID válido", 400);
  try {
    if ("id" in req.body) {
      // Não permitir alteração do id
      throw new ApiError("Não é permitido alterar o ID do caso", 400);
    }
    // Validação parcial para PATCH
    const data = casoSchema.partial().parse(req.body);
    if (data.agente_id) {
      const agenteExiste = agentesRepository.findById(data.agente_id);
      if (!agenteExiste)
        throw new ApiError(
          "Agente não encontrado para o agente_id informado",
          404
        );
    }
    const updated = casosRepository.update(id, data);
    if (!updated) throw new ApiError("Caso não encontrado.", 404);
    res.status(200).json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      let mensagens = "";
      if (Array.isArray(error.errors)) {
        mensagens = error.errors.map((e) => e.message).join("; ");
      } else if (error.message) {
        mensagens = error.message;
      } else {
        mensagens = "Erro desconhecido";
      }
      return next(new ApiError(`Erro de validação: ${mensagens}`, 400));
    } else {
      next(error);
    }
  }
};

const deleteCaso = (req, res, next) => {
  const { id } = req.params;
  if (!isValidUUID(id)) throw new ApiError("ID deve ser um UUID válido", 400);
  try {
    const removed = casosRepository.remove(id);
    if (!removed) throw new ApiError("Caso não encontrado.", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCasos,
  getCasoById,
  createCaso,
  updateCaso,
  patchCaso,
  deleteCaso,
  getAgenteByCasoId,
  searchCasos,
};
