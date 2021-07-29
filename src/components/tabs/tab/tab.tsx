/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL tab component.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// Styles
import compStyles from "./tab.module.css";

const classNames = require("classnames");

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

  return (
    <Link
      className={classNames({ [compStyles.active]: active }, compStyles.tab)}
      to={path}
    >
      {name}
    </Link>
  );
}

export default Tab;
