let salario = 0;
let despesas = [];


window.onload = function () {
    const dataSalvo = localStorage.getItem("financas");

    if (dataSalvo) {
        const json = JSON.parse(dataSalvo);
        salario = json.salario;
        despesas = json.despesas;

        document.getElementById("salario").value = salario;
    }

    atualizarLista();
    atualizarResumo();
};


function salvar() {
    localStorage.setItem("financas", JSON.stringify({
        salario,
        despesas
    }));
}


document.getElementById("btnAdicionar").addEventListener("click", () => {

    const data = document.getElementById("data").value;
    const nome = document.getElementById("nome").value.trim();
    const valor = parseFloat(document.getElementById("valor").value);

    salario = parseFloat(document.getElementById("salario").value);
    
    
    if (!salario || salario <= 0) {
        alert("Digite um salário válido.");
        return;
    }

    if (!data || !nome || isNaN(valor) || valor <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    despesas.push({ data, nome, valor });

    salvar();
    atualizarLista();
    atualizarResumo();

    document.getElementById("data").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("valor").value = "";
});


function excluirDespesa(index) {
    despesas.splice(index, 1);
    salvar();
    atualizarLista();
    atualizarResumo();
}


function atualizarLista() {
    const tabela = document.getElementById("listaDespesas");
    tabela.innerHTML = "";

    despesas.forEach((d, i) => {
        const linha = `
            <tr>
                <td>${d.data}</td>
                <td>${d.nome}</td>
                <td>R$ ${d.valor.toFixed(2)}</td>
                <td><button onclick="excluirDespesa(${i})">Excluir</button></td>
            </tr>
        `;
        tabela.innerHTML += linha;
    });
}


function atualizarResumo() {
    const totalDespesas = despesas.reduce((sum, d) => sum + d.valor, 0);
    const saldo = salario - totalDespesas;

    document.getElementById("resSalario").innerText = salario.toFixed(2);
    document.getElementById("resDespesas").innerText = totalDespesas.toFixed(2);
    document.getElementById("resSaldo").innerText = saldo.toFixed(2);
}
function ApagarTudo() {
    despesas = [];
     salvar();
    atualizarLista();
    atualizarResumo();
    salario = 0;
    salvar();
    atualizarLista();
    atualizarResumo();
}

    


