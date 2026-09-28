class Cliente {
    constructor(nome, dataNascimento, cpf) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
    }
}

class Simulacao {
    constructor(valor, juros, parcelas) {
        this.valor = valor;
        this.juros = juros;
        this.parcelas = parcelas;
    }

    calcular() {
  
        let juros = this.valor * (this.juros / 100) * this.parcelas;

        let valorFinal = this.valor + juros;

        let valorParcela = valorFinal / this.parcelas;

        return {
            juros: juros,
            valorFinal: valorFinal,
            valorParcela: valorParcela
        };
    }
}

class ControleTentativas {
    constructor() {
        this.tentativas = 0;
        this.maximo = 3;
    }

    podeTentar() {
        return this.tentativas < this.maximo;
    }

    adicionarTentativa() {
        this.tentativas++;
    }

    restantes() {
        return this.maximo - this.tentativas;
    }
}

let controle = new ControleTentativas();

function calcular() {

    if (!controle.podeTentar()) {
        alert("Você atingiu o limite de 3 tentativas.");
        return;
    }

    let nome = document.getElementById("nome").value;
    let dataNascimento = document.getElementById("dataNascimento").value;
    let cpf = document.getElementById("cpf").value;
    let valor = Number(document.getElementById("valor").value);
    let juros = Number(document.getElementById("juros").value);
    let parcelas = Number(document.getElementById("parcelas").value);

    if (nome.length < 5) {
        alert("O nome deve possuir pelo menos 5 caracteres.");
        return;
    }

    if (cpf.length != 11 || isNaN(cpf)) {
        alert("O CPF deve possuir exatamente 11 números.");
        return;
    }

    if (valor <= 0 || juros < 0 || parcelas <= 0) {
        alert("Preencha os valores corretamente.");
        return;
    }
    
    // Criando o cliente
    let cliente = new Cliente(nome, dataNascimento, cpf);

    let simulacao = new Simulacao(valor, juros, parcelas);

    let resultado = simulacao.calcular();

    controle.adicionarTentativa();

    document.getElementById("resultado").innerHTML = `
        <hr>

        <h3>Resultado da Simulação</h3>

        <p><strong>Cliente:</strong> ${cliente.nome}</p>

        <p><strong>Valor solicitado:</strong>
        R$ ${valor.toFixed(2)}</p>

        <p><strong>Taxa de juros:</strong>
        ${juros.toFixed(2)}%</p>

        <p><strong>Quantidade de parcelas:</strong>
        ${parcelas}</p>

        <p><strong>Total de juros:</strong>
        R$ ${resultado.juros.toFixed(2)}</p>

        <p><strong>Valor final:</strong>
        R$ ${resultado.valorFinal.toFixed(2)}</p>

        <p><strong>Valor de cada parcela:</strong>
        R$ ${resultado.valorParcela.toFixed(2)}</p>

        <p><strong>Tentativas restantes:</strong>
        ${controle.restantes()}</p>

        <button onclick="novaSimulacao()">Nova Simulação</button>
    `;
}

function novaSimulacao() {

    document.getElementById("nome").value = "";
    document.getElementById("dataNascimento").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("juros").value = "";
    document.getElementById("parcelas").value = "";

    document.getElementById("resultado").innerHTML = "";
}
