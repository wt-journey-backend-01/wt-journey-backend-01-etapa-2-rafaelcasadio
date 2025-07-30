const { z } = require("zod");

const agenteSchema = z.object({
  nome: z
    .string({ required_error: "Nome é obrigatório." })
    .min(1, "Nome não pode ser vazio."),

  dataDeIncorporacao: z
    .string({
      required_error: "Data de incorporação é obrigatória.",
    })
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "Data deve estar no formato YYYY-MM-DD",
    })
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      {
        message: "Data inválida no calendário.",
      }
    )
    .refine(
      (val) => {
        const inputDate = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return inputDate <= today;
      },
      {
        message: "Data de incorporação não pode ser no futuro.",
      }
    ),
  cargo: z
    .string({ required_error: "Cargo é obrigatório." })
    .min(1, "Cargo não pode ser vazio.")
});

module.exports = { agenteSchema };
