'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var COLOR_COATS = ['rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var COLOR_EYES = ['black',
  'red',
  'blue',
  'yellow',
  'green'
];
var COLOR_FIREBALL = ['#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var userNameInput = document.querySelector('.setup-user-name');
var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
var setupSave = document.querySelector('.setup-submit');

// При клике на мантию - она меняет цвет случайным образом из массива цветов
wizardCoat.addEventListener('click', function() {
  wizardCoat.style.fill = selectRandomElementArray(COLOR_COATS);
});

// При клике на глаза - они меняет цвет случайным образом из массива цветов
wizardEyes.addEventListener('click', function() {
  wizardEyes.style.fill = selectRandomElementArray(COLOR_EYES);
});

// При клике на файербол - он меняет цвет случайным образом из массива цветов
setupFireballWrap.addEventListener('click', function() {
  debugger;
  setupFireballWrap.style.backgroundColor = selectRandomElementArray(COLOR_FIREBALL);
});

// Проверка заполнения имени волшебника
userNameInput.addEventListener('invalid', function(evt) {
  if (!userNameInput.validity.valid) {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов!!!');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    }
  } else {
    userNameInput.setCustomValidity('');
  }
});

// Функция закрытия окна настроек при нажатии на ESC
var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// Функция открытия окна настроек
var openPopup = function() {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Функция закрытия окна настроек
var closePopup = function() {
  userDialog.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Обработчик открытия окна настроек при клике и нажатии на ENTER
setupOpen.addEventListener('click', openPopup);
setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Обработчик закрытия окна настроек при клике и нажатии на ENTER
setupClose.addEventListener('click', closePopup);
setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = createWizards();

// Функция создания массива похожих персонажей
function createWizards() {
  var wizardsArrays = [];

  for (var i = 0; i < 4; i++) {
    wizardsArrays[i] = {
      name: selectRandomElementArray(WIZARD_NAMES) + ' ' + selectRandomElementArray(WIZARD_SURNAMES),
      coatColor: selectRandomElementArray(COAT_COLORS),
      eyesColor: selectRandomElementArray(EYES_COLORS)
    };
  }
  return wizardsArrays;
}

// Функция выбора случайных элементов массива
function selectRandomElementArray(arrs) {
  return arrs[Math.floor(Math.random() * arrs.length)];
}

// Функция заполнения характеристик волшебника
var renderWizard = function(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');