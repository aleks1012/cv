const filters = document.querySelector('.filters'),
    labelFilters = filters.querySelectorAll('label'),
    imageElement = document.querySelector('img'),
    btnReset = document.querySelector('.btn-reset'),
    btnNext = document.querySelector('.btn-next'),
    btnSave = document.querySelector('.btn-save'),
    btnFullscreen = document.querySelector('.fullscreen'),
    inputFile = document.querySelector('.btn-load--input');

let defaultValue = [];
labelFilters.forEach((el) => defaultValue.push(el.querySelector('output').innerHTML));

//Отслеживание изменений в Input
function onTrackingChangesInInput() {
    let output = this.querySelector('output');
    let input = this.querySelector('input');
    //Добавление измененного значения в Output
    (function changingValuesInOutput() {
        output.textContent = input.value;
    }());
    // Изменение значений Filter
    (function applyingFiltersToImg() {
        document.documentElement.style.setProperty(`--${input.name}`, input.value + input.dataset.sizing)
    }());
}

//Отслеживание изменений во всех input
labelFilters.forEach((el) => {
    el.addEventListener('input', onTrackingChangesInInput)
})

// Сброс фильтра
function onResetFilter() {
    for (let i = 0; i < labelFilters.length; i++) {
        let input = labelFilters[i].querySelector('input');
        let output = labelFilters[i].querySelector('output');
        input.value = defaultValue[i]
        output.textContent = input.value;
        document.documentElement.style.setProperty(`--${input.name}`, input.value + input.dataset.sizing)
    }
}

// Сброс фильтров при клике на кнопку Reset
btnReset.addEventListener('click', onResetFilter)

// Смена изображение по времени
let date = new Date(),
    hours = date.getHours(),
    folderImg,
    item = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

if (hours >= 6 && hours < 12) {
    folderImg = 'morning'
} else if (hours >= 12 && hours < 18) {
    folderImg = 'day'
} else if (hours >= 18 && hours < 24) {
    folderImg = 'evening'
} else if (hours >= 0 && hours < 6) {
    folderImg = 'night'
}

// Смена изображения при клики
let i = 0

function onSwitchingImage() {
    let index = i++ % item.length
    imageElement.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${folderImg}/${item[index]}.jpg`;
    btnNext.disabled = true
    setTimeout(function () {
        btnNext.disabled = false
    }, 1000)
}

btnNext.addEventListener('click', onSwitchingImage)

// Загрузка своего изображения
function imgLoad() {
    let file = inputFile.files[0];
    const reader = new FileReader()
    reader.onload = () => {
        imageElement.src = String(reader.result);
    }
    reader.readAsDataURL(file);
}

inputFile.addEventListener('change', imgLoad)

// Скачивание изображения

function downloadImage() {
    let canvas = document.createElement('canvas');
    const img = new Image();
    img.src = imageElement.src;
    img.setAttribute('crossorigin', 'anonymous');
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        let filter = [];
        labelFilters.forEach((el) => {
            item = el.querySelector('input');
            if (item.name === 'blur') {
                filter.push(`${item.name}(${
                    Math.round((canvas.height / imageElement.height) * item.value)
                }${item.dataset.sizing})`);
            } else {
                filter.push(`${item.name}(${item.value}${item.dataset.sizing})`);
            }
        })
        const ctx = canvas.getContext("2d");
        ctx.filter = (`${filter.join(' ')}`)
        ctx.drawImage(img, 0, 0);
        let link = document.createElement('a');
        link.download = `Photo-filter ${folderImg}.png`;
        link.href = canvas.toDataURL('image/jpeg', 1);
        link.click();
        link.delete;
    };
}

btnSave.addEventListener('click', downloadImage);

function fullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

btnFullscreen.addEventListener('click', fullscreen)