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
  const [breakpoint, setBreakpoint] = useState({
    bp720: false,
    bp1280: false,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [showNavMenuButton, setShowNavMenuButton] = useState(false);
  const [siteScrollable, setSiteScrollable] = useState(true);
  const mediaQueryFrom720 = "(min-width: 720px)";
  const mediaQueryFrom1280 = "(min-width: 1280px)";

  const onSetMenuOpen = useCallback((expanded) => {
    setMenuOpen(expanded);
    setSiteScrollable(!expanded);
  }, []);

  const onSetNavMenuOpen = useCallback((expanded) => {
    setNavMenuOpen(expanded);
    setSiteScrollable(!expanded);
  }, []);

  const onSetShowNavMenuButton = useCallback((show) => {
    setShowNavMenuButton(show);
  }, []);

  const onSetSiteScrollable = useCallback((scrollable) => {
    setSiteScrollable(scrollable);
  }, []);

  const onBreakpoint720 = useCallback(
    (mediaQuery) => {
      /* Set 720 breakpoint. */
      setBreakpoint((breakpoint) => ({
        ...breakpoint,
        bp720: mediaQuery.matches,
      }));

      if (mediaQuery.matches) {
        /* Close menu. */
        onSetMenuOpen(false);
      }
    },
    [onSetMenuOpen]
  );

  const onBreakpoint1280 = useCallback((mediaQuery) => {
    setBreakpoint((breakpoint) => ({
      ...breakpoint,
      bp1280: mediaQuery.matches,
    }));
  }, []);

  /* useEffect - componentDidMount/componentWillUnmount. */
  /* Listeners - media queries. */
  useEffect(() => {
    const bpointFrom720 = window.matchMedia(mediaQueryFrom720);
    bpointFrom720.addListener(onBreakpoint720);
    onBreakpoint720(bpointFrom720);

    const bpointFrom1280 = window.matchMedia(mediaQueryFrom1280);
    bpointFrom1280.addListener(onBreakpoint1280);
    onBreakpoint1280(bpointFrom1280);

    return () => {
      bpointFrom720.removeListener(onBreakpoint720);
      bpointFrom1280.removeListener(onBreakpoint1280);
    };
  }, [onBreakpoint1280, onBreakpoint720]);

  return (
    <ContextAnVILPortal.Provider
      value={{
        breakpoint,
        menuOpen,
        navMenuOpen,
        showNavMenuButton,
        onSetMenuOpen,
        onSetNavMenuOpen,
        onSetShowNavMenuButton,
        onSetSiteScrollable,
        siteScrollable,
      }}
    >
      {children}
    </ContextAnVILPortal.Provider>
  );
}

export default ProviderAnVILPortal;
