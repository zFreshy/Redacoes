import { GoogleGenerativeAI } from "@google/generative-ai";

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

  // Fetch your API_KEY
  const API_KEY = "AIzaSyCPqHcG8bgiBqS8n0AKiDVaF3MUatetb18";

  // Access your API key (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY);

const criarProvaForm = document.getElementById('criarProvaForm');
const questoesPorAreaContainer = document.getElementById('questoesPorAreaContainer');

// Função para adicionar inputs de questões por área
function adicionarInputsQuestoesPorArea(areas) {
  questoesPorAreaContainer.innerHTML = ''; // Limpar inputs existentes
  areas.forEach(area => {
    const label = document.createElement('label');
    label.htmlFor = area;
    label.textContent = `${area}:`;
    const input = document.createElement('input');
    input.type = 'number';
    input.id = area;
    input.name = 'questoesPorArea';
    input.min = '1';
    input.required = true;
    questoesPorAreaContainer.appendChild(label);
    questoesPorAreaContainer.appendChild(input);
    questoesPorAreaContainer.appendChild(document.createElement('br'));
  });
}

// Event Listener para checkboxes de áreas
const checkboxesAreas = document.querySelectorAll('input[name="areasConhecimento"]');
checkboxesAreas.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const areasSelecionadas = Array.from(checkboxesAreas)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    adicionarInputsQuestoesPorArea(areasSelecionadas);
  });
});

