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
    capa: {
      type: String,
      default: "",
      validate: {
        // aceita: vazio, URL http(s) curta ou imagem em base64 (JPEG/PNG/WEBP) de até ~370 KB
        validator: (valor) =>
          !valor ||
          (/^https?:\/\//i.test(valor) && valor.length <= 2048) ||
          (/^data:image\/(jpeg|png|webp);base64,/.test(valor) && valor.length <= 500000),
        message: "Capa inválida: use uma URL http(s) ou uma imagem JPEG, PNG ou WEBP pequena.",
      },
    },
    tempoJogo: { type: Number, min: 0 },
    nota: { type: Number, min: 1, max: 10 },
    anotacoes: { type: String, trim: true, maxlength: 500, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jogo", jogoSchema);