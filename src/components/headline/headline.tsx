/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - headline component. Displays page title and tabs.
 */

// Core dependencies
import React from "react";

// App dependencies
import NavMenuButton from "../nav/nav-menu-button/nav-menu-button";
import Tabs from "../tabs/tabs";
import { ITab } from "../tabs/tab/tab";
import Title from "../title/title";

// Styles
import compStyles from "./headline.module.css";
import globalStyles from "../../styles/global.module.css";

const classNames = require("classnames");

interface HeadlineProps {
  tabs: ITab[];
  title: string;
}

function Headline(props: HeadlineProps) {
  const { tabs, title } = props;

  return (
    <div className={classNames(globalStyles.container, compStyles.headline)}>
      <Title title={title} />
      <NavMenuButton />
      <Tabs tabs={tabs} />
    </div>
  );
}

export default Headline;
