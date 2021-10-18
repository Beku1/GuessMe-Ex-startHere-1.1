'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.victory-modal').children('button').click(onRestartGame)
$('.victory-gif').append(
  '<img id="theImg" src="https://media0.giphy.com/media/g9582DNuQppxC/giphy.gif?cid=ecf05e47xtohqqxmm5dtb81akoeku4k9plp4cyts1bpmc8qr&rid=giphy.gif&ct=g">'
)

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  $('.game-start').hide()

  renderQuest()
}

function renderQuest() {
  $('.quest').show()
  $('.quest').children('h2').text(gCurrQuest.txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.victory').show()
      $('.quest').hide()
      
    } else {
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  var lastRes = gLastRes
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()
  $('#newGuess').val('')
  $('#newQuest').val('')
  addGuess(newQuest, newGuess, lastRes)
  onRestartGame()
}

function onRestartGame() {
  gLastRes = null
  $('.new-quest').hide()
  $('.game-start').show()
  $('.victory').hide()
  $('.quest').hide()
  restartGame()
}
