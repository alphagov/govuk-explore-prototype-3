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


// Mobile -- button to show or hide the menu
document.getElementById('xpl-menu-button').addEventListener('click', event => {

  // change the button itself
  event.target.classList.toggle('govuk-header__menu-button--open');
  event.target.innerText = event.target.classList.contains('govuk-header__menu-button--open') ? '×' : 'Menu';

  // show or hide the dropdown
  $('.explore-header #xpl-popup-menu').toggle();

  if ($('#xpl-search-button').hasClass('govuk-header__menu-button--open')) {
    // hide the search popup
    $('#xpl-search-button').removeClass('govuk-header__menu-button--open');
    $('#xpl-search-button').text('Search');
    $('#xpl-popup-search').hide();
  } else {
    // hide or show the rest of the page
    $('.explore-header').nextAll().toggle();
  }
});


// Mobile -- button to show or hide the search panel
document.getElementById('xpl-search-button').addEventListener('click', event => {
  // change the button itself
  event.target.classList.toggle('govuk-header__menu-button--open');
  event.target.innerText = event.target.classList.contains('govuk-header__menu-button--open') ? '×' : 'Search';

  // show or hide the dropdown
  $('.explore-header #xpl-popup-search').toggle();

  // hide or show the rest of the page
  $('.explore-header').prevAll().toggle();

  if ($('#xpl-menu-button').hasClass('govuk-header__menu-button--open')) {
    $('#xpl-menu-button').removeClass('govuk-header__menu-button--open');
    $('#xpl-menu-button').text('Menu');
    $('#xpl-popup-menu').hide();
  } else {
    $('.explore-header').nextAll().toggle();
  }
});


$('.xpl-backdrop').on('click', function(event) {
  $(this).hide();
  $('#xpl-frame2-topics, #xpl-frame2-activity').hide();
  $('#navigation-desktop li').removeClass('menu-item-open');
});
