$('#xpl-topics-button').on('click', event => {
  $(event.target).hide();
  $(event.target).next('.xpl-frame2').show();
  $(event.target).parent().nextAll('li').hide();
});


$('#xpl-topics-menu-item, #xpl-topics-button-desktop').on('click', event => {
  event.stopPropagation();
  const menuLabel = $('#xpl-topics-button-desktop');
  if (menuLabel.parent().hasClass('menu-item-open')) {
    menuLabel.closest('ul').children('li').removeClass('menu-item-open');
    $('.xpl-backdrop').hide();
  } else {
    menuLabel.closest('ul').children('li').removeClass('menu-item-open');
    menuLabel.parent('li').addClass('menu-item-open');
    $('.xpl-backdrop').show();
  }
  $('#xpl-frame2-topics').toggle();
  $('#xpl-frame2-activity').hide();
});


$('#xpl-activity-menu-item, #xpl-activity-button-desktop').on('click', event => {
  event.stopPropagation();
  const menuLabel = $('#xpl-activity-button-desktop');
  if (menuLabel.parent().hasClass('menu-item-open')) {
    menuLabel.closest('ul').children('li').removeClass('menu-item-open');
    $('.xpl-backdrop').hide();
  } else {
    menuLabel.closest('ul').children('li').removeClass('menu-item-open');
    menuLabel.parent('li').addClass('menu-item-open');
    $('.xpl-backdrop').show();
  }
  $('#xpl-frame2-topics').hide();
  $('#xpl-frame2-activity').toggle();
});



$('.govuk-js-header-toggle').on('click', event => {
  event.target.classList.toggle('govuk-header__menu-button--open');
  event.target.innerText = event.target.classList.contains('govuk-header__menu-button--open') ? '×' : 'Menu';
  $('main, footer, #global-header-bar, #global-bar, #wrapper, #navigation').toggle();
});

$('.xpl-backdrop').on('click', function(event) {
  $(this).hide();
  $('#xpl-frame2-topics, #xpl-frame2-activity').hide();
  $('#navigation-desktop li').removeClass('menu-item-open');
});
