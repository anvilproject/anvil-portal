/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic service supporting tab position.
 */

// Styles
import compStyles from "../components/tabs/tab/tab.module.css";

/**
 * Calculates the tabs scroll left position.
 * Ensures the selected "active" <Tab> is within the viewport.
 *
 * @param tabEl
 */
export function calculateTabsScrollLeft(tabEl: HTMLSpanElement): number {
  /* Grab <Tab> left and right position. */
  const tabLeft = tabEl.getBoundingClientRect().left;
  const tabRight = tabEl.getBoundingClientRect().right;

  /* Grab the parent element <Tabs> and corresponding right position and scroll left position. */
  const tabsEl = tabEl.parentElement;
  const tabsRight = tabsEl?.getBoundingClientRect().right || 0;
  let scrollLeft = tabsEl?.scrollLeft || 0;

  /* Adjust scroll left to ensure the selected <Tab> is within the viewport. */
  if (tabLeft < 0) {
    /* Move tab back into the viewport by positioning to the LHS. */
    /* Decrease scroll left position. */
    scrollLeft += tabLeft - 16;
  }

  if (tabRight > tabsRight) {
    /* Move tab back into the viewport by positioning to the RHS. */
    /* Increase scroll left position. */
    scrollLeft += tabRight - tabsRight + 16;
  }

  return scrollLeft;
}

/**
 * Grabs the "active" <Tab> and returns the calculated <Tabs> scroll left position.
 * Ensures the selected "active" <Tab> is within the viewport.
 */
export function getTabsScrollLeftForActiveTab(): number {
  /* Calculate scrollLeft. */
  let scrollLeft = 0;

  if (typeof document !== "undefined") {
    /* Grab the active <Tab> element. */
    const activeTabEl = document.getElementsByClassName(
      compStyles.active
    )[0] as HTMLSpanElement;

    if (activeTabEl) {
      scrollLeft = calculateTabsScrollLeft(activeTabEl);
    }
  }

  return scrollLeft;
}

/**
 * Scrolls tabs (if required) to ensure the active tab is within the viewport.
 *
 * @param tabsEl
 * @param scrollX
 */
export function scrollTabs(tabsEl: HTMLDivElement, scrollX: number): void {
  if (tabsEl) {
    if (scrollX) {
      /* ScrollX calculated prior to navigation. */
      /* Ensures tab position is within viewport. */
      /* Maintains tab position if within viewport. */
      tabsEl.scrollTo(scrollX, 0);
    } else {
      /* Component mounts without scrollX (gatsby navigate state variable undefined). */
      /* Ensure tab position is within viewport. */
      tabsEl.scrollTo(getTabsScrollLeftForActiveTab(), 0);
    }
  }
}
