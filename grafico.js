const valoresFluxo = []; 
const indicadoresFluxo = [];
var chartFluxo, timeFluxo = 0, ctxFluxo; 

const valoresVols = [];
valoresVols[0] = [];
valoresVols[1] = [];
const indicadoresVols = [];
var chartVols, timeVols = 0, ctxVols; 

// Starting Array with Flow indicators
for(let b = 0; b <= 1000; b++){
    b%100 == 0 ? indicadoresFluxo[b] = b/100 : indicadoresFluxo[b] = b;
}

// Starting Array with Vols indicators
for(let b = 0; b <= 10; b++){
    indicadoresVols[b] = b;
}

// Creating flow graphic configuration
var fluxoConf = {
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
                    labelString: 'Tempo(s)'
                }
            }]
        }
    }
}

// Creating vols Graphic configuration
var volsConf = {
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
            duration : 5
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
                    labelString: 'Tempo(s)'
                }
            }]
        }
    }
}


function fluxoUpdate(){
    // Adds a random number between 0 and 100
    valoresFluxo.push(Math.floor((Math.random() * 100)));

    // discard of old values
    // start at 10 seconds
    if(timeFluxo > 1000)
        valoresFluxo.shift();

    timeFluxo++;
    chartFluxo.update();
}

function volsUpdate(){
    //Change this.
    //adds a random number between -3 and 3
    Math.floor((Math.random() * 2) + 1) == 2 ? valoresVols[0].push(Math.floor((Math.random() * 4))) : valoresVols[0].push(Math.floor((Math.random() * 3)*(-1)));
    Math.floor((Math.random() * 2) + 1) == 2 ? valoresVols[1].push(Math.floor((Math.random() * 4))) : valoresVols[1].push(Math.floor((Math.random() * 3)*(-1)));

    // discard of old values
    // start at 10 seconds
    if(timeVols > 10){
        valoresVols[1].shift();
        valoresVols[0].shift();
    }
    timeVols++;
    chartVols.update();
}

function numeroAleatorio(min,max){ // FIX IT
    let x;
    if(min < 0){
        let soma = (min *(-1)) + max;
        soma -= Math.floor((Math.random() * soma + 1));
        soma > 0 ? x = Math.floor((Math.random() * max + 1)) : x = Math.floor((Math.random() * ((min)*(-1))));
    }else{
        x = Math.floor((Math.random() * max) + min)
    }
    return x;
}

window.onload = function(){
    // catch tag "canvas" of html file, by ID.
    ctxFluxo = document.getElementById('ChartFluxo');
    ctxVols = document.getElementById('ChartVols');

    //Create two graphcs
    chartFluxo = new Chart(ctxFluxo, fluxoConf);
    chartVols = new Chart(ctxVols, volsConf);

    // Run the updating function of the two graphcs already created
    // The refresh rate is in milliseconds
    setInterval(fluxoUpdate, 10);
    setInterval(volsUpdate, 1000);
}
