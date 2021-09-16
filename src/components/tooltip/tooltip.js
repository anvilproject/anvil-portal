/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - tooltip component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

// App dependencies
import * as TooltipService from "../../utils/tooltip.service";

// Styles
import * as compStyles from "./tooltip.module.css";

function Tooltip(props) {
  const { children, label, multiline } = props;
  const refTooltip = useRef(null);
  const [portalEl, setPortalEl] = useState(null);
  const tooltipEl = (
    <div className={compStyles.tooltip} ref={refTooltip}>
      {label}
    </div>
  );

  const hideTooltip = () => {
    refTooltip.current.classList.remove(compStyles.show);
    refTooltip.current.removeAttribute("style");
  };

  const showTooltip = (e) => {
    const currentTarget = e.currentTarget;
    const tooltipPos = TooltipService.positionTooltip(
      currentTarget,
      refTooltip
    );
    const { x, y } = tooltipPos;

    refTooltip.current.setAttribute("style", `left: ${x}px; top: ${y}px;`);
    refTooltip.current.classList.add(compStyles.show);
  };

  useEffect(() => {
    const portal = document.getElementById("tooltip-root");
    setPortalEl(portal);
  }, []);

  return (
    <>
      {portalEl ? ReactDOM.createPortal(tooltipEl, portalEl) : null}
      <span
        className={classNames(
          { [compStyles.multiline]: multiline },
          compStyles.tt
        )}
        onBlur={() => hideTooltip()}
        onFocus={(e) => showTooltip(e)}
        onMouseOut={() => hideTooltip()}
        onMouseOver={(e) => showTooltip(e)}
        role="presentation"
      >
        {children}
      </span>
    </>
  );
}

export default Tooltip;
