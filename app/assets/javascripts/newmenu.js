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
  if ($(event.target).parent().hasClass('menu-item-open')) {
    $(event.target).closest('ul').children('li').removeClass('menu-item-open');
  } else {
    $(event.target).closest('ul').children('li').removeClass('menu-item-open');
    $(event.target).parent('li').addClass('menu-item-open');
  }
  $('#xpl-frame2-topics').toggle();
  $('#xpl-frame2-activity').hide();
});

$('#xpl-activity-button-desktop').on('click', event => {
  if ($(event.target).parent().hasClass('menu-item-open')) {
    $(event.target).closest('ul').children('li').removeClass('menu-item-open');
  } else {
    $(event.target).closest('ul').children('li').removeClass('menu-item-open');
    $(event.target).parent('li').addClass('menu-item-open');
  }
  $('#xpl-frame2-topics').hide();
  $('#xpl-frame2-activity').toggle();
});

$('.govuk-js-search-toggle').on('click', event => {
  $(event.target).toggleClass('govuk-js-search-toggle--open')
  $(event.target).text('×')
  $('#xpl-search-box').toggle();
});



$('.govuk-js-header-toggle').on('click', event => {
  event.target.classList.toggle('govuk-header__menu-button--open');
  event.target.innerText = event.target.classList.contains('govuk-header__menu-button--open') ? '×' : 'Menu';
  $('#navigation').toggleClass('govuk-header__navigation--open');
});
