const REG_EXP = {
  email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  phone: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
}

const $userInput = $('#user-input').parents('.input-block')

$('.service__card').on('click', function () {
  $('#service-type').selectmenu('destroy')

  const text = $(this).children('p').text()
  $('#service-type option').removeAttr('selected')
  $(`#service-type option:contains(${text})`).attr('selected', '')

  $('#service-type').selectmenu()
})

$('#user-input').on('input', function () {
  $(this).val().trim()
    ? $('.device-info__service-modal .modal__save').removeAttr('disabled')
    : $('.device-info__service-modal .modal__save').attr('disabled', '')

  $userInput.removeClass('show-note js-error')
})

$('.device-info__service-modal .modal__save').on('click', function (e) {
  e.preventDefault()

  if (
    $('#user-input').val().match(REG_EXP.email) === null &&
    $('#user-input').val().match(REG_EXP.phone) === null
  ) {
    $userInput.addClass('show-note js-error')
  } else {
    console.log('success')
  }
})
