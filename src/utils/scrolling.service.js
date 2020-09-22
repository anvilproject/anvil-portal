/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic scrolling service.
 * Methods to support scrolling content and outline actions.
 */

/**
 * Returns a Map object of all <h1> to <h3> anchor "id"s with their corresponding position from the top of the page.
 *
 * @param contentAnchors
 * @param elementIdsByAnchorFromTop
 * @returns {*}
 */
export function calculateElementIdsByAnchorFromTop(contentAnchors, elementIdsByAnchorFromTop) {

    if (!contentAnchors) {

        return;
    }

    // Clear required for the event listener "resize".
    elementIdsByAnchorFromTop.clear();

    // Grab each <h1> to <h3> anchor id and its position from the top of the page.
    contentAnchors.forEach(pageAnchor => {

        // Only grab <h1> to <h3>
        if (Number(pageAnchor.tagName.charAt(1)) <= 3) {

            elementIdsByAnchorFromTop.set((pageAnchor.offsetTop), pageAnchor.id);
        }
    });

    return elementIdsByAnchorFromTop;
}

/**
 * Returns the style "maxHeight" for the side nav and outline, based on content and outline
 * scrolling positions.
 *
 * @param bannerHeight
 * @param element
 * @returns {string}
 */
export function calculateNavMaxHeight(bannerHeight, element) {

    // The maxHeight setting is not required when the window innerWidth is less than 840. (Outline is dropped at 
    // 1388px, left nav is stacked at 840).
    // In this instance, the outline and nav styles are defined by a different set of responsive settings.

    if ( !element || window.innerWidth < 840 ) {

        return;
    }

    // Calculate the side nav style "maxHeight", taking into account the sticky top position at 100px,
    // the section padding 60px and the footer 96px and the height of the privacy banner (if showing).
    // When there is main content overflow, the maxHeight should allow an nav/outline of length equal to
    // available screen height.  The nav/outline will stretch taking up the remaining screen height, from the
    // sticky top position at 100px, until the content approaches end of scrolling.
    // At near to end of scrolling (section padding and footer),
    // the nav maxHeight will be such that the appearance of the nav's bottom edge matches the
    // bottom edge of the content.

    let elementHeight;

    // If the privacy banner is showing, and the scroll position has not reached the end of the content,
    // a different set of rules will govern the "maxHeight".
    // The "maxHeight" will be calculated by the available height provided by the window, taking into account the
    // sticky top position, and the banner height. This rule remains effective until the last scrollable 160px
    // is in play.

    if ( calculatePixelPositionFromEnd() < 160 ) {

        elementHeight = document.body.clientHeight - window.scrollY - 100 - 60 - 96 - bannerHeight;
    }
    else {

        elementHeight = window.innerHeight - 100 - bannerHeight;
    }

    return element.style.maxHeight = `${elementHeight}px`;
}

/**
 * Returns a list of any content related elements with an "id".
 *
 * @returns {Array}
 */
export function getContentAnchors() {

    // Grab any content element with an anchor "id".
    const contentEl = document.querySelector('[id^="content"]');

    if ( !contentEl ) {
        return;
    }

    return Array.from(contentEl.querySelectorAll("[id]"));
}

/**
 * Returns true if the unordered outline list is longer than either the window, or than its parent outline <div>.
 *
 * @param htmlEls
 * @param outlineEl
 * @returns {boolean}
 */
export function isOutlineScrollable(htmlEls, outlineEl) {

    const unorderedListLongerThanOutline = outlineEl.children[0].offsetHeight > outlineEl.getBoundingClientRect().height;
    const unorderedListLongerThanWindowHeight = outlineEl.children[0].offsetHeight > window.innerHeight;

    return htmlEls.length && (unorderedListLongerThanOutline || unorderedListLongerThanWindowHeight);
}

/**
 * Maintains the position of an active outline to remain visible i.e. within the outline container.
 *
 * @param activeEls
 * @param outlineEl
 */
