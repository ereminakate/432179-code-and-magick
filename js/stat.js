'use strict';

// Функция поиска максимального значения элемента массива
function searchMaxNumber(arrs) {
  var max = -1;

  for (var i = 0; i < arrs.length; i++) {
    var arr = arrs[i];

    if (arr > max) {
      max = arr;
    }
  }
  return max;
}

// Функция получения случайного цвета
function drawRandomColor() {
  return 'rgba(0, 0, 255,' + Math.random() + ')';
}

// Функция отрисовки одного столбика гистограммы
function drawOneHistogram(i, ctx, names, times) {
  var histogramWidth = 40; // px;
  var histogramHeigth = 150; // px;
  var indent = 50; // px;
  var initialX = 150; // px;
  var initialY = 250; // px
  var step = histogramHeigth / (searchMaxNumber(times) - 0); // px;

  if (names[i] === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = drawRandomColor();
  }
  ctx.fillRect(initialX + (histogramWidth + indent) * i, initialY - times[i] * step, histogramWidth, times[i] * step);
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillText(names[i], initialX + (histogramWidth + indent) * i, initialY + 5);
  ctx.fillText(Math.round(times[i]), initialX + (histogramWidth + indent) * i, initialY - times[i] * step - 25);
}

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(110, 20, 420, 270);
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  ctx.textBaseline = 'top'; // положение надписи от левого верхнего угла

  for (var i = 0; i < times.length; i++) {
    drawOneHistogram(i, ctx, names, times);
  }
};
