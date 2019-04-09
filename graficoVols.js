const valoresVols = [];
valoresVols[0] = [];
valoresVols[1] = [];
const indicadoresVols = [];
var chartVols, timeVols = 0; 

// Inicializando array dos indicadoresVols de tempo
for(let b = 0; b <= 10; b++){
    indicadoresVols[b] = b;
}
//Pegando a tag "canvas" do index.html pelo seu id.
var ctx = document.getElementById('ChartVols');

criaGrafico();

function criaGrafico(){

    //Craindo o objeto grafico e colocando suas configuracoes
    chartVols = new Chart(ctx, {
        type: 'line',
        data: {
            labels: indicadoresVols,
            datasets: [{
                label: 'serieTemporal1',
                data: valoresVols[0],
                fill: false,
                borderColor: [
                    'rgba(0, 0, 132, 1)'
                ],
                borderWidth: 2
            },{
                label: 'serieTemporal2',
                data: valoresVols[1],
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
                        labelString: 'valoresVols Randomicos'
                    },ticks : {
                        min: -3,
                        max: 3
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Tempo(S)'
                    }
                }]
            }
        }
    });


}

//Roda a funcao de atualizacao a cada 10 milissegundos
//e armazenada para testes no console, remover isso na versao final.
let testVariableVols = setInterval(updateVols, 1000);

function updateVols(){
    //adiciona valor aleatorio de -3 a 3
    Math.floor((Math.random() * 2) + 1) == 2 ? valoresVols[0].push(Math.floor((Math.random() * 4))) : valoresVols[0].push(Math.floor((Math.random() * 3)*(-1)));
    Math.floor((Math.random() * 2) + 1) == 2 ? valoresVols[1].push(Math.floor((Math.random() * 4))) : valoresVols[1].push(Math.floor((Math.random() * 3)*(-1)));

    //Se ja tem 100 valoresVols de 10 milissegundos, comeca a descartar os antigos
    if(timeVols > 10){
        valoresVols[1].shift();
        valoresVols[0].shift();
    }
    timeVols++;
    chartVols.update();
}

