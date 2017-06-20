/**
 * Created by terhorsn on 23.01.2017.
 */
window.setInterval(function(){
  $('.Select-value-label').each(function(){
    var textValue = $(this).text();
    $(this).attr('title',textValue);
  });
}, 1000);
