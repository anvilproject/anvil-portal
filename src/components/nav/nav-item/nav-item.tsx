/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav item component.
 */

// Core dependencies
import { navigate } from "gatsby";
import React, { useCallback, useEffect, useState } from "react";

// App dependencies
import NavArrow from "../nav-arrow/nav-arrow";
import { INavItem } from "../../navigation/navigation";
import * as OutlineService from "../../../utils/outline.service";
import * as TabService from "../../../utils/tab.service";

// Styles
import compStyles from "./nav-item.module.css";

const classNames = require("classnames");

interface NavItemProps {
  docPath: string;
  navItem: INavItem;
}

function NavItem(props: NavItemProps): JSX.Element {
  const { docPath, navItem } = props;
  const { file, name, navItems, path, slugs } = navItem || {};
  const [itemActive] = useState(docPath === file);
  const [itemButton] = useState(!file);
  const [itemOpen, setItemOpen] = useState(false);
  const openNav = slugs?.includes(docPath) || false;
  const showArrow = (navItems && navItems.length > 0) || false;
  const showNestedLinks = navItems && itemOpen;
  const item = OutlineService.getOutlineItem(name, compStyles.ordered);

  const classNamesItem = classNames(
    { [compStyles.active]: itemActive },
    { [compStyles.button]: itemButton }
  );

  const initializeNavItem = useCallback(() => {
    setItemOpen(openNav);
  }, [openNav]);

  const onHandleClick = () => {
    if (navItems) {
      setItemOpen(!itemOpen);
    } else {
      navigate(path, {
        state: { scrollX: TabService.getTabsScrollLeftForActiveTab() },
      });
    }
  };

  useEffect(() => {
    initializeNavItem();
  }, [initializeNavItem]);

  return (
    <li className={compStyles.navItem}>
      <span
        className={classNamesItem}
        role="presentation"
        onClick={() => onHandleClick()}
      >
        <NavArrow rotate={itemOpen} showArrow={showArrow} />
        <span>{item}</span>
      </span>
      {showNestedLinks ? (
        <ul>
          {navItems &&
            navItems.map((nestedItem) => (
              <NavItem
                key={nestedItem.name}
                docPath={docPath}
                navItem={nestedItem}
              />
            ))}
        </ul>
      ) : null}
    </li>
  );
}

export default NavItem;
