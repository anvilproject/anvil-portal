/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search partner component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// App dependencies
import Button from "../../button/button";
import { Partner } from "../common/entities";
import { onSelectSiteSearchPartner } from "../common/utils";

// Styles
import * as compStyles from "./site-search-partner.module.css";

type UpdateSelectedPartnerFn = (selectedPartner: string) => void;

interface Props {
  partner: Partner;
  searchPath: string;
  searchTerm: string;
  selectedPartner: string;
  updateSelectedPartnerFn: UpdateSelectedPartnerFn;
}

function SiteSearchPartner({
  partner,
  searchPath,
  searchTerm,
  selectedPartner,
  updateSelectedPartnerFn,
}: Props): JSX.Element {
  const { label, value } = partner;
  const classNamesPartner = classNames(
    { [compStyles.active]: selectedPartner === value },
    compStyles.partner
  );

  const updateSiteSearchPartner = (
    searchStr: string,
    searchPathname: string,
    searchPartner: string
  ) => {
    updateSelectedPartnerFn(searchPartner);
    onSelectSiteSearchPartner(searchStr, searchPathname, searchPartner);
  };

  return (
    <li className={classNamesPartner}>
      <Button
        clickAction={() =>
          updateSiteSearchPartner(searchTerm, searchPath, value)
        }
      >
        {label}
      </Button>
    </li>
  );
}

export default SiteSearchPartner;
