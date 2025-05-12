export function Login(){
    let User = document.getElementById('userInput').value
    let Password = document.getElementById('passwordInput').value
    let Data = LoadData()
    const msgBox = document.getElementById('messageBox');

    let autenticado = false;
  
    for (let i = 0; i < Data.length; i++) {
      if (User === Data[i].user && Password === Data[i].password) {
        autenticado = true;
        break;
      }
    }
  
    if (autenticado) {
      showMessage("✅ Login realizado com sucesso!", "green");
    } else {
      showMessage("❌ Usuário ou senha incorretos.", "red");
    }
  
    return false;
  }
  
  function showMessage(texto, cor) {
    const msgBox = document.getElementById('messageBox');
    msgBox.innerText = texto;
    msgBox.style.backgroundColor = cor === "green" ? "#d4edda" : "#f8d7da";
    msgBox.style.color = cor === "green" ? "#155724" : "#721c24";
    msgBox.style.border = cor === "green" ? "1px solid #c3e6cb" : "1px solid #f5c6cb";
    msgBox.style.display = "block";
  }