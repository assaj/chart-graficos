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
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
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

// Function that runs when the pages opens
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
  setInterval(updateFlow, flowIntervalTime)
  setInterval(updateVols, volsIntervalTime)
}

// this function follow exactly the normal update path
function updateFlow () {
  updateGraphicValues(flowValues, randomNumber(minFlowValue, maxFlowValue))
  updateGraphicIndicators(flowTime, maxFlowGraphicSize, flowIndicators, flowValues)
  removeOldValues(flowTime, maxFlowGraphicSize, flowValues)
  removeOldIndicator(flowIndicators, flowTime, maxFlowGraphicSize)
  flowTime += flowIntervalTime
  chartFlow.update()
}

// In this function, we gonna add two indicators and one two value.
// the first value is the diference between the atual value and the next
function updateVols () {
  let diff
  let random

  // In the first iteration, add a value and a indicator only one time
  if (typeof volsValues[0][0] !== 'number') {
    updateGraphicValues(volsValues[0], minVolsValue, maxVolsValue)
    updateGraphicValues(volsValues[1], minVolsValue, maxVolsValue)
    updateGraphicIndicators(volsTime, maxVolsGraphicSize, volsIndicators, volsValues[0])
  } else {
    // Add the first value two times
    random = randomNumber(minVolsValue, maxVolsValue)
    diff = Math.max(random, volsValues[0][volsValues[0].length - 1]) - Math.min(random, volsValues[0][volsValues[0].length - 1])
    diff = Math.floor(diff / 2)

    // addes the current value and your intermediate
    updateGraphicValues(volsValues[0], diff)
    updateGraphicValues(volsValues[0], random)

    // Add the second value two times
    random = randomNumber(minVolsValue, maxVolsValue)
    diff = Math.max(random, volsValues[1][volsValues[1].length - 1]) - Math.min(random, volsValues[1][volsValues[1].length - 1])
    diff = Math.floor(diff / 2)

    // addes the current value and your intermediate
    updateGraphicValues(volsValues[1], diff)
    updateGraphicValues(volsValues[1], random)

    // Add new indicators
    updateGraphicIndicators(volsTime, maxVolsGraphicSize, volsIndicators, volsValues[0])
    updateGraphicIndicators(volsTime + (volsIntervalTime / 2), maxVolsGraphicSize, volsIndicators, volsValues[0])

    // Remove old Values two time
    // Old values from first serie
    removeOldValues(volsTime, maxVolsGraphicSize, volsValues[0])
    removeOldValues(volsTime, maxVolsGraphicSize, volsValues[0])

    // Old values from second serie
    removeOldValues(volsTime, maxVolsGraphicSize, volsValues[1])
    removeOldValues(volsTime, maxVolsGraphicSize, volsValues[1])

    // Remove Indicators two times
    removeOldIndicator(volsIndicators, volsTime, maxVolsGraphicSize)
    removeOldIndicator(volsIndicators, volsTime, maxVolsGraphicSize)
  }
  // Updating chart and graphic time
  volsTime += volsIntervalTime
  chartVols.update()
}

function updateGraphicValues (values, value) {
  values.push(value)
}

function updateGraphicIndicators (time, maxGraphicSize, indicators, values) {
  indicators.push(secondToMillisecond(time))
}

function removeOldValues (time, maxGraphicSize, values) {
  if (time > maxGraphicSize) values.shift()
}

function removeOldIndicator (indicator, time, maxGraphicSize) {
  if (time > maxGraphicSize) indicator.shift()
}

function randomNumber (min, max) {
  let diff = max - min
  diff = Math.floor(Math.random() * (diff + 1))
  return min + diff
}

function secondToMillisecond (number) {
  return number / 1000
}
