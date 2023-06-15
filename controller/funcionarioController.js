const Funcionarios = require("../model/funcionarioModel");
const jwt = require("jsonwebtoken");

module.exports = class FuncionariosController {
	static async FuncionariosCreate(req, res) {
		try {
			let nome = req.body.nome;
			let email = req.body.email;
			let senha = req.body.senha;
			const funcionario = {
				nome: nome,
				email: email,
				senha: senha
			};
			await Funcionarios.create(funcionario);
			res.json({ message: "Funcionário cadastrado com sucesso!" });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Erro ao cadastrar funcionário." });
		}
	}

	static async FuncionariosListar(req, res) {
		try {
			const id_funcionarios = req.params.id;
			if (id_funcionarios) {
				const funcionario = await Funcionarios.findOne({ where: { id_funcionarios: id_funcionarios } });
				res.json(funcionario);
			} else {
				const funcionarios = await Funcionarios.findAll({ raw: true });
				res.json(funcionarios);
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Erro ao listar funcionários." });
		}
	}

	static async FuncionariosVerificaLogin(req, res) {
		try {
			var email = req.body.email;
			var senha = req.body.senha;
			const funcionarioEncontrado = await Funcionarios.findOne({ where: { email: email, senha: senha } });
			if (funcionarioEncontrado) {
				const id = funcionarioEncontrado.id_funcionarios;
				const token = jwt.sign({ id }, process.env.SECRET, {
					expiresIn: 300
				});
				return res.json({ auth: true, token: token });
			} else {
				res.status(402).json({ message: "Erro ao logar no sistema" });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Erro ao verificar login do usuário." });
		}
	}

	static async verificaJWT(req, res, next) {
		try {
			const token = req.headers['x-access-token'];
			if (!token) {
				return res.status(401).json({
					auth: false,
					message: 'Nenhum token criado.'
				});
			}
			jwt.verify(token, process.env.SECRET, function(err, decoded) {
				if (err) {
					return res.status(500).json({ auth: false, message: 'Falha na autenticação com o token.' });
				}
				req.userId = decoded.id;
				next();
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Erro ao verificar token de autenticação." });
		}
	}
};
