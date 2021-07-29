/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic service supporting gatsby-node createPages API.
 * Builds the post's navigation.
 */

// Template variables
const componentPath = "src/templates/content-template.js";
const nodePath = require("path");

/**
 * Returns a map object key-value pair of document slug and corresponding title.
 *
 * @param allMarkdownRemark
 * @param setOfSiteSlugs
 * @returns {*}
 */
const buildDocumentTitleBySlug = function buildDocumentTitleBySlug(
  allMarkdownRemark,
  setOfSiteSlugs
) {
  /* Build for each valid site document, a relationship between document title and slug. */
  return allMarkdownRemark.edges
    .map((n) => n.node)
    .reduce((acc, markdown) => {
      const { fields, frontmatter } = markdown,
        { slug } = fields,
        { title } = frontmatter;

      if (setOfSiteSlugs.has(slug)) {
        acc.set(slug, title);
      }

      return acc;
    }, new Map());
};

/**
 * Returns an object built from the site map grouped by menuItem comprising of tabs, navigation and post path and post slug
 * i.e. corresponding markdown file path.
 *
 * @param nodes
 * @returns {*}
 */
const buildMenuItems = function buildMenuItems(nodes) {
  /* Build the menu items. */
  return nodes.reduce((acc, node) => {
    /* Build the menu. */
    const mItem = buildMenuItem(node);

    /* Only add the menu item if it has tabs, and nav items. */
    if (mItem) {
      acc.push(mItem);
    }

    return acc;
  }, []);
};

/**
 * Returns a map object key-value pair of menuItem and corresponding set of navItems (in order of navigational appearance).
 * Builds next and previous article links in order of appearance in the site map.
 *
 * @param menuItems
 */
const buildSetOfNavItemsByMenuItem = function buildSetOfNavItemsByMenuItem(
  menuItems
) {
  return menuItems.reduce((acc, menuItem) => {
    const { pageTitle, tabs } = menuItem || {};
    const setOfNavItems = new Set();

    tabs.forEach((tab) => {
      const { navItems } = tab;
      buildSetOfNavItems(navItems, setOfNavItems);
    });

    acc.set(pageTitle, setOfNavItems);

    return acc;
  }, new Map());
};

/**
 * Returns a set of all site document files (slugs) to be included in the site.
 * These are markdown documents, included in the site map.
 *
 * @param menuItems
 * @returns {*}
 */
const buildSetOfSiteSlugs = function buildSetOfSiteSlugs(menuItems) {
  /* Grab the set of site slugs from the site map. */
  return menuItems.reduce((acc, menuItem) => {
    const { tabs } = menuItem || {};

    tabs.forEach((tab) => {
      const { navItems } = tab;

      /* Add all navItems. */
      addSetOfSiteSlugs(navItems, acc);
    });

    return acc;
  }, new Set());
};

/**
 * Returns the navigations for the specified post.
 *
 * @param slug
 * @param menuItems
 * @param setOfNavItemsByMenuItem
 * @param documentTitleBySlug
 * @returns {*}
 */
const buildSlugNavigations = function buildSlugNavigations(
  slug,
  menuItems,
  setOfNavItemsByMenuItem,
  documentTitleBySlug
) {
  /* Default - slug as path, initialize navigations. */
  const postNavigations = {
    menuPath: "",
    navItems: [],
    path: slug,
    tabPath: "",
    tabs: [],
    title: "",
  };

  return buildPostNavigations(
    slug,
    menuItems,
    setOfNavItemsByMenuItem,
    postNavigations,
    documentTitleBySlug
  );
};

/**
 * Returns the slug's template component path.
 *
 * @returns {string}
 */
const getSlugComponent = function getSlugComponent() {
  return nodePath.resolve(componentPath);
};

/**
 * Returns true, if the post exists on the site map.
 *
 * @param slug
 * @param setOfNavItemSlugs
 * @returns {boolean}
 */
const isShouldCreatePage = function isShouldCreatePage(
  slug,
  setOfNavItemSlugs
) {
  return setOfNavItemSlugs.has(slug);
};

/**
 * Returns the set of site document files (slugs), built from all navItems and any nested items.
 *
 * @param nItems
 * @param acc
 * @returns {*}
 */
function addSetOfSiteSlugs(nItems, acc) {
  nItems.forEach((nItem) => {
    const { file, path, navItems } = nItem;

    if (file && path) {
      acc.add(file);
    }

    /* Add any nested navItems. */
    if (navItems) {
      addSetOfSiteSlugs(navItems, acc);
    }
  });

  return acc;
}

