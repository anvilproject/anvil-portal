/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - headline component. Displays page title and tabs.
 */

// Core dependencies
import React from "react";

// App dependencies
import NavDrawerButton from "../nav/nav-drawer-button/nav-drawer-button";
import Tabs from "../tabs/tabs";
import { ITab } from "../tabs/tab/tab";
import Title from "../title/title";

// Styles
import compStyles from "./headline.module.css";

interface HeadlineProps {
  tabs: ITab[];
  title: string;
}

function Headline(props: HeadlineProps): JSX.Element {
  const { tabs, title } = props;

  return (
    <div className={compStyles.headline}>
      <Title title={title} />
      <Tabs tabs={tabs} />
      <NavDrawerButton />
    </div>
  );
}

export default Headline;
