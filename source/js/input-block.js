const $input = $('.input-block__input')

$(window).on('load', function () {
  $input.each(function () {
    if ($(this).val() !== '') {
      $(this).parents('.input-block').removeClass('js-empty')
    } else {
      $(this).parents('.input-block').addClass('js-empty')
    }
  })
})

$input.on('focus', function () {
  const $block = $(this).parents('.input-block')
  $block.removeClass('js-empty')
})

$input.on('blur', function () {
  const $block = $(this).parents('.input-block')

  if ($(this).val().split(' ').join('') === '') {
    $(this).val('')
  }

  if ($(this).val() === '') {
    $block.addClass('js-empty')
  }
})

window.addEventListener('pageshow', function () {
  $input.each(function () {
    if ($(this).val() !== '') {
      $(this).parents('.input-block').removeClass('js-empty')
    } else {
      $(this).parents('.input-block').addClass('js-empty')
    }
  })
})
