const flowValues = []
const flowIndicators = []
var chartFlow
var flowTime = 0
var flowCtx

const volsValues = []
volsValues[0] = []
volsValues[1] = []
const volsIndicators = []
var chartVols
var volsTime = 0
var volsCtx

const volsIntervalTime = 2000
const flowIntervalTime = 10
const maxVolsGraphicSize = 10000
const maxFlowGraphicSize = 10000
const minFlowValue = 0
const maxFlowValue = 100
const minVolsValue = -3
const maxVolsValue = 3

// Creating flow graphic configuration
var FlowConf = {
  type: 'line',
  data: {
    labels: flowIndicators,
    datasets: [{
      label: 'fluxo',
      data: flowValues,
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
        footer: function (tooltipItem, data) {
          let ret
          tooltipItem.forEach(function (tooltipItem) {
            ret = 'tempo: ' + flowIndicators[tooltipItem.index]
          })
          return ret
        },
        title: function (tooltipItem, data) {
          return 'Informacoes'
        }
      }
    },
    animation: {
      duration: 10
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'ValoresFluxo Randomicos'
        },
        ticks: {
          min: minFlowValue,
          max: maxFlowValue
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
    labels: volsIndicators,
    datasets: [{
      label: 'serieTemporal1',
      data: volsValues[0],
      fill: false,
      borderColor: [
        'rgba(0, 0, 132, 1)'
      ],
      borderWidth: 2
    }, {
      label: 'serieTemporal2',
      data: volsValues[1],
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
        footer: function (tooltipItem, data) {
          let ret
          tooltipItem.forEach(function (tooltipItem) {
            ret = 'tempo: ' + flowIndicators[tooltipItem.index]
          })
          return ret
        },
        title: function (tooltipItem, data) {
          return 'Informacoes'
        }
      }
    },
    animation: {
      duration: 5
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'valoresVols Randomicos'
        },
        ticks: {
          min: minVolsValue,
          max: maxVolsValue
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

function flowUpdate () {
  // Adds a random number between 0 and 100
  flowValues.push(randomNumber(minFlowValue, maxFlowValue))

  // discard of old values
  // start at 10 seconds
  if (flowTime <= maxFlowGraphicSize) {
    flowIndicators.push(flowTime / 1000)
  } else {
    flowValues.shift()
  }

  flowTime += flowIntervalTime
  chartFlow.update()
}

function volsUpdate () {
  // adds a random number between -3 and 3
  volsValues[0].push(randomNumber(minVolsValue, maxVolsValue))
  volsValues[1].push(randomNumber(minVolsValue, maxVolsValue))

  // discard of old values
  // start at 10 seconds
  if (volsTime <= maxVolsGraphicSize) {
    volsIndicators.push(volsTime / 1000)
  } else {
    volsValues[1].shift()
    volsValues[0].shift()
  }
  volsTime += volsIntervalTime
  chartVols.update()
}

function randomNumber (min, max) {
  let diff = max - min
  diff = Math.floor(Math.random() * (diff + 1))
  return min + diff
}

window.onload = function () {
  // catch tag "canvas" of html file, by ID.
  flowCtx = document.getElementById('flowChart')
  volsCtx = document.getElementById('volsChart')

  // Create two graphcs
  /* global Chart */
  chartFlow = new Chart(flowCtx, FlowConf)
  chartVols = new Chart(volsCtx, volsConf)

  // Run the updating function of the two graphcs already created
  // The refresh rate is in milliseconds
  setInterval(flowUpdate, flowIntervalTime)
  setInterval(volsUpdate, volsIntervalTime)
}
