$(document).ready(function(){
  $('.ui.form.one')
    .form({
      firstName: {
        identifier  : 'name',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your first name'
          }
        ]
      },
      content: {
        identifier  : 'content',
        rules: [
          {
            type   : 'empty',
            prompt : "Well, what's up?"
          }
        ]
      },
      email: {
        identifier  : 'email',
        rules: [
          {
            type   : 'email',
            prompt : 'Please enter your email address'
          }
        ]
      }
    }, {
      inline: true,
      on: 'blur',
      onSuccess: function(event) {
        event.preventDefault();
        $('.message').show();
    }
  });
});