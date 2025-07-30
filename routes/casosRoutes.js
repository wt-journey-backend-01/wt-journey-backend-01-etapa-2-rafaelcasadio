const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController");

/**
 * @swagger
 * tags:
 *   name: Casos
 *   description: Gerenciamento de casos policiais
 */

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Lista todos os casos registrados
 *     tags: [Casos]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [aberto, solucionado]
 *         description: Filtra casos por status
 *       - in: query
 *         name: agente_id
 *         schema:
 *           type: string
 *         description: Filtra casos por agente responsável
 *     responses:
 *       200:
 *         description: Lista de casos
 */
router.get("/", casosController.getCasos);

/**
 * @swagger
 * /casos/search:
 *   get:
 *     summary: Pesquisa casos por termo no título ou descrição
 *     tags: [Casos]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Termo de busca
 *     responses:
 *       200:
 *         description: Lista de casos encontrados
 *       400:
 *         description: Query de busca inválida
 */
router.get("/search", casosController.searchCasos);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Busca um caso pelo id
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do caso
 *     responses:
 *       200:
 *         description: Caso encontrado
 *       400:
 *         description: Id inválido
 *       404:
 *         description: Caso não encontrado
 */
router.get("/:id", casosController.getCasoById);

/**
 * @swagger
 * /casos/{caso_id}/agente:
 *   get:
 *     summary: Retorna o agente responsável por um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: caso_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do caso
 *     responses:
 *       200:
 *         description: Agente encontrado
 *       400:
 *         description: Id inválido
 *       404:
 *         description: Caso ou agente não encontrado
 */
router.get("/:caso_id/agente", casosController.getAgenteByCasoId);

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Cria um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       201:
 *         description: Caso criado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Agente não encontrado
 */
router.post("/", casosController.createCaso);

/**
 * @swagger
 * /casos/{id}:
 *   put:
 *     summary: Atualiza um caso por completo
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       200:
 *         description: Caso atualizado
 *       400:
 *         description: Dados inválidos ou id inválido
 *       404:
 *         description: Caso ou agente não encontrado
 */
router.put("/:id", casosController.updateCaso);

/**
 * @swagger
 * /casos/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do caso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       200:
 *         description: Caso atualizado
 *       400:
 *         description: Dados inválidos ou id inválido
 *       404:
 *         description: Caso ou agente não encontrado
 */
router.patch("/:id", casosController.patchCaso);

/**
 * @swagger
 * /casos/{id}:
 *   delete:
 *     summary: Remove um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do caso
 *     responses:
 *       204:
 *         description: Caso removido
 *       400:
 *         description: Id inválido
 *       404:
 *         description: Caso não encontrado
 */
router.delete("/:id", casosController.deleteCaso);

/**
 * @swagger
 * components:
 *   schemas:
 *     Caso:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *         descricao:
 *           type: string
 *         status:
 *           type: string
 *           enum: [aberto, solucionado]
 *         agente_id:
 *           type: string
 *           format: uuid
 *       required:
 *         - titulo
 *         - descricao
 *         - status
 *         - agente_id
 */

module.exports = router;
