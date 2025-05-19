function showTab(tabId, element) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    if (element) {
        element.classList.add('active');
    }
}

window.onload = function () {
    const defaultBtn = document.querySelector('.tab-btn');
    showTab('visa', defaultBtn);
};
const subtotalElement = document.getElementById('subtotal');
const totalFinalElement = document.getElementById('total-final');
const resumoItens = document.getElementById('resumo-itens');
const saldoContaElement = document.getElementById('saldo-conta');
const cart = JSON.parse(localStorage.getItem('cart'));
const user = JSON.parse(sessionStorage.getItem("loggedUser"));
let totalPrice = cart[user.email]
if (resumoItens) resumoItens.textContent = totalItems;

if (resumoItens) resumoItens.textContent = totalItems;
if (subtotalElement) subtotalElement.textContent = totalPrice.toFixed(2);
const precototal = JSON.parse(localStorage.getItem("PrecoTotal"));
if (totalFinalElement) totalFinalElement.textContent = pre.toFixed(2);