// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAbzHqrxU1bfZlCe8LWtizy12-40zdUfDE",
    authDomain: "teste-97fc6.firebaseapp.com",
    projectId: "teste-97fc6",
    storageBucket: "teste-97fc6.appspot.com",
    messagingSenderId: "470428227917",
    appId: "1:470428227917:web:22a8c87a1a31b17a6a3f04",
    measurementId: "G-55DEWK8CCX"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Referência ao formulário e lista de redações
const criarRedacaoForm = document.getElementById('criarRedacaoForm');
const listaRedacoes = document.getElementById('listaRedacoes');

// Função para adicionar redação ao Firestore
async function adicionarRedacao(tema, descricao) {
    try {
        await db.collection("redacoes").add({
            tema: tema,
            descricao: descricao,
            // professorId: professorId  // REMOVA ESTA LINHA
        });
        console.log("Redação adicionada com sucesso!");
        // ... (restante do código) ...
    } catch (e) {
        console.error("Erro ao adicionar redação: ", e);
    }
    // try {
        // Obter o ID do professor autenticado (você precisará implementar a autenticação)
        // const user = firebase.auth().currentUser; // Exemplo usando autenticação do Firebase
        // if (user) {
        //     const professorId = user.uid; 

        //     await db.collection("redacoes").add({
        //         tema: tema,
        //         descricao: descricao,
        //         professorId: professorId
        //     });
        //     console.log("Redação adicionada com sucesso!");
        //     // Limpar o formulário (opcional)
        //     criarRedacaoForm.reset();
        //     // Atualizar a lista de redações
        //     carregarRedacoes();
        // } else {
        //     console.error("Usuário não autenticado!");
        //     // Redirecionar para login ou mostrar mensagem de erro
        // }
    // } catch (e) {
    //     console.error("Erro ao adicionar redação: ", e);
    // }
}

// Função para carregar as redações do professor
async function carregarRedacoes() {
    listaRedacoes.innerHTML = ''; // Limpar a lista atual

    const user = firebase.auth().currentUser; 
    if (user) {
        const professorId = user.uid; 

        const querySnapshot = await db.collection("redacoes").get()
        querySnapshot.forEach((doc) => {
            const redacao = doc.data();
            const li = document.createElement('li');
            li.innerHTML = `<strong>${redacao.tema}</strong> - ${redacao.descricao}`;
            listaRedacoes.appendChild(li);
        });
    } else {
        // ... (mesma lógica do adicionarRedacao para lidar com usuário não autenticado)
    }
}

// Event Listener para o formulário
criarRedacaoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const tema = document.getElementById('tema').value;
    const descricao = document.getElementById('descricao').value;
    adicionarRedacao(tema, descricao);
});

// Carregar redações quando a página carregar
carregarRedacoes();