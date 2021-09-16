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
import * as compStyles from "./site-search-partners.module.css";

function SiteSearchPartners(): JSX.Element | null {
  const { onSelectSiteSearchPartner, partners } = useContext(ContextSiteSearch);
  const showParters = partners.length > 1;
  return showParters ? (
    <ul className={compStyles.partners}>
      {partners.map((partner) => (
        <SiteSearchPartner
          key={partner.label}
          onSelectSiteSearchPartner={onSelectSiteSearchPartner}
          partner={partner}
        />
      ))}
    </ul>
  ) : null;
}

export default SiteSearchPartners;