/**
 * Builds a path partial from the file's final path.
 *
 * @param file
 * @returns {*}
 */
function buildFilePartial(file) {
  if (file) {
    const filePartial = file.split("/").pop();

    return `/${filePartial}`;
  }

  return "";
}

/**
 * Returns a list of slugs (documents) belonging to the navigationItem.
 *
 * @param navigationItems
 * @param slugs
 */
function buildListOfSlugs(navigationItems, slugs = []) {
  return navigationItems.reduce((acc, navigationItem) => {
    if (navigationItem.file) {
      acc.push(navigationItem.file);
    }

    if (navigationItem.navigationItems) {
      buildListOfSlugs(navigationItem.navigationItems, acc);
    }

    return acc;
  }, slugs);
}

/**
 * Returns the menuItem with its tabs and navItems and their corresponding paths.
 *
 * @param node
 * @returns {*}
 */
function buildMenuItem(node) {
  /* Grab the menuItem's title, partial path and tabs. */
  const { menuItem, pageTitle, pathPartial, tabs } = node || {};

  /* The partial paths will be used to build a full path for each post. */
  const pathPartials = Array.of(pathPartial);

  /* Build page tabs. */
  const pageTabs = buildPageTabs(tabs, pathPartials);

  if (pageTabs && pageTabs.length > 0) {
    return {
      key: menuItem,
      pageTitle: pageTitle,
      path: pathPartial,
      tabs: pageTabs,
    };
  }

  return null;
}

/**
 * Builds the navigation items for the tab.
 *
 * @param navItems
 * @param pathPartials
 */
function buildNavItems(navItems, pathPartials) {
  return navItems.reduce((acc, navItem) => {
    const { draft, file, name, navigationItems, pathPartial } = navItem || {};

    /* Add the nav item if it isn't in draft mode. */
    /* Or, allow the nav item if the environment is LOCAL - all draft documents are available in this environment. */
    if (!draft || isEnvironmentLocal()) {
      /* Clone the path partials for the navigation item. */
      const partials = Array.from(pathPartials);

      /* Build the path. */
      const path = buildPath(navItem, partials);

      /* Build the nav items. */
      const items = {
        file: file,
        name: name,
        path: path,
      };

      /* Build any nested navigationItems. */
      if (navigationItems) {
        /* Grab any pathPartials on the current navigation item. */
        partials.push(pathPartial);

        /* Grab any nested slugs (files) on the current navigation item. */
        const slugs = buildListOfSlugs(navigationItems);

        Object.assign(items, {
          navItems: buildNavItems(navigationItems, partials),
          slugs: slugs,
        });
      }

      acc.push(items);
    }

    return acc;
  }, []);
}

/**
 * Returns the tabs for the menuItem.
 *
 * @param tabs
 * @param pathPartials
 */
function buildPageTabs(tabs, pathPartials) {
  if (tabs && tabs.length > 0) {
    return tabs.reduce((acc, tab) => {
      /* Grab the tab fields. */
      const { name, navigationItems, pathPartial } = tab;

      /* Initialize tab. */
      /* Set active field to false for now. */
      const pageTab = { active: false, name: name, path: "" };

      /* Clone the path partials for the tab. */
      const partials = Array.from(pathPartials);

      /* Push tab partial on to page partial. */
      partials.push(pathPartial);

      /* Build navigationItems for the tab. */
      const navItems = buildNavItems(navigationItems, partials);

      /* Only add the tab if there are nav items. */
      if (navItems && navItems.length > 0) {
        Object.assign(pageTab, { navItems: navItems });

        /* Build the tab path from the first available navItem. */
        if (name) {
          /* Grab the tab path. */
          const path = getTabPath(navItems);
          Object.assign(pageTab, { path: path });
        }

        acc.push(pageTab);
      }

      return acc;
    }, []);
  }

  return [];
}

/**
 * Returns the post's path.
 *
 * @param navItem
 * @param pathPartials
 * @returns {string}
 */
