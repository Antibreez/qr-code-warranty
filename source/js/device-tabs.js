$('.device-info__tabs-button').on('click', function () {
  if (!$(this).hasClass('active')) {
    $('.device-info__tabs-button').removeClass('active')
    $(this).addClass('active')

    const idx = +$(this).attr('data-tab')
    $('.device-info__content-item').hide()
    $('.device-info__content-item').eq(idx).show()
  }
})
