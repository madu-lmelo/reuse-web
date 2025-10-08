// ✅ registerBrecho.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDfYcoijl5D_0EJk4pO1SjPFjeOnzzrsTM",
    authDomain: "reuse-1512f.firebaseapp.com",
    projectId: "reuse-1512f",
    storageBucket: "reuse-1512f.firebasestorage.app",
    messagingSenderId: "296992709188",
    appId: "1:296992709188:web:d1135e3a8beee9ac1f7a11"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Função específica para brechós
function writeUserDataBrecho(userId, nomeFantasia, cnpj, responsavel, email, telefone, endereco, tipoDeRoupas) {
    const userRef = ref(database, `usuarios/pessoaJuridica/brechos/${userId}`);
    return set(userRef, {
        nomeFantasia: nomeFantasia,
        cnpj: cnpj,
        responsavel: responsavel,
        email: email,
        telefone: telefone,
        endereco: endereco,
        tipoDeRoupas: tipoDeRoupas,
        tipoPessoa: 'pessoaJuridica',
        tipoUsuario: 'brecho',
        dataCadastro: new Date().toISOString()
    });
}

// Evento do formulário
const submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
    event.preventDefault();

    const nomeFantasia = document.getElementById('nomeFantasia').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    const cnpj = document.getElementById('cnpj').value;
    const cep = document.getElementById('cep').value;

    createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user;
            return writeUserDataBrecho(user.uid, nomeFantasia, email, telefone, senha, nomeUsuario, cnpj, cep);
        })
        .then(() => {
            alert('Brechó cadastrado com sucesso!');
            window.location.href = 'ci_endereco.html';
        })
        .catch((error) => {
            alert('Erro ao cadastrar brechó: ' + error.message);
            console.error(error);
        });
});