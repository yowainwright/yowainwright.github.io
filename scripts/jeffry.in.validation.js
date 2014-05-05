$(document).ready(function(){
  $('.ui.form.one')
    .form({
      firstName: {
        identifier  : 'name',
        rules: [
          {
            type   : 'empty',
            prompt : 'Enter your name'
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
            prompt : 'Enter your email'
          }
        ]
      }
    }, {
      inline: true,
      on: 'blur',
      onSuccess: function() {
        alert('Your message has been submitted.');
      }
  });
});