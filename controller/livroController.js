const Livro = require("../model/livrosModel");
module.exports = class livrosController {
	//CREATE
	static async LivroCreate(req, res) {
		let titulo = req.body.titulo;
		let autor = req.body.autor;
		let preco = req.body.preco;
		let link = req.body.link;

		const livro = {
			titulo: titulo,
			autor: autor,
			preco: preco,
			link: link
		}
		await Livro.create(livro);
		res.json({ message: "Livro cadastrado com sucesso!" });
	}
	//READ - LISTAR
	static async LivroListar(req, res) {
		const id_livros = req.params.id;
		if (id_livros) {
			const livro = await Livro.findOne({ where: { id_livros: id_livros } });
			res.json(livro);
		} else {
			const livro = await Livro.findAll({ raw: true });
			res.json(livro);
		}
	}
}