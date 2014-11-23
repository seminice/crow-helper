( function( window ) {
'use strict';

// Class helpers ----------------------------------------------------------

// Gets a list of the classes of an element and make a list with a space at
// the end of each class name to ease finding.
// @param   elem    HTML element
// @return  string  list of class names
function getClasses(elem) {
    return (' ' + (elem.className || '') + ' ').replace(/\s+/gi, ' ');
}

// Checks if an element has a class
// @param   elem     HTML element
// @param   cls      class name
// @return  boolean
function hasClass(elem, cls) {
    var list = typeof elem == 'string' ? elem : getClasses(elem);
    return list.indexOf(' ' + cls + ' ') >= 0;
}

// Adds a class to an element
// @param   elem     HTML element
// @param   cls      class name
function addClass(elem, cls) {
    var oldClasses = getClasses(elem);
    var newClasses = oldClasses + cls;

    // Return if the element already has the class
    if (hasClass(oldClasses, cls)) return;

    // Remove the extra space at the begining
    elem.className = newClasses.substring(1);
}

// Removes a class from an element
// @param   elem     HTML element
// @param   cls      class name
function removeClass(elem, cls) {
    var oldClasses = getClasses(elem);
    var newClasses;

    // Return if the element doesnt has the class
    if (!hasClass(elem, cls)) return;

    // Replace the class name.
    newClasses = oldClasses.replace(' ' + cls + ' ', ' ');

    // Remove the extra space at the begining and end
    elem.className = newClasses.substring(1, newClasses.length - 1);
}

// Toggles a class on an element
// @param   elem     HTML element
// @param   cls      class name
function toggleClass(elem, cls) {
  var fn = hasClass(elem, cls) ? removeClass : addClass;
  fn(elem, cls);
}


// CSS helpers --------------------------------------------------------

// Detects when a css animation has ended
// Usage:
// var transitionEvent = detectAnimationEnd(el);
// transitionEvent && el.addEventListener(transitionEvent, function() {
//      // do something
// });
// @param el    HTML element
function detectAnimationEnd(el){
    var t;
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}




var helpers = {
    class: {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    },
    css: {
        detectAnimationEnd: detectAnimationEnd
    }
};

window.helpers = helpers;

})( window );
