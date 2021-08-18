/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL provider component.
 * Provider for app level functionality.
 */

// Core dependencies
import React, { useCallback, useEffect, useState } from "react";

// App dependencies
import ContextAnVILPortal from "../context-anvil-portal/context-anvil-portal";

function ProviderAnVILPortal(props) {
  const { children } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showNavDrawerButton, setShowNavDrawerButton] = useState(false);
  const [siteScrollable, setSiteScrollable] = useState(true);
  const mediaQueryFrom840 = "(min-width: 840px)";
  const mediaQueryFrom1024 = "(min-width: 1024px)";

  const onChangeBreakpoint = useCallback((mediaQuery, breakpointParser) => {
    /* Execute action with corresponding media query match. */
    if (mediaQuery.matches) {
      breakpointParser();
    }
  }, []);

  const onSetMenuOpen = useCallback((expanded) => {
    setMenuOpen(expanded);
    setSiteScrollable(!expanded);
  }, []);

  const onSetNavDrawerOpen = useCallback((expanded) => {
    if (expanded) {
      const posY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${posY}px`;
      document.body.style.width = "100vw";
      setScrollY(posY);
    }
    setNavDrawerOpen(expanded);
  }, []);

  const onSetShowNavDrawerButton = useCallback((show) => {
    setShowNavDrawerButton(show);
  }, []);

  const onSetSiteScrollable = useCallback((scrollable) => {
    setSiteScrollable(scrollable);
  }, []);

  /* useEffect - componentDidMount/componentWillUnmount. */
  /* Listeners - media queries. */
  useEffect(() => {
    const bpFrom840 = window.matchMedia(mediaQueryFrom840);
    bpFrom840.addEventListener("change", () =>
      onChangeBreakpoint(bpFrom840, () => onSetNavDrawerOpen(false))
    );

    const bpFrom1024 = window.matchMedia(mediaQueryFrom1024);
    bpFrom1024.addEventListener("change", () =>
      onChangeBreakpoint(bpFrom1024, () => onSetMenuOpen(false))
    );

    return () => {
      bpFrom840.removeEventListener("change", () =>
        onChangeBreakpoint(bpFrom840, () => onSetNavDrawerOpen(false))
      );
      bpFrom1024.removeEventListener("change", () =>
        onChangeBreakpoint(bpFrom1024, () => onSetMenuOpen(false))
      );
    };
  }, [onChangeBreakpoint, onSetMenuOpen, onSetNavDrawerOpen]);

  /* useEffect - componentDidUpdate - navDrawerOpen. */
  useEffect(() => {
    if (!navDrawerOpen) {
      document.body.style = null;
      window.scroll(0, scrollY);
    }
  }, [navDrawerOpen, scrollY]);

  return (
    <ContextAnVILPortal.Provider
      value={{
        menuOpen,
        navDrawerOpen,
        showNavDrawerButton,
        onSetMenuOpen,
        onSetNavDrawerOpen,
        onSetShowNavDrawerButton,
        onSetSiteScrollable,
        siteScrollable,
      }}
    >
      {children}
    </ContextAnVILPortal.Provider>
  );
}

export default ProviderAnVILPortal;
