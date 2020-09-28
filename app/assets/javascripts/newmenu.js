
$('.xpl-menu__button').on('click', event => {
  $('.xpl-menu__button').hide();
  $(event.target).next().show();
});

$('.xpl-menu__button-back').on('click', event => {
  $('.xpl-menu__frame2').hide();
  $('.xpl-menu__button').show();
});