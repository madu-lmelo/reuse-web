// ✅ registerComum.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDfYcoijl5D_0EJk4pO1SjPFjeOnzzrsTM",
    authDomain: "reuse-1512f.firebaseapp.com",
    projectId: "reuse-1512f",
    storageBucket: "reuse-1512f.firebasestorage.app",
    messagingSenderId: "296992709188",
    appId: "1:296992709188:web:d1135e3a8beee9ac1f7a11"
};

// Inicialização
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Função específica para usuário comum
function writeUserDataComum(userId, nome, email, telefone, usuario, cpf, nascimento, cep) {
    const userRef = ref(database, `usuarios/pessoaFisica/${userId}`);
    return set(userRef, {
        nomeCompleto: nome,
        email: email,
        telefone: telefone,
        nomeDeUsuario: usuario,
        cpf: cpf,
        dataNascimento: nascimento,
        cep: cep,
        tipoPessoa: 'pessoaFisica',
        tipoUsuario: 'comum',
        dataCadastro: new Date().toISOString()
    });
}

// Evento de envio do formulário
const submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;
    const usuario = document.getElementById('usuario').value;
    const cpf = document.getElementById('cpf').value;
    const nascimento = document.getElementById('nascimento').value;
    const cep = document.getElementById('cep').value;

    createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user;
            return writeUserDataComum(user.uid, nome, email, telefone, usuario, cpf, nascimento, cep);
        })
        .then(() => {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'ci_endereco.html';
        })
        .catch((error) => {
            alert('Erro ao cadastrar: ' + error.message);
            console.error(error);
        });
});
