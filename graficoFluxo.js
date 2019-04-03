const valores = []; 
const indicadores = [];
var chart, time = 0; 

// Inicializando array dos indicadores de tempo
for(let b = 0; b <= 100; b++){
    indicadores[b] = b/100;
}
//Pegando a tag "canvas" do index.html pelo seu id.
var ctx = document.getElementById('Chart');

criaGrafico();

function criaGrafico(){

    //Craindo o objeto grafico e colocando suas configuracoes
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: indicadores,
            datasets: [{
                label: 'Fluxo',
                data: valores,
                fill: false,
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    footer: function(tooltipItem, data) {
                        let ret = [];
                        tooltipItem.forEach(function(tooltipItem){
                            ret[0] = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            ret[1] = indicadores[tooltipItem.index];
                        });
                        return ret;
                    },
                    title: function(tooltipItem, data){
                        return "Informacoes";
                    }
                }
            },
            animation: {
                duration : 10
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Valores Randomicos'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Tempo'
                    }
                }]
            }
        }
    });


}

//Roda a funcao de atualizacao a cada 10 milissegundos
//e armazenada para testes no console, remover isso na versao final.
let testVariable = setInterval(add, 10);

function add(){
    //adiciona valor aleatorio de 0 a 100
    valores.push(Math.floor((Math.random() * 100)));

    //Se ja tem 100 valores de 10 milissegundos, comeca a descartar os antigos
    if(time > 100)
        valores.shift();

    time++;
    chart.update();
}

