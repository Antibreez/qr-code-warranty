import {serialInputFileChange} from './support-request-modal'

const $label = $('.input-file__label')
const $input = $('.input-file__label input')
const $close = $('.input-file__result-clear')

const dragEvents = ['dragenter', 'dragover', 'dragleave', 'drop']
const dragOnEvents = ['dragenter', 'dragover']
const dragOffEvents = ['dragleave', 'drop']

function highlight(e) {
  $(e.currentTarget).addClass('highlight')
}

function unhighlight(e) {
  $(e.currentTarget).removeClass('highlight')
}

function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
}

dragEvents.forEach(eventName => {
  $label.on(eventName, preventDefaults)
})

dragOnEvents.forEach(eventName => {
  $label.on(eventName, highlight)
})

dragOffEvents.forEach(eventName => {
  $label.on(eventName, unhighlight)
})

const readUrl = input => {
  if (input.files && input.files[0]) {
    var reader = new FileReader()
    const $inputFile = $(input).parents('.input-file')
    const $label = $inputFile.find('.input-file__label')

    const $progress = $inputFile.find('.input-file__progress')
    const $progressValue = $progress.find(
      '.input-file__progress-bar-value span'
    )
    const $progressBar = $progress.find('.input-file__progress-bar-current')

    const $result = $inputFile.find('.input-file__result')
    const $resultName = $result.find('.input-file__result-name')
    const $resultImg = $result.find('.input-file__result-img-block img')

    reader.onloadstart = function (e) {
      console.log('load start')
    }

    reader.onprogress = function (e) {
      if (e.lengthComputable) {
        $label.hide()
        $progress.show()

        const progress = parseInt((e.loaded / e.total) * 100, 10)

        $progressValue.text(progress)
        $progressBar.css('width', `${progress}%`)
      }
    }

    reader.onload = function (e) {
      $progress.hide()
      $result.show()
      $resultName.text(input.files[0].name)
      $resultImg.attr('src', reader.result)

      $inputFile.addClass('filled')
      serialInputFileChange()
    }

    reader.readAsDataURL(input.files[0])
  }
}

const onFileChange = e => {
  readUrl(e.currentTarget)
}

// function onFileDrop(input) {
//   readUrl(input);
// }

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files

  const input = $(e.currentTarget).find('input')[0]

  if (input.files && input.files[0]) {
    input.value = ''

    if (!/safari/i.test(navigator.userAgent)) {
      input.type = ''
      input.type = 'file'
    }
  }

  input.files = files
  readUrl(input)
}

function onFileClear(e) {
  const $target = $(e.currentTarget)
  const $inputFile = $target.parents('.input-file')
  const input = $inputFile.find('input').first()[0]
  const $label = $inputFile.find('.input-file__label')
  const $progress = $inputFile.find('.input-file__progress')
  const $result = $inputFile.find('.input-file__result')

  input.value = ''

  if (!/safari/i.test(navigator.userAgent)) {
    input.type = ''
    input.type = 'file'
  }

  $label.show()
  $progress.hide()
  $result.hide()

  $inputFile.removeClass('filled')
  serialInputFileChange()
}

$label.each((idx, label) => {
  label.addEventListener('drop', handleDrop)
})
$input.on('change', onFileChange)
$close.on('click', onFileClear)

export function clearInputFile($inputField) {
  const $clear = $inputField.find('.input-file__result-clear')
  $clear.trigger('click')
}
