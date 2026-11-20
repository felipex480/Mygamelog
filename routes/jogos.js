const express = require("express");
const router = express.Router();
const Jogo = require("../models/Jogo");

/**
 * @swagger
 * /jogos:
 *   post:
 *     tags: [Jogos]
 *     summary: Cadastra um novo jogo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Jogo'
 *     responses:
 *       201:
 *         description: Jogo criado com sucesso
 *       400:
 *         description: Dados inválidos (ex. título ausente)
 */
router.post("/", async (req, res) => {
  try {
    const jogo = await Jogo.create(req.body);
    res.status(201).json(jogo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

/**
 * @swagger
 * /jogos:
 *   get:
 *     tags: [Jogos]
 *     summary: Lista todos os jogos
 *     responses:
 *       200:
 *         description: Lista de jogos, do mais recente para o mais antigo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jogo'
 */
router.get("/", async (req, res) => {
  try {
    const jogos = await Jogo.find().sort({ createdAt: -1 });
    res.json(jogos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

/**
 * @swagger
 * /jogos/{id}:
 *   get:
 *     tags: [Jogos]
 *     summary: Busca um jogo pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do jogo (gerado pelo MongoDB)
 *         example: 6b00927073ac212f3d20b879
 *     responses:
 *       200:
 *         description: Jogo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jogo'
 *       404:
 *         description: Jogo não encontrado
 *       400:
 *         description: Id inválido
 */
router.get("/:id", async (req, res) => {
  try {
    const jogo = await Jogo.findById(req.params.id);
    if (!jogo) return res.status(404).json({ erro: "Jogo não encontrado" });
    res.json(jogo);
  } catch (err) {
    res.status(400).json({ erro: "ID inválido" });
  }
});

/**
 * @swagger
 * /jogos/{id}:
 *   put:
 *     tags: [Jogos]
 *     summary: Edita um jogo (envie só os campos que quer alterar)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do jogo
 *         example: 6b00927073ac212f3d20b879
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nota: 9
 *               statusConclusao: jogando
 *     responses:
 *       200:
 *         description: Jogo atualizado
 *       404:
 *         description: Jogo não encontrado
 *       400:
 *         description: Dados ou id inválidos
 */
router.put("/:id", async (req, res) => {
  try {
    const jogo = await Jogo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!jogo) return res.status(404).json({ erro: "Jogo não encontrado" });
    res.json(jogo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

/**
 * @swagger
 * /jogos/{id}:
 *   delete:
 *     tags: [Jogos]
 *     summary: Exclui um jogo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do jogo
 *         example: 6b00927073ac212f3d20b879
 *     responses:
 *       200:
 *         description: Jogo removido com sucesso
 *       404:
 *         description: Jogo não encontrado
 *       400:
 *         description: Id inválido
 */
router.delete("/:id", async (req, res) => {
  try {
    const jogo = await Jogo.findByIdAndDelete(req.params.id);
    if (!jogo) return res.status(404).json({ erro: "Jogo não encontrado" });
    res.json({ mensagem: "Jogo removido com sucesso" });
  } catch (err) {
    res.status(400).json({ erro: "ID inválido" });
  }
});

module.exports = router;