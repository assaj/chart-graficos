const valoresFluxo = []; 
const indicadoresFluxo = [];
var chartFluxo, timeFluxo = 0; 

// Inicializando array dos indicadoresFluxo de tempo
for(let b = 0; b <= 1000; b++){
    b%100 == 0 ? indicadoresFluxo[b] = b/100 : indicadoresFluxo[b] = b;
}
//Pegando a tag "canvas" do index.html pelo seu id.
var ctx = document.getElementById('ChartFluxo');

criaGrafico();

function criaGrafico(){

    //Craindo o objeto grafico e colocando suas configuracoes
    chartFluxo = new Chart(ctx, {
        type: 'line',
        data: {
            labels: indicadoresFluxo,
            datasets: [{
                label: 'fluxo',
                data: valoresFluxo,
                fill: false,
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    footer: function(tooltipItem, data) {
                        let ret;
                        tooltipItem.forEach(function(tooltipItem){
                            ret = "tempo: "+indicadoresFluxo[tooltipItem.index];
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
                        labelString: 'valoresFluxo Randomicos'
                    },ticks : {
                        min: 0,
                        max: 100
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Tempo(S)'
                    },
                    
                }]
            }
        }
    });


}

//Roda a funcao de atualizacao a cada 10 milissegundos
//e armazenada para testes no console, remover isso na versao final.
let testVariableFluxo = setInterval(add, 10);

function add(){
    //adiciona valor aleatorio de 0 a 100
    valoresFluxo.push(Math.floor((Math.random() * 100)));

    //Se ja tem 1000 valoresFluxo de 10 milissegundos, comeca a descartar os antigos
    if(timeFluxo > 1000)
        valoresFluxo.shift();

    timeFluxo++;
    chartFluxo.update();
}

