$(document).ready(function () {
  $('button.file').click(function (event) {
    event.stopPropagation();
    event.preventDefault();
    $(this).siblings('input[type=file]').click();
    return false;
  });

  $('input[type=file]').change(function () {
    var fname = $(this).val().split('\\').pop() || '<upload here>';
    $(this).siblings('button.file').text(fname);
  });

  $('html').on('dragover drop', function (event) {
    event.stopPropagation();
    event.preventDefault();
  });
});