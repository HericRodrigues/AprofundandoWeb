const funcao = document.getElementById("input-item");
const botaoSalvar = document.getElementById("botao-salvar");
const listaDeTarefas = document.getElementById("lista-de-tarefas");
const listaFeita = document.getElementById("lista-de-tarefa-feitas");
let contador = 1;

botaoSalvar.addEventListener("click", adicionarFuncao);

function adicionarFuncao(evento) {
    evento.preventDefault();

    if (!funcao.value.trim()) {
        alert("Por favor, digite uma tarefa.");
        return;
    }

    const funcaoDaLista = criarItemDeTarefa(funcao.value);
    listaDeTarefas.appendChild(funcaoDaLista);
    funcao.value = '';
}

function criarItemDeTarefa(nomeTarefa) {
    const funcaoDaLista = document.createElement("li");
    const containerFuncaoLista = document.createElement("div");
    containerFuncaoLista.classList.add("lista-item");

    const containerCheckbox = document.createElement("div");
    containerCheckbox.classList.add("checkbox-container");

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.classList.add("input-checkbox");
    checkboxInput.id = "checkbox-" + contador++;

    const checkboxLabel = document.createElement("label");
    checkboxLabel.setAttribute("for", checkboxInput.id);
    checkboxLabel.innerHTML = ""; // Para adicionar uma aparência visual

    const nomeDaFuncao = document.createElement("p");
    nomeDaFuncao.innerText = nomeTarefa;

    const containerBotoes = document.createElement("div");

    const botaoRemover = document.createElement("button");
    botaoRemover.classList.add("botao-acao");
    botaoRemover.setAttribute("aria-label", "Remover tarefa");
    botaoRemover.addEventListener("click", () => {
        funcaoDaLista.remove();
    });

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("botao-acao");
    botaoEditar.setAttribute("aria-label", "Editar tarefa");
    botaoEditar.addEventListener("click", () => {
        const novaFuncao = prompt("Edite sua tarefa:", nomeDaFuncao.innerText);
        if (novaFuncao) {
            nomeDaFuncao.innerText = novaFuncao;
        }
    });

    const imagemRemover = document.createElement("img");
    imagemRemover.src = "img/delete.svg"; // Caminho da imagem de remover
    imagemRemover.alt = "Remover";

    const imagemEditar = document.createElement("img");
    imagemEditar.src = "img/edit.svg"; // Caminho da imagem de editar
    imagemEditar.alt = "Editar";

    botaoRemover.appendChild(imagemRemover);
    botaoEditar.appendChild(imagemEditar);

    containerBotoes.appendChild(botaoRemover);
    containerBotoes.appendChild(botaoEditar);

    // Montando a estrutura da lista
    containerCheckbox.appendChild(checkboxInput);
    containerCheckbox.appendChild(checkboxLabel);

    checkboxInput.addEventListener("change", () => {
        if (checkboxInput.checked) {
            listaFeita.appendChild(funcaoDaLista);
            nomeDaFuncao.style.textDecoration = "line-through"; // Riscar tarefa feita
        } else {
            listaDeTarefas.appendChild(funcaoDaLista);
            nomeDaFuncao.style.textDecoration = "none"; // Remover o risco ao desmarcar
        }
    });

    containerFuncaoLista.appendChild(containerCheckbox);
    containerFuncaoLista.appendChild(nomeDaFuncao);
    containerFuncaoLista.appendChild(containerBotoes);
    funcaoDaLista.appendChild(containerFuncaoLista);

    return funcaoDaLista;
}
