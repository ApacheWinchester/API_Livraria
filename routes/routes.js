const express = require("express");
const router = express.Router();

const livrosController = require("../controller/livroController");
const funcionarioController = require("../controller/funcionarioController");

// funcionarios
router.get("/", (req, res) => {
	return res.json({ message: "Sistema de Livros" });
})

router.post("/add_funcionarios", funcionarioController.FuncionariosCreate);


router.get("/funcionarios/:id?", funcionarioController.verificaJWT, funcionarioController.FuncionariosListar);



router.post("/login", funcionarioController.FuncionariosVerificaLogin);


///Livros

router.post("/add_livros", livrosController.LivroCreate);

router.get("/livros/:id?", livrosController.LivroListar);



module.exports = router;