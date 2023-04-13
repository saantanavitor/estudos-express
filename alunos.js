const express = require ("express");
const morgan = require ("morgan");
const port = 8080;

const app = express();
app.use(express.json());

app.listen(port, () => {
    console.log("listening on port " + port);
});

const alunos = [
    {   
        id: "0",
        nome: 'João',
        matricula: '7289437894',
        media: "9,9",
    },
    {   
        id: "1",
        nome: 'Barbara',
        matricula: '9987656512',
        media: "10",
    },
    {   
        id: "2",
        nome: 'Felipe',
        matricula: '2876765765',
        media: "5",
    },
];

const filtroNome = (paramNome) => 
alunos.filter(aluno => aluno.nome === paramNome)

const filtroMedia = (paramMedia) => 
alunos.filter(aluno => aluno.media >= paramMedia)


app.get("/alunos", morgan('combined'), (req, res) => {           // Listagem de alunos
    try{   
        let filteredAlunos = alunos;
        if(req.query.nome) {
        filteredAlunos = filtroNome(req.query.nome);
        }
        if(req.query.media) {
            filteredAlunos = filtroMedia(req.query.media);
            }
        return res.status(201).send({ alunos: filteredAlunos });
    } catch (err) {
        return res.status(500).send({message: "Invalido"});
    }
});

app.post("/alunos/", morgan('combined'), (req, res) => {         // Criação de novo cadastro de aluno
    try {
    const { id, nome, matricula, media } = req.body;
    const novoAluno = { id: id, nome: nome, matricula: matricula, media: media };
    alunos.push(novoAluno);
    res.status(201).json({ message: "Usuário adicionado" });
    }
    catch (err) {
        return res.status(400).send({message: "Usuário invalido"});
    }
});

app.put("/alunos/", morgan('combined'), (req, res) => {         // Atualização da média
    try {
        const {nome, media} = req.body;
        alunos.map ( aluno => 
            { if (aluno.nome === nome){
                aluno.media = media;
            }});
        
        return res.status(201).json({ message: "Usuário atualizado", alunos });
        }
        catch (err) {
            return res.status(404).send({message: "O usuário não existe.", err});
        }
    });

app.delete("/alunos/", morgan('combined'), (req, res) => {        // Deletar aluno da base de dados
   try {
    const { id } = req.body;
    const deletar = { id: id };
    alunos.splice(id, 1);
    res.status(201).json({ message: "Usuário deletado", alunos });
        }
        catch (err)  {
            return res.status(404).send({message: "O aluno não existe.",});
        }
    });



