/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic service supporting gatsby-node createPages API.
 * Builds the post's navigation.
 */

// Template variables
const allowListScoopMenuItems = ["events", "news"];
const componentPath = "src/templates/content-template.js";
const denyListScoopSlugs = ["/events/events", "/news/news"];
const nodePath = require("path");

/**
 * Returns an object built from the site map grouped by menuItem comprising of tabs, navigation and post path and post slug
 * i.e. corresponding markdown file path.
 *
 * @param siteMapYAML
 * @returns {*}
 */
const buildMenuItems = function buildMenuItems(siteMapYAML) {

    return siteMapYAML.edges
        .map(n => n.node)
        .reduce((acc, menuItem) => {

        /* Build the menu. */
        const mItem = buildMenuItem(menuItem);
        acc.push(mItem);

        return acc;
    }, []);
};

/**
 * Returns a map object key-value pair of menuItem and corresponding set of navItems (in order of navigational appearance).
 * Builds next and previous article links in order of appearance in the site map.
 *
 * @param menuItems
 * @param markdowns
 */
const buildSetOfNavItemsByMenuItem = function buildSetOfNavItemsByMenuItem(menuItems, markdowns) {

    return menuItems.reduce((acc, menuItem) => {

        const {pageTitle, path, tabs} = menuItem || {};
        const setOfNavItems = new Set();

        /* Build set of nav items for news or events menu item. */
        if ( isMenuItemScoop(pageTitle) ) {

            buildSetOfScoopNavItems(path, markdowns, setOfNavItems);
        }
        /* Build set of nav items for all other menu items. */
        else {

            tabs.forEach(tab => {

                const {navItems} = tab;

                buildSetOfNavItems(navItems, setOfNavItems);
            });
        }

        acc.set(pageTitle, setOfNavItems);
        return acc;
    }, new Map());
};

/**
 * Returns the navigations for the specified post.
 *
 * @param slug
 * @param menuItems
 * @param setOfNavItemsByMenuItem
 */
