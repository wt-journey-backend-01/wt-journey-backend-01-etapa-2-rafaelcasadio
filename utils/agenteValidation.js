const { z } = require("zod");

const agenteSchema = z.object({
  nome: z
    .string({ required_error: "Nome é obrigatório." })
    .min(1, "Nome não pode ser vazio."),

  dataDeIncorporacao: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Data deve estar no formato YYYY-MM-DD",
    }),

  cargo: z.enum(["inspetor", "delegado"], {
    message: "Cargo deve ser 'inspetor' ou 'delegado'",
  }),
});

module.exports = { agenteSchema };
