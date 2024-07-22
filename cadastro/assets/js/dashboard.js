import './firebase-config.js'; // Importando a configuração do Firebase

document.addEventListener('DOMContentLoaded', function() {
    const accountName = document.querySelector('.account-info-name span'); // Seleciona o span dentro de .account-info-name

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            carregarNomeInstituicao(user.uid);
        } 
    });

    async function carregarNomeInstituicao(userId) {
        try {
            const querySnapshot = await firebase.firestore().collection('instituicoes').where('userId', '==', userId).get(); // Consulta Firestore
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const instituicaoData = doc.data();
                    accountName.textContent = instituicaoData.nome; // Define o nome da instituição
                    console.log("Nome da Instituição:", instituicaoData.nome);
                });
            } else {
                accountName.textContent = "Nome não encontrado";
                console.log("Documento da instituição não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao carregar nome da instituição:", error);
            accountName.textContent = "Erro ao carregar nome";
        }
    }

    // ... (seu outro código do dashboard: filtro, visualização, etc.) ...
});
