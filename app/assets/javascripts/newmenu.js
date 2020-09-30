$('#xpl-topics-button').on('click', event => {
  $(event.target).hide();
  $(event.target).next('.xpl-frame2').show();
  $(event.target).parent().nextAll('li').hide();
});


$('#xpl-topics-back-button').on('click', event => {
  $(event.target).parent().hide();
  $(event.target).parent().prev('button').show();
  $(event.target).parents('li').nextAll('li').show();
});




$('#xpl-topics-button-desktop').on('click', event => {
  $('#xpl-frame2-topics').toggle();
  $('#xpl-frame2-activity').hide();

});

$('#xpl-activity-button-desktop').on('click', event => {
  $('#xpl-frame2-activity').toggle();
  $('#xpl-frame2-topics').hide();
});