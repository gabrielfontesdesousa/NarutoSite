function Login() {
  let User = document.getElementById("userInput").value.trim();
  let Password = document.getElementById("passwordInput").value.trim();
  let Data = LoadData();

  let auth = false;
  let usuarioLogado = null;

  for (let i = 0; i < Data.length; i++) {
    if (User === Data[i].user && Password === Data[i].password) {
      auth = true;
      usuarioLogado = Data[i];
      sessionStorage.setItem("loggedUser", JSON.stringify(Data[i]));
      break;
    }
  }

  if (auth) {
    showMessage("✅ Login realizado com sucesso! Bem vindo " + User, "green");
    setTimeout(() => {
      if (usuarioLogado.isAdmin) {
        window.location.href = "../panel/index.html";
      } else {
        window.location.href = "../../../index.html";
      }
    }, 2000);
  } else {
    showMessage("❌ Usuário ou senha incorretos.", "red");
  }
  return false;
}

function showMessage(texto, cor) {
  const msgBox = document.getElementById("messageBox");
  msgBox.innerText = texto;
  msgBox.style.backgroundColor = cor === "green" ? "#d4edda" : "#f8d7da";
  msgBox.style.color = cor === "green" ? "#155724" : "#721c24";
  msgBox.style.border =
    cor === "green" ? "1px solid #c3e6cb" : "1px solid #f5c6cb";
  msgBox.style.display = "block";
}
