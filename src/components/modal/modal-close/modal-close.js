/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - modal close component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Button from "../../button/button";
import Icon from "../../icon/icon";

// Styles
import * as compStyles from "./modal-close.module.css";

function ModalClose(props) {
  const { onClose } = props;

  return (
    <div className={compStyles.modalClose}>
      <Button clickAction={() => onClose()} icon>
        <Icon showHover={true} showIcon={true}>
          close
        </Icon>
      </Button>
    </div>
  );
}

export default ModalClose;
