/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search partners component.
 */

// Core dependencies
import React, { useState } from "react";

// App dependencies
import { Partner } from "../common/entities";
import SiteSearchPartner from "../site-search-partner/site-search-partner";

// Styles
import * as compStyles from "./site-search-partners.module.css";

interface Props {
  partners: Partner[];
  searchPath: string;
  searchTerm: string;
  selectedPartner: string;
}

function SiteSearchPartners({
  partners,
  searchPath,
  searchTerm,
  selectedPartner: activePartner,
}: Props): JSX.Element | null {
  const [selectedPartner, setSelectedPartner] = useState<string>(activePartner);

  /**
   * Update state selected partner.
   * @param partner - New selected partner.
   */
  const updateSelectedPartner = (partner: string) => {
    setSelectedPartner(partner);
  };

  return partners.length > 1 ? (
    <ul className={compStyles.partners}>
      {partners.map((partner) => (
        <SiteSearchPartner
          key={partner.label}
          partner={partner}
          searchPath={searchPath}
          searchTerm={searchTerm}
          selectedPartner={selectedPartner}
          updateSelectedPartnerFn={updateSelectedPartner}
        />
      ))}
    </ul>
  ) : null;
}

export default SiteSearchPartners;
