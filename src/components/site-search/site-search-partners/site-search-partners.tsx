/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search partners component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextSiteSearch from "../context-site-search/context-site-search";
import SiteSearchPartner from "../site-search-partner/site-search-partner";

// Styles
import compStyles from "./site-search-partners.module.css";

function SiteSearchPartners(): JSX.Element {
  const { onSelectSiteSearchPartner, partners } = useContext(ContextSiteSearch);
  return (
    <ul className={compStyles.partners}>
      {partners.map((partner) => (
        <SiteSearchPartner
          key={partner.label}
          onSelectSiteSearchPartner={onSelectSiteSearchPartner}
          partner={partner}
        />
      ))}
    </ul>
  );
}

export default SiteSearchPartners;
