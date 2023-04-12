const express = require ("express");
const port = 8080;
const alunos = require ("./model/alunos.js");

const app = express();
app.use(express.json());

app.listen(port, () => {
    console.log("listening on port " + port);
});

app.get("/alunos", (req, res) => {
    try{
    res.json(alunos);
    } catch (err) {
        return res.status(500).send({message: "Lista de alunos invalida."});
    }
});

app.post("/alunos/novo", (req, res) => {
    try {
    const { nome, matricula, media } = req.body;
    const novoAluno = { nome: nome, matricula: matricula, media: media };
    alunos.push(novoAluno);
    res.status(201).json({ message: "Usuário adicionado" });
    }
    catch (err) {
        return res.status(400).send({message: "Usuário invalido"});
    }
});


app.post("/alunos/deletar:index", async (req, res) => {
    try {
        const matricula = req.body.matricula;
        const aluno = await alunos.findByIdAndRemove(matricula);
        res.status(201).json({ message: "Aluno deletado" });
    }
    catch (err) {
        return res.status(404).send({message: "Usuário invalido"});
    }
});

app.patch("/alunos/atualizar/:index", async (req, res) => {
    try {
        const nome = req.params.nome;
        const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(user);
      } catch (error) {
        res.status(500).send(error.message);
      }
});