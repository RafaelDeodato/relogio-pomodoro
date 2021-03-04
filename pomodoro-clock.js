var relogio
var qtdSessao = 0
var qtdIntervalo = qtdSessao - 1
var tempoSessao = 0
var tempoIntervalo = 0
var minutos = 0
var segundos = 0
var defineTimer = 1
var sessao = 0
var contador = 3
var totalSessao = 0

function zerarAplicacao() {
  paraRelogio()
  for (let index = 1; index <= totalSessao; index++) {
    id = 'sessao' + (index)
    document.getElementById(id).remove()
  }
  tempoSessao = 25
  tempoIntervalo = 5
  qtdSessao = 0
  document.getElementById('tempoSessao').innerHTML = tempoSessao
  document.getElementById('tempoIntervalo').innerHTML = tempoIntervalo
  document.getElementById('qtdSessao').innerHTML = qtdSessao
}

function somaQtdSessao() {
  document.getElementById('qtdSessao').innerHTML = ++qtdSessao
  criaSessao()
  ++totalSessao
}

function subtraiQtdSessao() {
  if (qtdSessao > 0) {
    document.getElementById('qtdSessao').innerHTML = --qtdSessao
    deletaSessao()
  }
}

function somaTempoSessao() {
  document.getElementById('tempoSessao').innerHTML = ++tempoSessao
}

function subtraiTempoSessao() {
  if (tempoSessao > 0) {
    document.getElementById('tempoSessao').innerHTML = --tempoSessao
  }
}

function somaTempoIntervalo() {
  document.getElementById('tempoIntervalo').innerHTML = ++tempoIntervalo
}

function subtraiTempoIntervalo() {
  if (tempoIntervalo > 0) {
    document.getElementById('tempoIntervalo').innerHTML = --tempoIntervalo
  }
}

function criaSessao(quantidade) {
  elementoPai = document.getElementById('sessoes')

  var novoElemento = document.createElement('div')
  novoElemento.id = 'sessao' + qtdSessao
  novoElemento.className = 'sessao_estudos'

  var check = document.createElement('i')
  check.id = 'icon' + qtdSessao
  check.className = 'far fa-circle'

  var texto = document.createTextNode(' Sessão de estudos ' + qtdSessao)

  novoElemento.appendChild(check)
  novoElemento.appendChild(texto)

  elementoPai.appendChild(novoElemento)
}

function deletaSessao() {
  id = 'sessao' + (qtdSessao + 1)
  document.getElementById(id).remove()
}

function concluiSessao(sessao) {
  idSessao = 'sessao' + sessao
  idIcon = 'icon' + sessao
  document.getElementById(idSessao).className = 'sessao_concluida'
  document.getElementById(idIcon).className = 'fas fa-check-circle'
}

function fechaModal() {
  document.getElementById('modal-notificacao').classList.remove('mostrar')
  paraNotificacao()
  if (qtdSessao != 0) {
    iniciaRelogio()
  }
}

function abreModal() {
  document.getElementById('modal-notificacao').classList.add('mostrar')
  tocaNotificacao()
  paraRelogio()
}

function tocaNotificacao() {
  audio = document.querySelector('audio')
  notificacao = setInterval(notificacao_timer, 2000)
  function notificacao_timer() {
    audio.play()
  }
}

function paraNotificacao() {
  clearInterval(notificacao)
}

function iniciaRelogio() {
  segundos = 0
  if (defineTimer == 1) {
    minutos = tempoSessao
    relogio = setInterval(timer, 1000)
  }
  if (defineTimer == 0) {
    minutos = tempoIntervalo
    relogio = setInterval(timer, 1000)
  }
}

function paraRelogio() {
  clearInterval(relogio)
}

function timer() {
  if ((minutos == 0) && (segundos == 0)) {
    if (defineTimer == 1) {
      ++sessao
      concluiSessao(sessao)
      --qtdSessao
      defineTimer = 0
      abreModal()
    } else if (defineTimer == 0) {
      defineTimer = 1
      abreModal()
    }
  }

  if (minutos < 10) {
    document.getElementById('minutos').innerHTML = '0' + minutos
  } else {
    document.getElementById('minutos').innerHTML = minutos
  }

  if (segundos < 10) {
    document.getElementById('segundos').innerHTML = '0' + segundos
  } else {
    document.getElementById('segundos').innerHTML = segundos
  }

  --segundos

  if (segundos == -1) {
    --minutos
    segundos = 59
  }
}