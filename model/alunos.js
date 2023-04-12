const alunos = [
    
    {
        nome: 'João',
        matricula: '12345678',
        media: "9,9",},

    {
        nome: 'Barbara',
        matricula: '12345878',
        media: "10",
    },
    {    
        nome: 'Felipe',
        matricula: '12345578',
        media: "5",
    },
];

const filtroNome = alunos.filter(aluno => aluno.nome === "João");

const filtroMedia = alunos.filter(aluno => aluno.media >= 6);

module.exports = alunos;