// Função para gerar a prova com a API Gemini
async function gerarProva(dadosProva) {
  const generationConfig = {
    stopSequences: [""],
    maxOutputTokens: 100000,
    temperature: 0.5,
    topP: 0.1,
    topK: 16,
  };


  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });

  const prompt = `Me dê uma prova de nível ${dadosProva.nivel} com ${dadosProva.valorHumanas} questões de Ciências Humanas ${dadosProva.valorLinguagens} questões de Linguagens ${dadosProva.valorMatematica} questões de Matemática e ${dadosProva.valorNatureza} questões de Ciências da Natureza.`

  // try {
  // // 1. Construir o prompt para a API Gemini
  // let prompt = `Gerar uma prova de nível ${dadosProva.nivel} com ${dadosProva.qtdQuestoes} questões no estilo ENEM, `;
  // prompt += `abordando as seguintes áreas do conhecimento, com a quantidade de questões especificada para cada área:\n`;
  // for (const area in dadosProva.questoesPorArea) {
  //   prompt += `${area}: ${dadosProva.questoesPorArea[area]} questões\n`;
  // }
  // prompt += `A prova deve conter:\n`;
  // prompt += `* Enunciado para cada questão.\n`;
  // prompt += `* 5 alternativas (A, B, C, D, E) para cada questão.\n`;
  // prompt += `* Indicação da alternativa correta para cada questão.\n`;

  const chat = model.startChat({
    history: [
      // {
      //   role: "user",
      //   parts: [{ text: "Oque é a WorkIn?" }],
      // },
      // {
      //   role: "model",
      //   parts: [{ text: "WorkIn é um projeto que visa facilitar a busca de vagas afirmativas no mercado de trabalho. Uma plataforma onde as empresas podem colocar vagas afirmativas para o mundo, facilitando pessoas de grupos minoritários acharem as vagas perfeitas para seus perfis." }],
      // },
      {
        role: "user",
        parts: [{ text: "." }],
      },
      {
        role: "model",
        parts: [{ text: "Sou uma IA feita para criar provas de ENEM em tempo real." }],
      },
      {
        role: "user",
        parts: [{ text: "Basicamente você irá criar provas de ENEM usando HTML (lembrando que você não irá usar imagens para as questões somente por texto ou representações e são questões com letras A, B, C, D, E especificamente), vou te passar o modelo de como você irá criar a prova e depois eu irei lhe passar as informações específicas da prova que você irá gerar" }],
      },
      {
        role: "model",
        parts: [{ text: "Ok, me explique qual o modelo que você quer que eu reproduza." }],
      },
      {
        role: "user",
        parts: [{ text: "Vai funcionar assim, vou lhe dizer o título, a descrição, as áreas do conhecimento que podem ser linguagens, matemática, ciências humanas e ciências da natureza, a quantidade de questões por área do conhecimento o nível da prova que varia entre básico mediano e difícil e você irá criar um modelo de HTML assim: você irá criar uma div com o id questao(numero da questao) dentro dela terá um h2 com o id tituloQuestao(numero da questao) e uma classe (tituloQuestao) escrito Questao(numero da questao): e também tera um p com id enunciadoQuestao(numero da questao) escrito o enunciado da questao nele também tera outra div (lembrando que tudo isso esta dentro daquela div, ou seja cada questão é uma div) que terá o id respostasQuestao(numero da questao) e classe respostasQuestao e dentro dela irá ter uma repetição de label com um for resposta(letra da alternativa)(numero da questao) e um class form-control e dentro da label tem um input type radio id resposta(letra da alternativa) name questao(numero da questao) value(letra da alternativa) e se for a alternativa correta ele terá uma classe correct senão nao terá nenhuma classe e ainda dentro do input tem um p que esta escrito (letra da alternativa)) (resposta correspondente) e acaba a label apos tem um br (quebra de linha) e vem a proxima label da proxima letra da alternativa, no próximo prompt vou te dar um exemplo" }],
      },
      {
        role: "model",
        parts: [{ text: "Ok, me acho que entendi, vou seguir esse padrão 100%, agora me mande o exemplo." }],
      },
      {
        role: "user",
        parts: [{ text: "<div id='questao1'><h2 id='tituloQuestao1' class='tituloQuestao'>Questão 1:</h2><p id='enunciadoQuestao1'>Escolha a alternativa correta:</p><div id='respostasQuestao1' class='respostasQuestao'><label for='respostaA1' class='form-control'><input type='radio' id='respostaA' class='correct' name='questao1' value='a'><p>A) Opção 1</p></label><br><label for='respostaB1' class='form-control'><input type='radio' id='respostaB' name='questao1' value='b'><p>B) Opção 2</p</label><br><label for='respostaC1' class='form-control'><input type='radio' id='respostaC' name='questao1' value='c'><p>C) Opção 3</p></label><br><label for='respostaD1' class='form-control'><input type='radio' id='respostaD' name='questao1' value='d'><p>D) Opção 4</p></label><br><label for='respostaE1' class='form-control'><input type='radio' id='respostaD' name='questao1' value='e'><p>E) Opção 5</p></label></div></div><div id='questao2'><h2 id='tituloQuestao2' class='tituloQuestao'>Questão 2:</h2><p id='enunciadoQuestao2'>Escolha a alternativa correta:</p><div id='respostasQuestao2' class='respostasQuestao'><label for='respostaA2' class='form-control'><input type='radio' id='respostaA' name='questao2' value='a'><p>A) Opção 1</p></label><br><label for='respostaB2' class='form-control'><input type='radio' id='respostaB' name='questao2' value='b'><p>B) Opção 2</p></label><br><label for='respostaC2' class='form-control'><input type='radio' class='correct' id='respostaC' name='questao2' value='c'><p>C) Opção 3</p></label><br><label for='respostaD2' class='form-control'><input type='radio' id='respostaD' name='questao2' value='d'><p>D) Opção 4</p></label><br><label for='respostaE2' class='form-control'><input type='radio' id='respostaD' name='questao2' value='e'><p>E) Opção 5</p></label></div></div> lembrando que essa parte das divs das questões você vai colocar em uma div com o id provaMesmo" }],
      },
      {
        role: "model",
        parts: [{ text: "Entendi, vou seguir esse padrão 100%, e colocar as divs das questoes numa div com o id provaMesmo." }],
      },
      {
        role: "user",
        parts: [{ text: "Ok, no próximo prompt irei te dar as informações para você gerar a prova como tinha mencionado" }],
      },
      {
        role: "model",
        parts: [{ text: "Entendi, mande as informações." }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100000,
    },
  });

  const history = await chat.getHistory();
   const msgContent = { role: "user", parts: [{ text: prompt }] };
   const contents = [...history, msgContent];
   const { totalTokens } = await model.countTokens({ contents });

   const result = await chat.sendMessage(prompt);
   const response = await result.response;
   const text = response.text();

   const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
    .replace(/\*/g, '<br>'); 

       // Criar a div para o texto do chatbot
   const chatbotDiv = document.createElement('div');
   //  chatbotDiv.style.backgroundColor = "#92cf6e"
    chatbotDiv.id = "botResponse"
   //  chatbotDiv.innerHTML = `<p style="color: #fff;">${text}</p>`;
   chatbotDiv.innerHTML = `<p style="color: #fff;">${formattedText}</p>`;

   console.log(formattedText)

   let resultSpace = document.getElementById("resultSpace")
 
    // Adicionar a div ao chat-history
    resultSpace.appendChild(chatbotDiv);


  // try {
  //   // 1. Construir o prompt para a API Gemini
  //   let prompt = `Gerar uma prova de nível ${dadosProva.nivel} com ${dadosProva.qtdQuestoes} questões no estilo ENEM, `;
  //   prompt += `abordando as seguintes áreas do conhecimento, com a quantidade de questões especificada para cada área:\n`;
  //   for (const area in dadosProva.questoesPorArea) {
  //     prompt += `${area}: ${dadosProva.questoesPorArea[area]} questões\n`;
  //   }
  //   prompt += `A prova deve conter:\n`;
  //   prompt += `* Enunciado para cada questão.\n`;
  //   prompt += `* 5 alternativas (A, B, C, D, E) para cada questão.\n`;
  //   prompt += `* Indicação da alternativa correta para cada questão.\n`;

  //   console.log("Prompt para a API Gemini:", prompt); // Debug

  //   // 2. Configuração da API Gemini
  //   const generationConfig = {
  //     stopSequences: [""],
  //     maxOutputTokens: 5000, // Ajuste conforme necessário
  //     temperature: 0.7,       // Ajuste conforme necessário
  //   };
  //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", generationConfig });

  //   // 3. Chamar a API Gemini
  //   const result = await model.generateContent(prompt);
  //   const provaGerada = result.text;
    
  //   console.log("Prova gerada pela API Gemini:", provaGerada); // Debug

  //   // 4. Processar a resposta da API (extrair questões e formatar)
  //   const questoes = processarProvaGerada(provaGerada);

  //   // 5. Retornar as questões da prova
  //   return questoes;
  // } catch (e) {
  //   console.error("Erro ao gerar prova com a API Gemini:", e);
  //   return []; // Retornar array vazio em caso de erro
  // }
}

// Função para processar a prova gerada pela API (você precisa implementar)
function processarProvaGerada(provaGerada) {
  // 1. Dividir a string 'provaGerada' em questões individuais.
  // 2. Para cada questão, extrair: enunciado, alternativas e resposta correta.
  // 3. Retornar um array de objetos, onde cada objeto representa uma questão:
  //    Exemplo:
  //    [{
  //      enunciado: "Enunciado da questão 1...",
  //      alternativas: ["Alternativa A", "Alternativa B", ...],
  //      respostaCorreta: "B"
  //    }, 
  //    {
  //      // Questão 2...
  //    }] 
}

// Função para salvar a prova no Firebase
async function salvarProva(dadosProva, questoes) {
  try {
    // Obter tempoLimite em milissegundos (ou null para infinito)
    const tempoLimiteMs = dadosProva.tempoInfinito 
      ? null 
      : dadosProva.tempoLimiteHoras * 60 * 60 * 1000; 

    await db.collection("provas").add({
      titulo: dadosProva.titulo,
      descricao: dadosProva.descricao,
      areasConhecimento: dadosProva.areasConhecimento,
      questoesPorArea: dadosProva.questoesPorArea,
      nivel: dadosProva.nivel,
      tempoLimite: tempoLimiteMs,
      dataDisponivel: new Date(dadosProva.dataDisponivel), // Converter para objeto Date
      professorId: "PROFESSOR_ID", // Substitua pelo ID do professor (se usar autenticação)
      questoes: questoes,
    });
    console.log("Prova salva no Firebase com sucesso!");
  } catch (e) {
    console.error("Erro ao salvar prova no Firebase: ", e);
  }
}

// let qtdNatureza = document.getElementById("Ciencias da Natureza").value
// let qtdLinguagens = document.getElementById("Linguagens").value
// let qtdMatematica = document.getElementById("Matematica").value
// let qtdHumanas = document.getElementById("Ciencias Humanas").value

// Event listener para o formulário
criarProvaForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // 1. Obter o valor do input datetime-local
  const dataDisponivelInput = document.getElementById('dataDisponivel').value;

  // 2. Criar um objeto Date a partir do valor do input
  const dataDisponivel = new Date(dataDisponivelInput);

  // 3. Extrair os valores individuais
  const dia = dataDisponivel.getDate(); 
  const mes = dataDisponivel.getMonth() + 1; // Janeiro é 0, então adicionamos 1
  const ano = dataDisponivel.getFullYear();
  const hora = dataDisponivel.getHours();
  const minutos = dataDisponivel.getMinutes();

  // 4. Agora você tem os valores individuais
  console.log("Dia:", dia);
  console.log("Mês:", mes);
  console.log("Ano:", ano);
  console.log("Hora:", hora);
  console.log("Minutos:", minutos);

  // Obter dados do formulário
  const dadosProva = {
    titulo: document.getElementById('titulo').value,
    descricao: document.getElementById('descricao').value,
    areasConhecimento: Array.from(document.querySelectorAll('input[name="areasConhecimento"]:checked'))
      .map(cb => cb.value),
    questoesPorArea: {}, // Será preenchido abaixo
    nivel: document.getElementById('nivel').value,
    tempoLimiteHoras: document.getElementById('tempoLimiteHoras').value,
    tempoInfinito: document.getElementById('tempoInfinito').checked,
    dataDisponivel: document.getElementById('dataDisponivel').value,
    valorLinguagens: document.getElementById("Linguagens").value,
    valorNatureza: document.getElementById("Ciencias da Natureza").value,
    valorMatematica: document.getElementById("Matematica").value,
    valorHumanas: document.getElementById("Ciencias Humanas").value
    // if(qtdLinguagens) {
    //   valorLinguagens: qtdLinguagens.value
    // },
    // if(qtdNatureza) {
    //   valorNatureza: qtdNatureza.value
    // },
    // if(qtdMatematica) {
    //   valorMatematica: qtdMatematica.value
    // },
    // if(qtdHumanas) {
    //   valorHumanas: qtdHumanas.value
    // },
  };

  // Obter a quantidade de questões por área
  dadosProva.areasConhecimento.forEach(area => {
    dadosProva.questoesPorArea[area] = parseInt(document.getElementById(area).value);
  });

  // Gerar a prova com a API Gemini
  const questoesGeradas = await gerarProva(dadosProva);

  // Salvar a prova no Firebase


  // salvarProva(dadosProva, questoesGeradas);
});