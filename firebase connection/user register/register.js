import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

// Seu web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfYcoijl5D_0EJk4pO1SjPFjeOnzzrsTM",
    authDomain: "reuse-1512f.firebaseapp.com",
    projectId: "reuse-1512f",
    storageBucket: "reuse-1512f.firebasestorage.app",
    messagingSenderId: "296992709188",
    appId: "1:296992709188:web:d1135e3a8beee9ac1f7a11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); 

//Manda os dados do usuário no Realtime Database. ID do usuário (UID) usado como chave principal.
function writeUserData(userId, nome, email, telefone, usuario, cpf, nascimento, cep) {
    
    // Cria a referência: /usuarios/ + [user.uid]
    const userRef = ref(database, 'usuarios/' + userId); 
    
    // O 'set' escreve o objeto de dados no caminho especificado e retorna uma Promise.
    return set(userRef, {
        nomeCompleto: nome,
        email: email, 
        telefone: telefone,
        nomeDeUsuario: usuario,
        cpf: cpf,
        dataNascimento: nascimento,
        cep: cep,
        dataCadastro: new Date().toISOString()
    });
}

// Submit
const submit = document.getElementById('submit');
submit.addEventListener('click', function(event) {
    event.preventDefault();

    // Coleta de dados do formulário
    const nomeInput = document.getElementById('nome').value;
    const emailInput = document.getElementById('email').value;
    const telefoneInput = document.getElementById('telefone').value;
    const senhaInput = document.getElementById('senha').value;
    const usuarioInput = document.getElementById('usuario').value;
    const cpfInput = document.getElementById('cpf').value;
    const nascimentoInput = document.getElementById('nascimento').value;
    const cepInput = document.getElementById('cep').value;

    createUserWithEmailAndPassword(auth, emailInput, senhaInput)
    .then((userCredential) => {
        const user = userCredential.user;
        return writeUserData(user.uid, nomeInput, emailInput, telefoneInput, usuarioInput, cpfInput, nascimentoInput, cepInput);
    })
    .then(() => {
        alert('Conta criada e dados salvos com sucesso! Bem-vindo(a) ao ReUse!');
        window.location.href = '../closet/closet.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let mensagemErroUsuario = 'Ocorreu um erro durante o cadastro.';

        if (errorCode === 'auth/email-already-in-use') {
            // E-mail já existe
            mensagemErroUsuario = 'Este e-mail já está cadastrado. Tente fazer o login ou use outro e-mail.';
        } else if (errorCode === 'auth/invalid-email') {
            // E-mail inválido
            mensagemErroUsuario = 'O formato do e-mail é inválido. Por favor, verifique.';
        } else if (errorCode === 'auth/weak-password') {
            // Senha fraca
            mensagemErroUsuario = 'A senha deve ter pelo menos 6 caracteres.';
        } else {
            // Outros erros, incluindo falha no writeUserData
            mensagemErroUsuario = `Erro: Não foi possível finalizar o cadastro. Detalhes: ${errorMessage}`;
        }
        
        // Envia o alerta com a mensagem específica
        alert(mensagemErroUsuario);
        console.error("Erro no Cadastro:", error);
    });
});
