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
  
  const listaRedacoes = document.getElementById('listaRedacoes');
  
  async function carregarRedacoes() {
      listaRedacoes.innerHTML = ''; // Limpar a lista atual
  
      const querySnapshot = await db.collection("redacoes").get();
      querySnapshot.forEach((doc) => {
          const redacao = doc.data();
          const li = document.createElement('li');
          li.innerHTML = `<div class="card"><a href="../index.html?tema=${redacao.tema}&descricao=${redacao.descricao}" class="btn btn-primary">${redacao.tema}</a><p>${redacao.descricao}</p></card>`;
          listaRedacoes.appendChild(li);
      });
  }
  
  carregarRedacoes();