
$('.xpl-menu__button').on('click', event => {
  $(event.target).hide();
  $('.xpl-menu__frame2').show();
  $(event.target).parent().nextAll('li').hide();
});

$('.xpl-menu__button-back').on('click', event => {
  $(event.target).parent().prev('button').show();
  $('.xpl-menu__frame2').hide();
  $('.govuk-header__navigation-item').show();
});