function buildPath(navItem, pathPartials) {
  const { file, pathOverride, pathPartial } = navItem || {};

  /* Early exit - no path. */
  /* Used by nav item toggle button. */
  if (!file) {
    return "";
  }

  /* Early exit - use pathOverride. */
  if (pathOverride) {
    return pathOverride;
  }

  /* Grab the final partial from the file. */
  const filePartial = buildFilePartial(file);

  /* Use the filePartial if there is no pathPartial. */
  const partial = pathPartial || filePartial;

  /* Push navigation path partial on to page partial. */
  pathPartials.push(partial);

  /* Return path as a string. */
  return pathPartials.join("");
}

/**
 * Returns the post navigations for the specified slug.
 *
 * @param slug
 * @param menuItems
 * @param setOfNavItemsByMenuItem
 * @param postNavigations
 * @param documentTitleBySlug
 * @returns {*}
 */
function buildPostNavigations(
  slug,
  menuItems,
  setOfNavItemsByMenuItem,
  postNavigations,
  documentTitleBySlug
) {
  /* For each menuItem. */
  for (const [, menuItem] of menuItems.entries()) {
    /* For every tab. */
    for (const [t, tab] of menuItem.tabs.entries()) {
      const { navItems } = tab;

      Object.assign(
        postNavigations,
        findPostNavigations(
          slug,
          menuItem,
          tab,
          t,
          navItems,
          setOfNavItemsByMenuItem,
          documentTitleBySlug
        )
      );
    }
  }

  return postNavigations;
}

/**
 * Builds the post's navigations (navItems, path, tabs, title) for the specified slug.
 *
 * @param menuItem
 * @param navItems
 * @param navItem
 * @param t
 * @param setOfNavItemsByMenuItem
 * @param documentTitleBySlug
 * @returns {{navItemNext: *, navItemPrevious: *, navItems, path: *, tabs: *, title: *}}
 */
function buildPostNavs(
  menuItem,
  navItems,
  navItem,
  t,
  setOfNavItemsByMenuItem,
  documentTitleBySlug
) {
  const { pageTitle, tabs } = menuItem;
  const { path } = navItem;

  const postTabs = getPostTabs(tabs, t);
  const postTabPath = postTabs.find((tab) => tab.active)?.path || "";
  const postNavItems = getPostNavItems(navItems);
  const [navItemNext, navItemPrev] = getPostNavItemNextPrevious(
    pageTitle,
    path,
    setOfNavItemsByMenuItem,
    documentTitleBySlug
  );

  return {
    menuPath: menuItem.path,
    navItemNext: navItemNext,
    navItemPrevious: navItemPrev,
    navItems: postNavItems,
    path: path,
    tabPath: postTabPath,
    tabs: postTabs,
    title: pageTitle,
  };
}

/**
 * Returns the complete set of navItems for each menuItem.
 *
 * @param nItems
 * @param setOfNavItems
 * @returns {Set}
 */
function buildSetOfNavItems(nItems, setOfNavItems) {
  nItems.forEach((nItem) => {
    const { name, path } = nItem || {};

    if (path) {
      setOfNavItems.add({ file: nItem.file, name: name, path: path });
    }

    if (nItem.navItems) {
      buildSetOfNavItems(nItem.navItems, setOfNavItems);
    }
  });

  return setOfNavItems;
}

/**
 * Finds the post's navigations for the specified slug.
 *
 * @param slug
 * @param menuItem
 * @param tab
 * @param t
 * @param nItems
 * @param setOfNavItemsByMenuItem
 * @param documentTitleBySlug
 * @returns {{}}
 */
function findPostNavigations(
  slug,
  menuItem,
  tab,
  t,
  nItems,
  setOfNavItemsByMenuItem,
  documentTitleBySlug
) {
  const postNavigations = {};

  for (const [, navItem] of nItems.entries()) {
    /* Update post navigations with corresponding navigations. */
    if (navItem.file === slug) {
      Object.assign(
        postNavigations,
        buildPostNavs(
          menuItem,
          tab.navItems,
          navItem,
          t,
          setOfNavItemsByMenuItem,
          documentTitleBySlug
        )
      );
    }

    /* Investigate nested navItems to find any slug matches and update the post navigations accordingly. */
    if (navItem.navItems) {
      Object.assign(
        postNavigations,
        findPostNavigations(
          slug,
          menuItem,
          tab,
          t,
          navItem.navItems,
          setOfNavItemsByMenuItem,
          documentTitleBySlug
        )
      );
    }
  }

  return postNavigations;
}

/**
 * Returns an array of next and previous navItem for the post.
 *
 * @param pageTitle
 * @param path
 * @param setOfNavItemsByMenuItem
 * @param documentTitleBySlug
 * @returns {Array}
 */
