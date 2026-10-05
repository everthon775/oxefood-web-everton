import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let empresa = [
    { id: 1, nome: "Empresa Teste", cnpj: "00.000.000/0001-00", foneFixo: "(81) 99999-9999" }
];

let produto = [
    { id: 1, nome: "Arroz", codigo: "001", tipo: "Alimento" }
];

let cliente = [
    { id: 1, nome: "Cliente Teste", cpf: "000.000.000-00", foneCelular: "(81) 99999-9999", foneFixo: "", dataNascimento: "2000-01-01" }
];

let categoria = [
    { id: 1, nome: "Alimentos", descricao: "Produtos alimentícios" }
];

function criarRotas(nome, lista) {
    app.get(`/api/${nome}`, (req, res) => res.json(lista));

    app.get(`/api/${nome}/:id`, (req, res) => {
        const item = lista.find(x => x.id == req.params.id);
        if (!item) return res.status(404).json({ mensagem: "Não encontrado" });
        res.json(item);
    });

    app.post(`/api/${nome}`, (req, res) => {
        const novo = { id: lista.length ? lista[lista.length - 1].id + 1 : 1, ...req.body };
        lista.push(novo);
        res.status(201).json(novo);
    });

    app.put(`/api/${nome}/:id`, (req, res) => {
        const posicao = lista.findIndex(x => x.id == req.params.id);
        if (posicao === -1) return res.status(404).json({ mensagem: "Não encontrado" });
        lista[posicao] = { ...lista[posicao], ...req.body, id: Number(req.params.id) };
        res.json(lista[posicao]);
    });

    app.delete(`/api/${nome}/:id`, (req, res) => {
        const posicao = lista.findIndex(x => x.id == req.params.id);
        if (posicao === -1) return res.status(404).json({ mensagem: "Não encontrado" });
        lista.splice(posicao, 1);
        res.status(204).send();
    });
}

criarRotas("empresa", empresa);
criarRotas("produto", produto);
criarRotas("cliente", cliente);
criarRotas("categoria", categoria);

app.get("/", (req, res) => {
    res.json({ mensagem: "API OxeFood funcionando" });
});

app.listen(3001, () => {
    console.log("API rodando em http://localhost:3001");
});
