// ✅ registerInstituicao.js

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

// Função específica para instituições
function writeUserDataInstituicao(userId, razaoSocial, cnpj, representante, email, telefone, endereco) {
    const userRef = ref(database, `usuarios/pessoaJuridica/instituicoes/${userId}`);
    return set(userRef, {
        razaoSocial: razaoSocial,
        cnpj: cnpj,
        representanteLegal: representante,
        email: email,
        telefone: telefone,
        endereco: endereco,
        tipoPessoa: 'pessoaJuridica',
        tipoUsuario: 'instituicao',
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
            return writeUserDataInstituicao(user.uid, nomeFantasia, email, telefone, senha, nomeUsuario, cnpj, cep);
        })
        .then(() => {
            alert('Instituição cadastrada com sucesso!');
            window.location.href = 'ci_endereco.html';
        })
        .catch((error) => {
            alert('Erro ao cadastrar instituição: ' + error.message);
            console.error(error);
        });
});
