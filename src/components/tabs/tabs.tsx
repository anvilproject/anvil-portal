/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL tabs component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Tab, { ITab } from "./tab/tab";

// Styles
import compStyles from "./tabs.module.css";

interface TabsProps {
  tabs: ITab[];
}

function Tabs(props: TabsProps): JSX.Element | null {
  const { tabs } = props;
  const showTabs = tabs && tabs.length > 0;

  return showTabs ? (
    <span className={compStyles.tabs}>
      {tabs.map((tab) => (
        <Tab key={tab.name} tab={tab} />
      ))}
    </span>
  ) : null;
}

export default Tabs;
