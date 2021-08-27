/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - breadcrumb component.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// App dependencies
import Icon from "../icon/icon";
import * as TabService from "../../utils/tab.service";

// Styles
import compStyles from "./breadcrumb.module.css";

interface IBreadcrumb {
  link: string;
  name: string;
}

interface BreadcrumbProps {
  breadcrumb: IBreadcrumb;
}

function Breadcrumb(props: BreadcrumbProps): JSX.Element | null {
  const { breadcrumb } = props;
  const { link } = breadcrumb;
  const { name } = breadcrumb || "Back";

  return link ? (
    <Link
      className={compStyles.breadcrumb}
      to={link}
      state={{
        scrollX: TabService.getTabsScrollLeftForActiveTab(),
      }}
    >
      <Icon breadcrumb fontSize={20} showIcon>
        arrow_back
      </Icon>
      <span className={compStyles.breadcrumbLabel}>{name}</span>
    </Link>
  ) : null;
}

export default Breadcrumb;
