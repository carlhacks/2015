$(document).ready(function () {
  $('form.user').submit(function (evt) {
    $.post('/users/save',
      $('form.user').serialize(),
      function (data) {
        if (data.status == 'ok') {
          var link = data.link;
          $('.success a.update-link').attr('href', link);
          $('.success').toggleClass('hidden', false);
          $('form.user').toggleClass('hidden', true);
        } else {
          alert('Unable to save! Please double check your data.');
        }
      }
    );
    evt.preventDefault();
    return false;
  });
});