function getPostNavItemNextPrevious(
  pageTitle,
  path,
  setOfNavItemsByMenuItem,
  documentTitleBySlug
) {
  /* Grab the set of navItems for the specified menuItem. */
  /* Find the index of the navItem within the set. */
  const setOfNavItems = setOfNavItemsByMenuItem.get(pageTitle);
  const navItems = [...setOfNavItems];
  const indexOfNavItem = navItems.findIndex((nItem) => nItem.path === path);

  /* Initialize navItemNext/Prev. */
  let navItemNext = null;
  let navItemPrev = null;

  /* Update next/prev navItems from the set of navItems. */
  if (indexOfNavItem >= 0) {
    navItemNext = navItems[indexOfNavItem + 1] || null;
    navItemPrev = navItems[indexOfNavItem - 1] || null;

    /* Update navItemNext with a title from document frontmatter, if navItem "name" is undefined. */
    if (navItemNext) {
      Object.assign(
        navItemNext,
        getPostNextPreviousName(navItemNext, documentTitleBySlug)
      );
    }

    /* Update navItemPrev with a title from document frontmatter, if navItem "name" is undefined. */
    if (navItemPrev) {
      Object.assign(
        navItemPrev,
        getPostNextPreviousName(navItemPrev, documentTitleBySlug)
      );
    }
  }

  return Array.of(navItemNext, navItemPrev);
}

/**
 * Returns the navItems for the post - removing any unnamed first-level navItems.
 *
 * @param navItems
 */
function getPostNavItems(navItems) {
  /* Return navItems - remove any unnamed nav items. */
  return navItems.reduce((acc, navItem) => {
    const { name } = navItem || {};

    if (name) {
      acc.push(navItem);
    }

    return acc;
  }, []);
}

/**
 * Updates post nav item next/previous with a title from the document's frontmatter "title"
 * if the corresponding navItem has an undefined "name" value.
 * Ensures the nav next/previous button has a display value.
 *
 * @param navItem
 * @param documentTitleBySlug
 * @returns {*}
 */
function getPostNextPreviousName(navItem, documentTitleBySlug) {
  const { name, file } = navItem || {};

  if (!name) {
    const navDisplayName = documentTitleBySlug.get(file) || "";

    if (!navDisplayName) {
      /* Error message. */
      /* Document requires frontmatter "title" for display of nav item next/previous. */
      console.log(
        `*** *** Error. Document ${file} requires a "title" in the frontmatter.`
      );
    }

    return { name: navDisplayName };
  }

  return {};
}

/**
 * Returns the tabs for the post - removing any unnamed tabs.
 * Updates the post's tab to active.
 *
 * @param tabs
 * @param t
 * @returns {*}
 */
function getPostTabs(tabs, t) {
  /* Update tab with active state. */
  const tabsClone = [...tabs];
  tabsClone[t] = Object.assign({ ...tabsClone[t] }, { active: true });

  /* Return tabs - remove any unnamed tabs. */
  return tabsClone.reduce((acc, tab) => {
    const { name } = tab || {};

    if (name) {
      acc.push(tab);
    }

    return acc;
  }, []);
}

/**
 * Returns the path for the specified tab.
 *
 * @param navigationItems
 * @returns {string}
 */
function getTabPath(navigationItems) {
  if (navigationItems && navigationItems.length > 0) {
    /* Locate the first navigation item partial path or override path. */
    const [firstNavItem] = navigationItems;
    const { file, navItems, path } = firstNavItem || {};

    /* Return the path, if a file exists. */
    if (file && path) {
      return path;
    }

    /* Find the next available file. */
    return getTabPath(navItems);
  }

  return "";
}

/**
 * Returns true if the current environment is local.
 *
 * @returns {boolean}
 */
function isEnvironmentLocal() {
  return process.env.GATSBY_ENV === "LOCAL";
}

module.exports.buildDocumentTitleBySlug = buildDocumentTitleBySlug;
module.exports.buildMenuItems = buildMenuItems;
module.exports.buildSetOfNavItemsByMenuItem = buildSetOfNavItemsByMenuItem;
module.exports.buildSetOfSiteSlugs = buildSetOfSiteSlugs;
module.exports.buildSlugNavigations = buildSlugNavigations;
module.exports.getSlugComponent = getSlugComponent;
module.exports.isShouldCreatePage = isShouldCreatePage;
