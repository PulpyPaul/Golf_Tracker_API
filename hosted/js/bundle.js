'use strict';

var handleError = function handleError(message) {
  $('#errorMessage').text(message);
};

var sendAjax = function sendAjax(action, data) {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data: data,
    dataType: 'json',
    success: function success(result, status, xhr) {
      window.location = result.redirect;
    },
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });
};

$(document).ready(function () {
  $('select').material_select();
  $('.collapsible').collapsible();

  $('#signUpBtn').on('click', function (e) {
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

  $('#loginBtn').on('click', function (e) {
    e.preventDefault();

    if ($('#user').val() == '' || $('#pass').val() == '') {
      handleError('Username or password is empty');
      return false;
    }

    sendAjax($('#loginForm').attr('action'), $('#loginForm').serialize());

    return false;
  });

  $('#cardSubmitButton').on('click', function (e) {
    e.preventDefault();

    if ($('#courseName').val() == '') {
      handleError('Course Name is required!');
      return false;
    }

    for (var i = 1; i < 19; i++) {
      if ($('#hole' + i + 'Yards').val() == '') {
        handleError('Yards for each hole is required!');
        return false;
      }

      if ($('#hole' + i + 'Score').val() == '') {
        handleError('Score for each hole is required!');
        return false;
      }
    }

    sendAjax($('#golfCardForm').attr('action'), $('#golfCardForm').serialize());

    return false;
  });
});
