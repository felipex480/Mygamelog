const mongoose = require("mongoose");

const jogoSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    desenvolvedora: { type: String, trim: true },
    anoLancamento: { type: Number, min: 1958, max: 2099 },
    genero: { type: String, required: true },
    plataformas: [String],
    modosJogo: [String],
    midia: { type: String, enum: ["Física", "Digital"], required: true },
    statusConclusao: {
      type: String,
      enum: ["naoIniciado", "jogando", "parado", "completo"],
      default: "naoIniciado",
    },
    capa: { type: String, default: "" },
    tempoJogo: { type: Number, min: 0 },
    nota: { type: Number, min: 1, max: 10 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jogo", jogoSchema);