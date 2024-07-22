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

// function getValue(id) {
//     return parseInt(document.getElementById(id).innerText);
// }

// // Obtendo valores dos spans
// const values = [
//     getValue('comp1'),
//     getValue('comp2'),
//     getValue('comp3'),
//     getValue('comp4'),
//     getValue('comp5')
// ];

// const ctx = document.getElementById('myChart').getContext('2d');
// const data = {
//     labels: ['Política, conflitos', 'Economia, social', 'Sociedade', 'Cultura, mídia', 'Esporte'],
//     datasets: [{
//         data: values,
//         backgroundColor: ['#7CFCAC', '#FF6B6B', '#FFD93D', '#4A90E2', '#F39C12'],
//         hoverBackgroundColor: ['#6AE2A3', '#FF5D5D', '#FFCA3D', '#3F7DBA', '#E38B0E'],
//         borderWidth: 1
//     }]
// };

// const myChart = new Chart(ctx, {
//     type: 'doughnut',
//     data: data,
//     options: {
//         responsive: true,
//         plugins: {
//             legend: {
//                 display: false
//             }
//         },
//         cutout: '50%'
//     }
// });

// const legendContainer = document.getElementById('chartLegend');
// data.labels.forEach((label, index) => {
//     const legendItem = document.createElement('li');
//     const colorBox = document.createElement('span');
//     colorBox.style.backgroundColor = data.datasets[0].backgroundColor[index];
//     legendItem.appendChild(colorBox);
//     legendItem.appendChild(document.createTextNode(`${label} - ${data.datasets[0].data[index]}%`));
//     legendContainer.appendChild(legendItem);
// });



// document.addEventListener("DOMContentLoaded", function() {
//     // Função para obter valores dos spans
//     function getValue(id) {
//         return parseInt(document.getElementById(id).textContent);
//     }

//     // Função para obter labels dos spans
//     function getLabel(id) {
//         return document.getElementById(id).getAttribute('data-label');
//     }

//     // Função para determinar a cor com base no valor
//     function getColor(value) {
//         if (value < 100) {
//             return '#FF6B6B'; // vermelho
//         } else if (value < 160) {
//             return '#FFD93D'; // amarelo
//         } else {
//             return '#7CFCAC'; // verde
//         }
//     }

//     // Obtendo valores e labels dos spans
//     const values = [
//         getValue('comp1'),
//         getValue('comp2'),
//         getValue('comp3'),
//         getValue('comp4'),
//         getValue('comp5')
//     ];

//     const labels = [
//         getLabel('comp1'),
//         getLabel('comp2'),
//         getLabel('comp3'),
//         getLabel('comp4'),
//         getLabel('comp5')
//     ];

//     const colors = values.map(getColor);

//     const ctx = document.getElementById('myChart').getContext('2d');
//     const data = {
//         labels: labels,
//         datasets: [{
//             data: values,
//             backgroundColor: colors,
//             hoverBackgroundColor: colors.map(color => color), // manter a cor no hover
//             borderWidth: 1
//         }]
//     };

//     const myChart = new Chart(ctx, {
//         type: 'doughnut',
//         data: data,
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     display: false
//                 }
//             },
//             cutout: '50%'
//         }
//     });

//     const legendContainer = document.getElementById('chartLegend');
//     data.labels.forEach((label, index) => {
//         const legendItem = document.createElement('li');
//         const colorBox = document.createElement('span');
//         colorBox.style.backgroundColor = data.datasets[0].backgroundColor[index];
//         legendItem.appendChild(colorBox);
//         legendItem.appendChild(document.createTextNode(`${label} - ${data.datasets[0].data[index]}`));
//         legendContainer.appendChild(legendItem);
//     });
// });

var modal = document.getElementById("comentariosComps");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var botaoAbrir = document.getElementById("abrir")

var areaSobre = document.getElementById("areaSobre")

function abrir() {
    var botaoAbrir = document.getElementById("abrir")

    if (botaoAbrir.className.match('bi-arrows-angle-expand')) {
        botaoAbrir.classList.replace("bi-arrows-angle-expand", "bi-arrows-angle-contract")
        areaSobre.style.display = "block"
    } else {
        botaoAbrir.classList.replace("bi-arrows-angle-contract", "bi-arrows-angle-expand")
        areaSobre.style.display = "none"
    }
}



