import {clearInputFile} from './upload'

const REG_EXP = {
  email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  phone: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
}

const $modalBtn = $('button[data-trigger="support-request"]')
const $serialInput = $('#support-request-serial')
const $submitBtn = $('#support-request .modal__save')
const $userInput = $('#user-input-support')
const $userInputBlock = $userInput.parents('.input-block')
const $serialInputBlock = $serialInput.parents('.input-block')
const $inputFile = $('.device-info__support-request-modal .input-file')

const clearFields = () => {
  $userInput.val('')
  $serialInput.val('')
  $userInputBlock.removeClass('show-note js-error')
  $userInputBlock.addClass('js-empty')
  $serialInputBlock.addClass('js-empty')
  $submitBtn.attr('disabled', '')

  clearInputFile($inputFile)
}

$modalBtn.on('click', function () {
  clearFields()
})

$serialInput.on('input', function () {
  if (
    $(this).val().trim() &&
    $userInput.val().trim() &&
    $inputFile.hasClass('filled')
  ) {
    $submitBtn.removeAttr('disabled')
  } else {
    $submitBtn.attr('disabled', '')
  }
})

$userInput.on('input', function () {
  if (
    $(this).val().trim() &&
    $serialInput.val().trim() &&
    $inputFile.hasClass('filled')
  ) {
    $submitBtn.removeAttr('disabled')
  } else {
    $submitBtn.attr('disabled', '')
  }

  $userInputBlock.removeClass('show-note js-error')
})

$submitBtn.on('click', function (e) {
  e.preventDefault()

  if (
    $userInput.val().match(REG_EXP.email) === null &&
    $userInput.val().match(REG_EXP.phone) === null
  ) {
    $userInputBlock.addClass('show-note js-error')
  } else {
    console.log('success')
  }
})

export function serialInputFileChange() {
  if (
    $userInput.val().trim() &&
    $serialInput.val().trim() &&
    $inputFile.hasClass('filled')
  ) {
    $submitBtn.removeAttr('disabled')
  } else {
    $submitBtn.attr('disabled', '')
  }
}