const buildSlugNavigations = function buildSlugNavigations(slug, menuItems, setOfNavItemsByMenuItem) {

    /* Default - slug as path, initialize navigations. */
    const postNavigations = {navItems: [], path: slug, tabs: [], title: ""};

    /* Handle special case for scoops (news or events not listed in the site map). */
    if ( isSlugScoop(slug) ) {

        return buildScoopNavigations(slug, menuItems, setOfNavItemsByMenuItem, postNavigations);
    }

    return buildPostNavigations(slug, menuItems, setOfNavItemsByMenuItem, postNavigations);
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
 * Builds a path partial from the file's final path.
 *
 * @param file
 * @returns {*}
 */
function buildFilePartial(file) {

    if ( file ) {

        const filePartial = file.split("/").pop();

        return `/${filePartial}`;
    }

    return "";
}

/**
 * Returns a list of slugs (file paths) belonging to the navigationItem.
 * @param navigationItems
 * @param slugs
 */
function buildListOfSlugs(navigationItems, slugs = []) {

    return navigationItems.reduce((acc, navigationItem) => {

        if ( navigationItem.file ) {

            acc.push(navigationItem.file);
        }

        if ( navigationItem.navigationItems ) {

            buildListOfSlugs(navigationItem.navigationItems, acc);
        }

        return acc;
    }, slugs);
}

/**
 * Returns the menuItem with its tabs and navItems and their corresponding paths.
 *
 * @param menuItem
 * @returns {{pageTitle, tabs}}
 */
function buildMenuItem(menuItem) {

    /* Grab the menuItem's title, partial path and tabs. */
    const {pageTitle, pathPartial, tabs} = menuItem || {};

    /* The partial paths will be used to build a full path for each post. */
    const pathPartials = Array.of(pathPartial);

    /* Build page tabs. */
    const pageTabs = buildPageTabs(tabs, pathPartials);

    return {
        pageTitle: pageTitle,
        path: pathPartial,
        tabs: pageTabs
    };
}

/**
 * Builds the navigation items for the tab.
 *
 * @param navItems
 * @param pathPartials
 */
function buildNavItems(navItems, pathPartials) {

    return navItems.map(navItem => {

        const {file, name, navigationItems, pathPartial} = navItem || {};

        /* Clone the path partials for the navigation item. */
        const partials = Array.from(pathPartials);

        /* Build the path. */
        const path = buildPath(navItem, partials);

        /* Build the nav items. */
        const items = {
            file: file,
            name: name,
            path: path
        };

        /* Build any nested navigationItems. */
        if ( navigationItems ) {

            /* Grab any pathPartials on the current navigation item. */
            partials.push(pathPartial);

            /* Grab any nested slugs (files) on the current navigation item. */
            const slugs = buildListOfSlugs(navigationItems);

            Object.assign(items, {navItems: buildNavItems(navigationItems, partials), slugs: slugs});
        }

        return items;
    });
}

/**
 * Returns the tabs for the menuItem.
 *
 * @param tabs
 * @param pathPartials
 */
function buildPageTabs(tabs, pathPartials) {

    if ( tabs && tabs.length > 0 ) {

        return tabs.map(tab => {

            /* Grab the tab fields. */
            const {name, navigationItems, pathPartial} = tab;

            /* Initialize tab. */
            /* Set active field to false for now. */
            const pageTab = {active: false, name: name, path: ""};

            /* Clone the path partials for the tab. */
            const partials = Array.from(pathPartials);

            /* Push tab partial on to page partial. */
            partials.push(pathPartial);

            /* Build navigationItems for the tab. */
            const navItems = buildNavItems(navigationItems, partials);
            Object.assign(pageTab, {navItems: navItems});

            /* Build the tab path from the first available navItem. */
            if ( name ) {

                /* Grab the tab path. */
                const path = getTabPath(navItems);
                Object.assign(pageTab, {path: path});
            }

            return pageTab;
        })
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

    const {file, pathOverride, pathPartial} = navItem || {};

    /* Early exit - no path. */
    if ( !file ) {

        return "";
    }

    /* Early exit - use pathOverride. */
    if ( pathOverride ) {

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
 * @returns {*}
 */
function buildPostNavigations(slug, menuItems, setOfNavItemsByMenuItem, postNavigations) {

    /* For each menuItem. */
    for ( const [, menuItem] of menuItems.entries() ) {

        /* For every tab. */
        for ( const [t, tab] of menuItem.tabs.entries() ) {

            const {navItems} = tab;

            Object.assign(postNavigations, findPostNavigations(slug, menuItem, tab, t, navItems, setOfNavItemsByMenuItem));
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
 * @returns {{navItemNext: *, navItemPrevious: *, navItems, path: *, tabs: *, title: *}}
 */
function buildPostNavs(menuItem, navItems, navItem, t, setOfNavItemsByMenuItem) {

    const {pageTitle, tabs} = menuItem;
    const {path} = navItem;

    const postTabs = getPostTabs(tabs, t);
    const postNavItems = getPostNavItems(navItems);
    const [navItemNext, navItemPrev] = getPostNavItemNextPrevious(pageTitle, path, setOfNavItemsByMenuItem);

    return {
        navItemNext: navItemNext,
        navItemPrevious: navItemPrev,
        navItems: postNavItems,
        path: path,
        tabs: postTabs,
        title: pageTitle
    };
}

/**
 * Returns the scoops navigations for the specified scoop.
 *
 * @param slug
 * @param menuItems
 * @param setOfNavItemsByMenuItem
 * @param postNavigations
 */
function buildScoopNavigations(slug, menuItems, setOfNavItemsByMenuItem, postNavigations) {

    /* Update any scoops with corresponding navigations. */
    if ( !denyListScoopSlugs.includes(slug) ) {

        const pageTitle = menuItems.find(menuItem => slug.startsWith(menuItem.path)).pageTitle;
        const [navItemNext, navItemPrev] = getPostNavItemNextPrevious(pageTitle, slug, setOfNavItemsByMenuItem);

        Object.assign(postNavigations, {navItemNext: navItemNext, navItemPrevious: navItemPrev, title: pageTitle});
    }

    return postNavigations;
}

/**
 * Returns the complete set of navItems for each menuItem.
 *
 * @param nItems
 * @param setOfNavItems
 * @returns {Set}
 */
function buildSetOfNavItems(nItems, setOfNavItems) {

    nItems.forEach(nItem => {

        const {name, path} = nItem || {};

        if ( name && path ) {

            setOfNavItems.add({name: name, path: path});
        }

        if ( nItem.navItems ) {

            buildSetOfNavItems(nItem.navItems, setOfNavItems);
        }
    });

    return setOfNavItems;
}

/**
 * Builds
 * @param path
 * @param markdowns
 * @param setOfNavItems
 * @returns {*}
 */
function buildSetOfScoopNavItems(path, markdowns, setOfNavItems) {

    /* Group the scoops by date, past scoops are order most recent to oldest and future scoops are ordered by upcoming dates. */
    const scoops = filterScoopsSortedByDate(markdowns, path);
    const scoopIndex = findFirstPastScoopIndex(scoops);
    const pastScoops = scoops.slice(scoopIndex);
    const futureScoops = scoops.slice(0, scoopIndex).reverse();
    const sortedScoops = futureScoops.concat(pastScoops);

    /* Add the scoops to the setOfNavItems. */
    sortedScoops.forEach(scoop => {

        const {fields, frontmatter} = scoop || {},
            {slug} = fields || {},
            {title} = frontmatter || {};

        setOfNavItems.add({name: title, path: slug});
    });

    return setOfNavItems;
}

/**
 * Returns the index of the first scoop after today's date.
 *
 * @param scoops
 * @returns number
 */
function findFirstPastScoopIndex(scoops) {

    const today = new Date();

    return scoops.findIndex(scoop => {

        const scoopDate = getScoopDate(scoop);

        return scoopDate < today;
    });
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
 * @returns {{}}
 */
function findPostNavigations(slug, menuItem, tab, t, nItems, setOfNavItemsByMenuItem) {

    const postNavigations = {};

    for ( const [, navItem] of nItems.entries() ) {

        /* Update post navigations with corresponding navigations. */
        if ( navItem.file === slug ) {

            Object.assign(postNavigations, buildPostNavs(menuItem, tab.navItems, navItem, t, setOfNavItemsByMenuItem));
        }

        /* Investigate nested navItems to find any slug matches and update the post navigations accordingly. */
        if ( navItem.navItems ) {

            Object.assign(postNavigations, findPostNavigations(slug, menuItem, tab, t, navItem.navItems, setOfNavItemsByMenuItem));
        }
    }

    return postNavigations;
}

/**
 * Returns scoops, sorted by date.
 *
 * @param markdowns
 * @param path
 * @returns {Array.<*>}
 */
function filterScoopsSortedByDate(markdowns, path) {

    return markdowns.edges
        .map(n => n.node)
        .filter(markdown => isMarkdownScoopValid(markdown, path))
        .sort(function(s0, s1) {

            const s0Date = getScoopDate(s0);
            const s1Date = getScoopDate(s1);

            return s1Date - s0Date;
        });
}

/**
 * Returns an array of next and previous navItem for the post.
 *
 * @param pageTitle
 * @param path
 * @param setOfNavItemsByMenuItem
 * @returns {Array}
 */
function getPostNavItemNextPrevious(pageTitle, path, setOfNavItemsByMenuItem) {

    /* Grab the set of navItems for the specified menuItem. */
    /* Find the index of the navItem within the set. */
    const setOfNavItems = setOfNavItemsByMenuItem.get(pageTitle);
    const navItems = [...setOfNavItems];
    const indexOfNavItem = navItems.findIndex(nItem => nItem.path === path);

    /* Initialize navItemNext/Prev. */
    let navItemNext = null;
    let navItemPrev = null;

    /* Update next/prev navItems from the set of navItems. */
    if ( indexOfNavItem >= 0 ) {

        navItemNext = navItems[indexOfNavItem + 1] || null;
        navItemPrev = navItems[indexOfNavItem - 1] || null;
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

        const {name} = navItem || {};

        if ( name ) {

            acc.push(navItem);
        }

        return acc;
    }, []);
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
    tabsClone[t] = Object.assign({...tabsClone[t]}, {active: true});

    /* Return tabs - remove any unnamed tabs. */
    return tabsClone.reduce((acc, tab) => {

        const {name} = tab || {};

        if ( name ) {

            acc.push(tab);
        }

        return acc;
    }, [])
}

/**
 * Returns the date or dateStart as a date value for the specified scoop.
 *
 * @param scoop
 * @returns {Date}
 */
function getScoopDate(scoop) {

    const {frontmatter} = scoop || {},
        {date, dateStart} = frontmatter || {};

    const scoopDate = dateStart || date;

    return new Date(scoopDate);
}

/**
 * Returns the path for the specified tab.
 *
 * @param navigationItems
 * @returns {string}
 */
function getTabPath(navigationItems) {

    if ( navigationItems && navigationItems.length > 0 ) {

        /* Locate the first navigation item partial path or override path. */
        const [firstNavItem,] = navigationItems;
        const {file, navItems, path} = firstNavItem || {};

        /* Return the path, if a file exists. */
        if ( file && path ) {

            return path;
        }

        /* Find the next available file. */
        return getTabPath(navItems);
    }

    return "";
}

/**
 * Returns true if the markdown slug is a scoop, is not a draft, and is not a private event.
 *
 * @param markdown
 * @param path
 * @returns boolean
 */
function isMarkdownScoopValid(markdown, path) {

    const {fields} = markdown || {},
        {draft, privateEvent, slug} = fields;
    const scoopSlug = slug.startsWith(path) && !denyListScoopSlugs.includes(slug);

    return scoopSlug && !draft && !privateEvent;
}

/**
 * Returns true if the menu item is "News" or "Events".
 *
 * @param pageTitle
 * @returns {boolean}
 */
function isMenuItemScoop(pageTitle) {

    const title = pageTitle.toLowerCase();

    return allowListScoopMenuItems.includes(title);
}

/**
 * Returns true if the slug is a scoop.
 *
 * @param slug
 * @returns boolean
 */
function isSlugScoop(slug) {

    const scoopSlug = slug.startsWith("/events") || slug.startsWith("/news");

    return scoopSlug && !denyListScoopSlugs.includes(slug);
}

module.exports.buildMenuItems = buildMenuItems;
module.exports.buildSetOfNavItemsByMenuItem = buildSetOfNavItemsByMenuItem;
module.exports.buildSlugNavigations = buildSlugNavigations;
module.exports.getSlugComponent = getSlugComponent;
