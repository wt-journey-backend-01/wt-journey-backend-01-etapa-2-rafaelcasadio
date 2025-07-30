const agentesRepository = require("../repositories/agentesRepository");
const { agenteSchema } = require("../utils/agenteValidation");
const validator = require("validator");
const { z } = require("zod");
const { ApiError } = require("../utils/errorHandler");

function isValidUUID(uuid) {
  return validator.isUUID(uuid);
}

const getAgentes = (req, res, next) => {
  try {
    let agentes = agentesRepository.findAll();
    const { cargo, sort } = req.query;
    if (cargo) {
      agentes = [...agentes].filter(
        (a) => a.cargo.toLocaleLowerCase() === cargo.toLocaleLowerCase()
      );
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
  if (!isValidUUID(id)) throw new ApiError("ID deve ser um UUID válido", 400);
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
    if ("id" in req.body) {
      // Não permitir criação com id customizado
      throw new ApiError("Não é permitido definir o ID do agente", 400);
    }
    const data = agenteSchema.parse(req.body);
    const agente = agentesRepository.create(data);
    res.status(201).json(agente);
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

const updateAgente = (req, res, next) => {
  const { id } = req.params;
  if (!isValidUUID(id)) throw new ApiError("ID deve ser um UUID válido", 400);
  try {
    if ("id" in req.body) {
      throw new ApiError("Não é permitido alterar o ID do agente", 400);
    }
    const data = agenteSchema.parse(req.body);
    const updated = agentesRepository.update(id, data);
    if (!updated) throw new ApiError("Agente não encontrado.", 404);
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

const patchAgente = (req, res, next) => {
  const { id } = req.params;
  if (!isValidUUID(id)) throw new ApiError("ID deve ser um UUID válido", 400);
  try {
    if ("id" in req.body) {
      throw new ApiError("Não é permitido alterar o ID do agente", 400);
    }
    const data = agenteSchema.partial().parse(req.body);
    const updated = agentesRepository.update(id, data);
    if (!updated) throw new ApiError("Agente não encontrado.", 404);
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

const deleteAgente = (req, res, next) => {
  const { id } = req.params;
  if (!isValidUUID(id)) throw new ApiError("ID deve ser um UUID válido", 400);
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
