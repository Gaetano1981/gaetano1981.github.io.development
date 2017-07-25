(function() {

    var addEvent = function(elem, eventName, eventHandler) {
        if (elem.addEventListener) {
            elem.addEventListener(eventName, eventHandler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + eventName, eventHandler);
        }
    };

    var onOverLeaveAddRemoveStyle = function(sourceElem, targetElem, classNameActive, classNameInactive, onInit, targetCallbackOver, targetCallbackLeave) {
        if (sourceElem == undefined || targetElem == undefined)
            return;

        if (classNameActive != null && classNameInactive != null) {
            if (classNameActive.toLowerCase() != classNameInactive.toLowerCase()) {
                if (classNameActive.toLowerCase().indexOf(classNameInactive) != -1) {
                    throw new Error('substring class names lead to unpredictable results, not allowed:\r\n' + classNameActive + ' ' + classNameInactive);
                }
                if (classNameInactive.toLowerCase().indexOf(classNameActive) != -1) {
                    throw new Error('substring class names lead to unpredictable results, not allowed:\r\n' + classNameActive + ' ' + classNameInactive);
                }
            }
        }
        var fromDomJS_isObjectHTMLElement = function(object) {
            try {
                //Using W3 DOM2 (works for FF, Opera and Chrom)
                return obj instanceof HTMLElement;
            } catch (e) {
                //Browsers not supporting W3 DOM2 don't have HTMLElement and
                //an exception is thrown and we end up here. Testing some
                //properties that all elements have. (works on IE7)
                return (typeof obj === "object") &&
                    (obj.nodeType === 1) && (typeof obj.style === "object") &&
                    (typeof obj.ownerDocument === "object");
            }
        };

        if (fromDomJS_isObjectHTMLElement(sourceElem))
            return;

        if (fromDomJS_isObjectHTMLElement(targetElem))
            return;

        (function() {
            if (onInit)
                onInit(targetElem);

            var classes = targetElem.className;
            addEvent(sourceElem, "mouseover", function() {
                if (classes.indexOf(classNameActive) == -1) {
                    classes = classes.replace(" " + classNameActive, "");
                    classes = classes.replace(" " + classNameInactive, "");
                    classes += (" " + classNameActive);
                }
                targetElem.className = classes;
                if (targetCallbackOver)
                    targetCallbackOver(targetElem);
            });
            addEvent(sourceElem, "mouseleave", function() {
                if (classes.indexOf(classNameActive) != -1) {
                    classes = classes.replace(" " + classNameActive, " " + classNameInactive);
                }
                targetElem.className = classes;
                if (targetCallbackLeave)
                    targetCallbackLeave(targetElem);
            });
        })();
    }

    // animation on headphones image when the button is hovered
    var sourceElem = document.getElementsByClassName("check-it-out-button")[0];
    var targetElem = document.getElementsByClassName("headphones-photo")[0];
    onOverLeaveAddRemoveStyle(sourceElem, targetElem, "checkitout-over-active", "checkitout-over-inactive", null, null, null);

    /* LOOK FOR <BIG CHANGE#1> - removed underline when button hovered
    var sourceElem = document.getElementsByClassName("check-it-out-button")[0];
    var targetElem = document.getElementsByClassName("check-it-out-nostyle")[0];
    onOverLeaveAddRemoveStyle(sourceElem,targetElem,"sliding-middle-out-container","sliding-middle-out-container",
        function(targetElem) {
            var html = targetElem.innerHTML;
            if (html.indexOf('sliding-middle-out-line')==-1) {
                var pseudo = '<div class="sliding-middle-out-line"></div>';
                html = html.replace(pseudo,'');
                html += pseudo;
                targetElem.innerHTML = html;
            }
        },
        function(targetElem) {
            // mouse over callback
            var html = targetElem.innerHTML;
            var pseudoElem = document.getElementsByClassName('sliding-middle-out-line')[0];
            pseudoElem.className = 'sliding-middle-out-line sliding-middle-out-active';
        },
        function() {
            // mouse leave callback
            var pseudoElem = document.getElementsByClassName('sliding-middle-out-line')[0];
            pseudoElem.className = 'sliding-middle-out-line sliding-middle-out-inactive';
        }
    );
    */

    (function() {
        /* work images title hover animation (z-index) problem
        the reason why JS was used (and not :hover style class) is because
        we have the title overlaping the work image. This was causing the
        hover event firing and it's impossible to avoid the firing. */
        var sourceElems = document.getElementsByClassName('titleWithColor1');
        var targetElems = document.getElementsByClassName('overlayWithColor1');
        for (var i = 0; i < sourceElems.length; i++) {
            onOverLeaveAddRemoveStyle(sourceElems[i], targetElems[i], 'overlay1Hovered', 'overlayWithColor1', null, null, null);
            onOverLeaveAddRemoveStyle(targetElems[i], targetElems[i], 'overlay1Hovered', 'overlayWithColor1', null, null, null);
        }
        var sourceElems = document.getElementsByClassName('titleWithColor2');
        var targetElems = document.getElementsByClassName('overlayWithColor2');
        for (var i = 0; i < sourceElems.length; i++) {
            onOverLeaveAddRemoveStyle(sourceElems[i], targetElems[i], 'overlay2Hovered', 'overlayWithColor2', null, null, null);
            onOverLeaveAddRemoveStyle(targetElems[i], targetElems[i], 'overlay2Hovered', 'overlayWithColor2', null, null, null);
        }
    }());
})();