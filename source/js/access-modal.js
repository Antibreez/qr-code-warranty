const REG_EXP = {
  email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  phone: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
}

const $modalBtn = $('button[data-trigger="access-order"]')
const $userInput = $('#access-user-input')
const $userMessage = $('#access-user-message')
const $userInputBlock = $userInput.parents('.input-block')
const $userInputMessage = $userMessage.parents('.input-block')
const $submitBtn = $('.device-info__access-modal .modal__save')

const clearFields = () => {
  $userInput.val('')
  $userMessage.val('')
  $userInputBlock.removeClass('show-note js-error')
  $userInputBlock.addClass('js-empty')
  $userInputMessage.addClass('js-empty')
  $submitBtn.attr('disabled', '')
}

$modalBtn.on('click', function () {
  clearFields()
})

$userInput.on('input', function () {
  $(this).val().trim()
    ? $submitBtn.removeAttr('disabled')
    : $submitBtn.attr('disabled', '')

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
