import './firebase-config.js'; // Importando a configuração do Firebase
import firebaseService from './firebaseService.js';

document.getElementById('cadastroInstituicaoForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Form submission detected.');

    const nome = document.getElementById('nomeInstituicao').value;
    const endereco = document.getElementById('enderecoInstituicao').value;
    const email = document.getElementById('emailInstituicao').value;
    const telefone = document.getElementById('telefoneInstituicao').value;
    const senha = document.getElementById('senhaInstituicao').value;
    const mensagemErro = document.getElementById('mensagemErro');

    console.log('Form data:', { nome, endereco, email, telefone, senha });

    try {
        const user = await firebaseService.signup(email, senha);
        console.log('User signed up:', user);

        await firebaseService.addUserData(user.uid, {
            nome,
            endereco,
            email,
            telefone,
            tipo: 'instituicao'
        });

        alert('Instituição cadastrada com sucesso!');
        window.location.href = '/dashboard-instituicao.html';
    } catch (error) {
        console.error('Erro ao cadastrar instituição:', error);
        mensagemErro.textContent = 'Erro ao cadastrar instituição. Tente novamente.';
        mensagemErro.style.display = 'block';
    }
});
