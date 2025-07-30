const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");

/**
 * @swagger
 * tags:
 *   name: Agentes
 *   description: Gerenciamento de agentes do departamento de Polícia
 */

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Lista todos os agentes
 *     tags: [Agentes]
 *     parameters:
 *       - in: query
 *         name: cargo
 *         schema:
 *           type: string
 *           enum: [inspetor, delegado]
 *         description: Filtra agentes por cargo
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [dataDeIncorporacao, -dataDeIncorporacao]
 *         description: Ordena agentes pela data de incorporação
 *     responses:
 *       200:
 *         description: Lista de agentes
 *       404:
 *         description: Nenhum agente encontrado
 */
router.get("/", agentesController.getAgentes);

/**
 * @swagger
 * /agentes/{id}:
 *   get:
 *     summary: Busca um agente pelo id
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do agente
 *     responses:
 *       200:
 *         description: Agente encontrado
 *       400:
 *         description: Id inválido
 *       404:
 *         description: Agente não encontrado
 */
router.get("/:id", agentesController.getAgenteById);

/**
 * @swagger
 * /agentes:
 *   post:
 *     summary: Cria um novo agente
 *     tags: [Agentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       201:
 *         description: Agente criado
 *       400:
 *         description: Dados inválidos
 */
router.post("/", agentesController.createAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   put:
 *     summary: Atualiza um agente
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do agente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       200:
 *         description: Agente atualizado
 *       400:
 *         description: Dados inválidos ou id inválido
 *       404:
 *         description: Agente não encontrado
 */
router.put("/:id", agentesController.updateAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um agente
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do agente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       200:
 *         description: Agente atualizado
 *       400:
 *         description: Dados inválidos ou id inválido
 *       404:
 *         description: Agente não encontrado
 */
router.patch("/:id", agentesController.patchAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   delete:
 *     summary: Remove um agente
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do agente
 *     responses:
 *       204:
 *         description: Agente removido
 *       400:
 *         description: Id inválido
 *       404:
 *         description: Agente não encontrado
 */
router.delete("/:id", agentesController.deleteAgente);

/**
 * @swagger
 * components:
 *   schemas:
 *     Agente:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         dataDeIncorporacao:
 *           type: string
 *           format: date
 *         cargo:
 *           type: string
 *           enum: [inspetor, delegado]
 *       required:
 *         - nome
 *         - dataDeIncorporacao
 *         - cargo
 */

module.exports = router;
