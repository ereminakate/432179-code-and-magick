'use strict';

window.renderStatistics = function (ctx, names, times) {

  var max = -1;
  var maxIndex = -1;
  var histogramWidth = 40;             // px;
  var histogramHeigth = 150; // px;
  var  indent = 50;    // px;
  var step;

  var initialX = 150; // px;
  var  initialY = 250; // px

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

  for (var i = 0 ; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
  }

  step = histogramHeigth / (max - 0); // px;
  ctx.textBaseline = 'top'; // положение надписи от левого верхнего угла
  for(var i = 0; i < times.length; i++) {
    if (names[i] == 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255,' + Math.random() + ')';
    }
    ctx.fillRect(initialX + (histogramWidth + indent) * i, initialY - times[i] * step, histogramWidth, times[i] * step);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(names[i], initialX + (histogramWidth + indent) * i, initialY + 5);
    ctx.fillText(Math.round(times[i]), initialX + (histogramWidth + indent) * i, initialY - times[i] * step - 25);
  }
};
