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
import { SelectionControl } from "../../dashboard/dashboard-search-facet/dashboard-search-facet";
import DashboardSearchFacetCheckboxSelect from "../../dashboard/dashboard-search-facet-checkbox-select/dashboard-search-facet-checkbox-select";
import DashboardSearchFacetToggleSelect from "../../dashboard/dashboard-search-facet-toggle-select/dashboard-search-facet-toggle-select";
import DashboardSearchPanel from "../../dashboard/dashboard-search-panel/dashboard-search-panel";
import DashboardSearchSelectedToolbar from "../../dashboard/dashboard-search-selected-toolbar/dashboard-search-selected-toolbar";
import DashboardSearchSummary from "../../dashboard/dashboard-search-summary/dashboard-search-summary";
import Modal from "../modal";
import ModalClose from "../modal-close/modal-close";
import ModalDrawer from "../modal-drawer/modal-drawer";
import FacetSelectionControl from "../../../utils/dashboard/facet-selection-control.model";
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
  const DashboardSearchFacetSelectPanel =
    FacetSelectionControl[facetName] === SelectionControl.TOGGLE
      ? DashboardSearchFacetToggleSelect
      : DashboardSearchFacetCheckboxSelect;

  return (
    <Modal onClose={onCloseDrawer}>
      <ModalDrawer>
        <ModalClose onClose={onCloseDrawer} />
        <h1>{FacetSelectorNameDisplay[facetName]}</h1>
        <div className={compStyles.facetSnapshot}>
          <DashboardSearchSummary />
          <DashboardSearchSelectedToolbar />
          <DashboardSearchPanel spanGrid>
            <DashboardSearchFacetSelectPanel facet={facetName} terms={terms} />
          </DashboardSearchPanel>
        </div>
      </ModalDrawer>
    </Modal>
  );
}

export default ModalDashboardFacetTermSelector;
