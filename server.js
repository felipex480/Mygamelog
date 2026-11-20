require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ===== Configuração do Swagger =====
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GameLog API",
      version: "1.0.0",
      description: "API REST para gerenciar uma coleção de jogos (CRUD completo).",
    },
    tags: [{ name: "Jogos", description: "Operações de CRUD de jogos" }],
    components: {
      schemas: {
        Jogo: {
          type: "object",
          required: ["titulo", "genero", "midia"],
          properties: {
            titulo: { type: "string", example: "The Witcher 3" },
            desenvolvedora: { type: "string", example: "CD Projekt Red" },
            anoLancamento: { type: "integer", example: 2015 },
            genero: { type: "string", example: "RPG" },
            plataformas: {
              type: "array",
              items: { type: "string" },
              example: ["PC", "PlayStation"],
            },
            modosJogo: {
              type: "array",
              items: { type: "string" },
              example: ["Singleplayer"],
            },
            midia: { type: "string", enum: ["Física", "Digital"], example: "Digital" },
            statusConclusao: {
              type: "string",
              enum: ["naoIniciado", "jogando", "parado", "completo"],
              example: "completo",
            },
            capa: { type: "string", example: "" },
            tempoJogo: { type: "integer", example: 120 },
            nota: { type: "integer", minimum: 1, maximum: 10, example: 10 },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ===================================

app.get("/", (req, res) => res.json({ status: "API GameLog online" }));
app.use("/jogos", require("./routes/jogos"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar:", err.message));

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando na porta 3000");
});