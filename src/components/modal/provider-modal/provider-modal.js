/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL modal provider component.
 */

// Core dependencies
import React, { useCallback, useContext, useState } from "react";

// App dependencies
import ContextAnVILPortal from "../../context-anvil-portal/context-anvil-portal";
import ContextModal from "../context-modal/context-modal";

function ProviderModal(props) {
  const { children } = props;
  const { onSetSiteScrollable } = useContext(ContextAnVILPortal);
  const [modal, setModal] = useState({
    modalProps: {},
    showDrawer: false,
    showModal: false
  });

  const onCloseDrawer = useCallback(() => {
    /* Close modal drawer before the modal is removed from portal. */
    /* Required for animation of modal drawer closing. */
    setModal(modal => ({ ...modal, showDrawer: false }));
  }, []);

  const onCloseModal = useCallback(() => {
    /* Close modal. Modal is removed from portal. */
    onSetSiteScrollable(true);
    setModal(modal => ({ ...modal, modalProps: {}, showModal: false }));
  }, [onSetSiteScrollable]);

  const onOpenModal = useCallback(
    mProps => {
      /* Set state. */
      setModal(modal => ({
        ...modal,
        modalProps: mProps,
        showDrawer: true,
        showModal: true
      }));
      onSetSiteScrollable(false);
    },
    [onSetSiteScrollable]
  );

  return (
    <ContextModal.Provider
      value={{ modal, onCloseDrawer, onCloseModal, onOpenModal }}
    >
      {children}
    </ContextModal.Provider>
  );
}

export default ProviderModal;
