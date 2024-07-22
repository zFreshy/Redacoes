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
  
  const urlParams = new URLSearchParams(window.location.search);
  const provaId = urlParams.get('id');
  
  const provaTitulo = document.getElementById('provaTitulo');
  const provaDescricao = document.getElementById('provaDescricao');
  const questoesContainer = document.getElementById('questoesContainer');
  const enviarProvaBtn = document.getElementById('enviarProvaBtn');
  const temporizadorDiv = document.getElementById('temporizador');
  
  let tempoRestante = null; // Variável para controlar o tempo restante
  let intervalId = null;   // ID do intervalo para o temporizador
  
  if (provaId) {
    carregarProva(provaId);
  }
  
  async function carregarProva(provaId) {
    try {
      const docRef = db.collection("provas").doc(provaId);
      const docSnapshot = await docRef.get();
  
      if (docSnapshot.exists) {
        const prova = docSnapshot.data();
        provaTitulo.textContent = prova.titulo;
        provaDescricao.textContent = prova.descricao;

              // Inserir o conteúdo da prova no 'questoesContainer'
      questoesContainer.innerHTML += prova.conteudoProva; 
  
        // Exibir as questões da prova
        exibirQuestoes(prova.questoes);
  
        // Configurar o temporizador, se aplicável
        if (prova.tempoLimite) {
          configurarTemporizador(prova.tempoLimite);
        } else {
          enviarProvaBtn.style.display = "block"; // Exibir botão se não houver tempo limite
        }
      } else {
        console.error("Prova não encontrada!");
        // Exibir mensagem de erro ao usuário
      }
    } catch (e) {
      console.error("Erro ao carregar a prova: ", e);
      // Exibir mensagem de erro ao usuário
    }
  }
  
  function exibirQuestoes(questoes) {
    questoes.forEach((questao, index) => {
      const questaoDiv = document.createElement('div');
      questaoDiv.innerHTML = `
        <h2>Questão ${index + 1}</h2>
        <p>${questao.enunciado}</p>
        <ul>
          ${questao.alternativas.map((alternativa, altIndex) => `
            <li>
              <input type="radio" name="respostaQuestao${index}" value="${String.fromCharCode(65 + altIndex)}">
              <label>${alternativa}</label>
            </li>
          `).join('')}
        </ul>
      `;
      questoesContainer.appendChild(questaoDiv);
    });
  }
  
  function configurarTemporizador(tempoLimiteMs) {
    tempoRestante = tempoLimiteMs;
  
    // Exibir o temporizador
    temporizadorDiv.style.display = "block";
    atualizarTemporizador();
  
    // Iniciar o intervalo para atualizar o temporizador
    intervalId = setInterval(() => {
      tempoRestante -= 1000; // Diminuir 1 segundo
      atualizarTemporizador();
  
      if (tempoRestante <= 0) {
        clearInterval(intervalId);
        finalizarProva();
      }
    }, 1000);
  }
  
  function atualizarTemporizador() {
    const horas = Math.floor(tempoRestante / (1000 * 60 * 60) % 24);
    const minutos = Math.floor(tempoRestante / (1000 * 60) % 60);
    const segundos = Math.floor(tempoRestante / 1000 % 60);
  
    temporizadorDiv.textContent = `Tempo restante: ${horas}:${minutos}:${segundos}`;
  }
  
 // Função para finalizar a prova (enviar respostas)
function finalizarProva() {
  let pontuacao = 0; // Inicializa a pontuação

  // Obter as respostas selecionadas pelo usuário
  const questoes = document.querySelectorAll('input[type="radio"]');
  const respostasUsuario = Array.from(questoes)
    .filter(questao => questao.checked)
    .map(questao => questao.name + ':' + questao.value); // Ajustado para incluir o nome da questão

  // Obter as respostas corretas (ajustado para incluir o nome da questão)
  const respostasCorretas = Array.from(document.querySelectorAll('.correct'))
    .map(correta => correta.name + ':' + correta.value); 

  // Comparar as respostas e calcular a pontuação
  respostasUsuario.forEach(respostaUsuario => {
    if (respostasCorretas.includes(respostaUsuario)) {
      pontuacao++;
    }
  });

  // Calcular a nota como uma fração de acertos
  let quantV = respostasCorretas.length;
  const nota = `${pontuacao}/${quantV}`;

  // Exibir a nota ao usuário
  console.log("Nota final:", nota); // Ou exibir em um elemento HTML na sua interface

  // Desabilitar as caixas de seleção após enviar
  questoes.forEach(questao => {
    questao.disabled = true
  });
}
  
  enviarProvaBtn.addEventListener('click', () => {
    finalizarProva();
  });