/**
* Toggle class
* @param {object} node element
* @param {string} className to toggle
*/
const toggleClass = function (node, className) {
    if (node.className.indexOf(className) > 0) {
      node.className = node.className.replace(' ' + className, '');
    } else {
      node.className += ' ' + className;
    }
  };
  

const headerButton = document.querySelector('button.govuk-header__menu-button');



headerButton.addEventListener('click', event => {
    var $toggleButton = event.target || event.srcElement;
    var $target = event.target; //$module.querySelector('#' + $toggleButton.getAttribute('aria-controls'));
  
    toggleClass($target, 'govuk-header__navigation--open');
    toggleClass($toggleButton, 'govuk-header__menu-button--open');
    $toggleButton.innerText = 
      $toggleButton.classList.contains('govuk-header__menu-button--open') ? 'Close' : 'Menu';
    $toggleButton.setAttribute('aria-expanded', $toggleButton.getAttribute('aria-expanded') !== 'true');
    $target.setAttribute('aria-hidden', $target.getAttribute('aria-hidden') === 'false');
});

  