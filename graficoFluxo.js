const valores = []; 
const indicadores = [];
var chart, time = 0; 

//Pegando a tag "canvas" do index.html pelo seu id.
var ctx = document.getElementById('Chart');

criaGrafico();

function criaGrafico(){

    //Passando as configuracoes da biblioteca ao canvas
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: indicadores,
            datasets: [{
                label: 'Fluxo',
                data: valores,
                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 3
            }]
        },
        options: {
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
setInterval(add, 10);

function add(){
    //adiciona valor aleatorio de 0 a 100
    valores.push(Math.floor((Math.random() * 100)));

    //A cada 1 segundo (ou seja, 10 times)
    // colocaremos um indicador de segundo
    // time/10;
    if(time%10 == 0){
        indicadores.push(time/10);
    }else{
        indicadores.push('');
    }
    time++;
    chart.update();
}