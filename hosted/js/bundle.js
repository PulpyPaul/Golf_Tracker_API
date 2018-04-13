'use strict';

// Helper function for errors
var handleError = function handleError(message) {
  $('#errorMessage').text(message);
};

// Standard function for sending AJAX requests
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

// Wrapper event for when document is ready
$(document).ready(function () {

  // Initializers for Materialize elements
  $('select').material_select();
  $('.collapsible').collapsible();

  // Sign up Button Event
  $('#signUpBtn').on('click', function (e) {
    e.preventDefault();

    // Checks for all user fields filled in
    if ($('#user').val() == '' || $('#pass').val() == '' || $('#pass2').val() == '') {
      Materialize.toast('All fields are required', 3000);
      return false;
    }

    // Checks for matching passwords
    if ($('#pass').val() !== $('#pass2').val()) {
      Materialize.toast('Passwords do not match', 3000);
      return false;
    }

    // Sends request to create account and submits form
    Materialize.toast('Account Created!', 3000);
    sendAjax($('#signupForm').attr('action'), $('#signupForm').serialize());

    return false;
  });

  // Login Button Event
  $('#loginBtn').on('click', function (e) {
    e.preventDefault();

    // Checks for all fields to be filled out
    if ($('#user').val() == '' || $('#pass').val() == '') {
      Materialize.toast('Username or password is empty', 3000);
      return false;
    }

    // Sends request to log in and submits form
    Materialize.toast('Login Successful!', 3000);
    sendAjax($('#loginForm').attr('action'), $('#loginForm').serialize());

    return false;
  });

  // Card Submit Button Event
  $('#cardSubmitButton').on('click', function (e) {
    e.preventDefault();

    // Checks to make sure course name is filled in
    if ($('#courseName').val() == '') {
      Materialize.toast('Course Name is required!', 3000);
      return false;
    }

    // Checks for all yard and score fields
    for (var i = 1; i < 19; i++) {
      if ($('#hole' + i + 'Yards').val() == '') {
        Materialize.toast('Yards for each hole is required!', 3000);
        return false;
      }

      if ($('#hole' + i + 'Score').val() == '') {
        Materialize.toast('Score for each hole is required!', 3000);
        return false;
      }
    }

    // Sends request and submits form
    Materialize.toast('Card Created!', 3000);
    sendAjax($('#golfCardForm').attr('action'), $('#golfCardForm').serialize());

    return false;
  });
});