export function manageActiveOutlineScrollPosition(activeEls, outlineEl) {

    if ( activeEls.length === 0 ) {

        return;
    }

    // Event handler that will reposition outline scroll if there is an active outline element,
    // and the element is positioned above or below the bounds of the outline navigation.
    let activeEl = activeEls[0];

    // Calculate the number of pixels from the end of the page
    let pxToEndScroll = calculatePixelPositionFromEnd();

    // Outline container
    const outlineContainerHeight = outlineEl.offsetHeight;

    // Active outline positions
    const activeTopPos = activeEl.getBoundingClientRect().top;
    const activeBottomPos = activeEl.getBoundingClientRect().bottom;
    const activeMidHeight = (activeEl.offsetHeight / 2);
    const posBelowScreen = activeBottomPos - (outlineContainerHeight + 100);
    const posAboveScreen = 100 - activeTopPos;

    // Scrolls to outline end as outline maxHeight is reduced.
    if ( pxToEndScroll < 160 ) {

        scrollTo(outlineEl, outlineEl.scrollHeight - pxToEndScroll);
    }

    // Repositions active outline to mid point if the active outline is positioned below the outline container.
    if ( activeBottomPos > outlineContainerHeight + 100 ) {

        scrollTo(outlineEl, outlineEl.scrollTop + posBelowScreen + (outlineContainerHeight / 2) - activeMidHeight);
    }

    // Repositions active outline to mid point if the active outline is positioned above the outline container.
    if ( activeTopPos < 100 ) {

        scrollTo(outlineEl, (outlineEl.scrollTop - posAboveScreen - (outlineContainerHeight / 2) + activeMidHeight));
    }
}

/**
 * Returns the current outline anchor.
 *
 * @param elementIdsByAnchorFromTop
 * @param activeOutline
 * @returns {*}
 */
export function manageSpyScrollAction(elementIdsByAnchorFromTop, activeOutline) {

    let currentScrollPos = window.scrollY + 100;
    let endScrollPos = document.body.clientHeight - window.innerHeight + 100;

    // Check not at the bottom of the page
    if (currentScrollPos !== endScrollPos) {

        let currentAnchorPos;

        // Find the anchor that is current for the scroll position
        for ( let anchorPos of elementIdsByAnchorFromTop.keys() ) {

            if ( currentScrollPos >= anchorPos ) {

                currentAnchorPos = anchorPos;
            }
            else if ( currentScrollPos < [...elementIdsByAnchorFromTop][0][0]) {

                /* Make the current anchor position the first element, if the current scroll position is above the first element. */
                /* The first element of interest in the spy should represent the <h1> tag. */
                currentAnchorPos = [...elementIdsByAnchorFromTop][0][0];
            }
            else {

                break; // exit iterator
            }
        }

        // Set the current element id
        let currentElementId = `#${elementIdsByAnchorFromTop.get(currentAnchorPos)}`;

        // Continue if the current element is different to the active outline (state variable).
        if ( currentElementId !== activeOutline ) {

            if ( currentAnchorPos !== undefined ) {

                // Update window location
                //window.history.pushState(null, "", currentElementId);

                // Return state
                return currentElementId;
            }
            else {

                // Update window location
                //window.history.pushState(null, "", window.location.pathname);

                // Return state
                return "";
            }
        }
    }

    // Return state
    return activeOutline;
}

/**
 * Returns the scrolling pixel position from the end of the page.
 *
 * @returns {number}
 */
function calculatePixelPositionFromEnd() {

    // Calculate the number of pixels from the end of the page
    let currentScrollPos = window.scrollY;
    let endScrollPos = document.body.clientHeight - window.innerHeight;

    return endScrollPos - currentScrollPos;
}

/*
 * Cross-browser scroll to functionality.
 */
function scrollTo(el, scrollTop) {

    if ( el.scrollTo ) {
        el.scrollTo(0, scrollTop)
    }
    else {
        el.scrollTop = scrollTop;
    }
}
