$(document).ready(function(){
  var i = 0;
  var x = $(".text-v .typing-txt").text();
  var y = "";

  function typeWriter() {
    if (i < x.length) {
      $('.typing').text(y+=x[i]);
      i++;
    }
    setTimeout(typeWriter, 100);
  }
  
  typeWriter();
})

$(function(){
  $('.next-btn').click(function() {
      var currtext = $('.text-v');
      if (!$(currtext).hasClass('lastText')) {
        $('.text-v').removeClass('text-v').next().addClass('text-v');

        var i = 0;
        var x = $(".text-v .typing-txt").text();
        var y = "";

        function typeWriter() {
          if (i < x.length) {
            $('.typing').text(y+=x[i]);
            i++;
          }
          setTimeout(typeWriter, 100);
        }
        
        typeWriter();

      } else if ($(currtext).hasClass('lastText')) {
        $('.text-v').removeClass('text-v').next().addClass('text-v');
        $('.josh-inv').removeClass('josh-inv');
        $('.josh-v').addClass('josh-inv');
        $('.next-btn').addClass('invisible');
        $('.fight-btn').removeClass('invisible');

        
        var i = 0;
        var x = $(".text-v .typing-txt").text();
        var y = "";

        function typeWriter() {
          if (i < x.length) {
            $('.typing').text(y+=x[i]);
            i++;
          }
          setTimeout(typeWriter, 100);
        }
        
        typeWriter();
      }
  });
});
