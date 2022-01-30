const $okBtn = $('.support-request-success__ok')
const $modal = $('#support-request-success')
const $body = document.querySelector('body')

$okBtn.on('click', function () {
  $modal.removeClass('js-show')
  $body.removeClass('js__body-no-scroll')
})
