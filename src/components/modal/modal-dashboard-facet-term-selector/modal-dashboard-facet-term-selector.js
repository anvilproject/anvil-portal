/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL modal dashboard facet term selector component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextModal from "../context-modal/context-modal";
import ContextDashboard from "../../dashboard/context-dashboard/context-dashboard";
import DashboardSearchCheckbox from "../../dashboard/dashboard-search-checkbox/dashboard-search-checkbox";
import DashboardSearchPanel from "../../dashboard/dashboard-search-panel/dashboard-search-panel";
import DashboardSearchSelectedToolbar from "../../dashboard/dashboard-search-selected-toolbar/dashboard-search-selected-toolbar";
import DashboardSearchSummary from "../../dashboard/dashboard-search-summary/dashboard-search-summary";
import Modal from "../modal";
import ModalClose from "../modal-close/modal-close";
import ModalDrawer from "../modal-drawer/modal-drawer";
import { FacetSelectorNameDisplay } from "../../../utils/dashboard/facet-selector-name-display.model";

// Styles
import * as compStyles from "./modal-dashboard-facet-term-selector.module.css";

function ModalDashboardFacetTermSelector() {
  const { facets } = useContext(ContextDashboard);
  const { modal, onCloseDrawer } = useContext(ContextModal);
  const { modalProps } = modal,
    { facetName } = modalProps || {};
  const facet = facets.find((facet) => facet.name === facetName);
  const terms = facet?.terms;

  return (
    <Modal onClose={onCloseDrawer}>
      <ModalDrawer>
        <ModalClose onClose={onCloseDrawer} />
        <h1>{FacetSelectorNameDisplay[facetName]}</h1>
        <div className={compStyles.facetSnapshot}>
          <DashboardSearchSummary />
          <DashboardSearchSelectedToolbar />
          <DashboardSearchPanel spanGrid>
            {terms &&
              terms.map((term, t) => (
                <DashboardSearchCheckbox
                  key={t}
                  facet={facetName}
                  term={term}
                />
              ))}
          </DashboardSearchPanel>
        </div>
      </ModalDrawer>
    </Modal>
  );
}

export default ModalDashboardFacetTermSelector;
