/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header branding component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./header-branding.module.css";

interface HeaderBrandingProps {
  ncpi: boolean;
}

function HeaderBranding(props: HeaderBrandingProps): JSX.Element {
  const { ncpi } = props;
  const branding = ncpi ? (
    <>
      <span>NIH Cloud Platform</span>
      <span>Interoperability Effort</span>
    </>
  ) : (
    <>
      <span>NHGRI Analysis Visualization</span>
      <span>and Informatics Lab-space</span>
    </>
  );

  return <div className={compStyles.branding}>{branding}</div>;
}

export default HeaderBranding;
