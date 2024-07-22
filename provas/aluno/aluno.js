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

const listaProvas = document.getElementById('listaProvas');

async function carregarProvas() {
listaProvas.innerHTML = ''; // Limpar a lista

try {
  // Consultar as provas disponíveis (ordenadas pela data disponível)
  const provasRef = db.collection("provas");
  const querySnapshot = await provasRef
    .where("dataDisponivel", ">=", new Date()) 
    .orderBy("dataDisponivel", "desc")
    .get();

  querySnapshot.forEach((doc) => {
    const prova = doc.data();
    const li = document.createElement('li');

    // Criar link para a página da prova (prova.html)
    const linkProva = document.createElement('a');
    linkProva.href = `../prova.html?id=${doc.id}`; 
    linkProva.textContent = prova.titulo;

    li.appendChild(linkProva);
    li.innerHTML += ` - ${prova.descricao}`;
    listaProvas.appendChild(li);
  });
} catch (error) {
  console.error("Erro ao carregar as provas: ", error);
}
}

carregarProvas();