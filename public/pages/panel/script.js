if (!localStorage.getItem("bancoUsuarios")) {
  LoadData();
}
atualizarTabela();
const formulario = document.getElementById("userForm");
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  salvarUsuario();
});

function obterUsuarios() {
  const dados = localStorage.getItem("bancoUsuarios");
  if (dados) {
    return JSON.parse(dados);
  }
  return [];
}

function salvarUsuarios(lista) {
  localStorage.setItem("bancoUsuarios", JSON.stringify(lista));
}
const corpoTabela = document.getElementById("userTableBody");

function atualizarTabela() {
  const corpoTabela = document.getElementById("userTableBody");
  corpoTabela.innerHTML = "";
  const usuarios = obterUsuarios();

  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i];

    const linha = document.createElement("tr");

    const colunaId = document.createElement("td");
    colunaId.innerText = usuario.id;

    const colunaNome = document.createElement("td");
    colunaNome.innerText = usuario.user;

    const colunaSenha = document.createElement("td");
    colunaSenha.innerText = usuario.password;

    const colunaAdmin = document.createElement("td");
    colunaAdmin.innerText = usuario.isAdmin ? "Sim" : "Não";

    const colunaAcoes = document.createElement("td");

    const botaoEditar = document.createElement("button");
    botaoEditar.className = "btn btn-warning btn-sm me-2";
    botaoEditar.innerText = "Editar";
    botaoEditar.onclick = function () {
      editarUsuario(usuario.id);
    };

    const botaoExcluir = document.createElement("button");
    botaoExcluir.className = "btn btn-danger btn-sm";
    botaoExcluir.innerText = "Excluir";
    botaoExcluir.onclick = function () {
      excluirUsuario(usuario.id);
    };

    colunaAcoes.appendChild(botaoEditar);
    colunaAcoes.appendChild(botaoExcluir);

    linha.appendChild(colunaId);
    linha.appendChild(colunaNome);
    linha.appendChild(colunaSenha);
    linha.appendChild(colunaAdmin);
    linha.appendChild(colunaAcoes);

    corpoTabela.appendChild(linha);
  }
}

function salvarUsuario() {
  const idCampo = document.getElementById("userId").value;
  const nomeCampo = document.getElementById("username").value.trim();
  const senhaCampo = document.getElementById("password").value.trim();
  const adminCampo = document.getElementById("isAdmin").checked;

  if (nomeCampo === "" || senhaCampo === "") {
    alert("Preencha todos os campos.");
    return;
  }

  const usuarios = obterUsuarios();

  if (idCampo === "") {
    let novoId = 1;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id >= novoId) {
        novoId = usuarios[i].id + 1;
      }
    }

    const novoUsuario = {
      id: novoId,
      user: nomeCampo,
      password: senhaCampo,
      isAdmin: adminCampo,
    };

    usuarios.push(novoUsuario);
  } else {
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id == idCampo) {
        usuarios[i].user = nomeCampo;
        usuarios[i].password = senhaCampo;
        usuarios[i].isAdmin = adminCampo;
        break;
      }
    }
  }

  salvarUsuarios(usuarios);
  atualizarTabela();
  limparform();
}

function editarUsuario(id) {
  const usuarios = obterUsuarios();
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id == id) {
      document.getElementById("userId").value = usuarios[i].id;
      document.getElementById("username").value = usuarios[i].user;
      document.getElementById("password").value = usuarios[i].password;
      document.getElementById("isAdmin").checked = usuarios[i].isAdmin;
      break;
    }
  }
}

function excluirUsuario(id) {
  if (confirm("Deseja realmente excluir este usuário?")) {
    const usuarios = obterUsuarios();
    const novaLista = [];
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id != id) {
        novaLista.push(usuarios[i]);
      }
    }
    salvarUsuarios(novaLista);
    atualizarTabela();
  }
}

function limparform() {
  document.getElementById("userId").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("isAdmin").checked = false;
}
