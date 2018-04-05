const handleError = (message) => {
  $('#errorMessage').text(message);
};

const sendAjax = (action, data) => {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data,
    dataType: 'json',
    success: (result, status, xhr) => {
      window.location = result.redirect;
    },
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    },
  });
};

$(document).ready(() => {
  $('select').material_select();

  $('#signupForm').on('submit', (e) => {
    e.preventDefault();

    if ($('#user').val() == '' || $('#pass').val() == '' || $('#pass2').val() == '') {
      handleError('All fields are required');
      return false;
    }

    if ($('#pass').val() !== $('#pass2').val()) {
      handleError('Passwords do not match');
      return false;
    }

    sendAjax($('#signupForm').attr('action'), $('#signupForm').serialize());

    return false;
  });

  $('#loginForm').on('submit', (e) => {
    e.preventDefault();

    if ($('#user').val() == '' || $('#pass').val() == '') {
      handleError('Username or password is empty');
      return false;
    }

    sendAjax($('#loginForm').attr('action'), $('#loginForm').serialize());

    return false;
  });

  $('#golfCardForm').on('submit', (e) => {
    e.preventDefault();

    if ($('#courseName').val() == '' || $('#score').val() == '') {
      handleError('All fields are required');
      return false;
    }

    sendAjax($('#golfCardForm').attr('action'), $('#golfCardForm').serialize());

    return false;
  });
});
