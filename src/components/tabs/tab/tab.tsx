/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL tab component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import { navigate } from "gatsby";
import React, { MouseEvent } from "react";

// App dependencies
import * as TabService from "../../../utils/tab.service";

// Styles
import * as compStyles from "./tab.module.css";

export interface ITab {
  active: boolean;
  name: string;
  path: string;
}

interface TabProps {
  tab: ITab;
}

function Tab(props: TabProps): JSX.Element {
  const { tab } = props;
  const { active, name, path } = tab || {};

  const onSelectTab = (mouseEvent: MouseEvent<HTMLSpanElement>): void => {
    /* Grab <Tab> element. */
    const tabEl = mouseEvent.currentTarget;
    const scrollX = TabService.calculateTabsScrollLeft(tabEl);
    /* TODO review type. */
    navigate(path, { state: { scrollX } });
  };

  return (
    <span
      className={classNames({ [compStyles.active]: active }, compStyles.tab)}
      onClick={(mouseEvent) => onSelectTab(mouseEvent)}
      role="presentation"
    >
      {name}
    </span>
  );
}

export default Tab;
