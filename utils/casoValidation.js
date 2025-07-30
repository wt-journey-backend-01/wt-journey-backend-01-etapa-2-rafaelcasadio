const { z } = require("zod");

const casoSchema = z.object({
  titulo: z
    .string({ required_error: "Titulo é obrigatório." })
    .min(1, "Titulo não pode ser vazio."),

  descricao: z
    .string({ required_error: "Descrição é obrigatória." })
    .min(1, "Descrição não pode ser vazia."),

  status: z.enum(["aberto", "solucionado"], {
    required_error: "Status é obrigatório.",
    invalid_type_error: 'Status deve ser "aberto" ou "solucionado".',
  }),

  agente_id: z.uuid({
    required_error: "ID do agente é obrigatório.",
    message: "ID deve ser um UUID válido",
  }),
});

module.exports = { casoSchema };
