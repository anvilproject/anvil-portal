/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic service supporting gatsby-node createPages API.
 * Builds the post's navigation.
 */

// Template variables
const componentPath = "src/templates/content-template.js";
const path = require("path");

/**
 * Returns a map object key-value pair comprising of post navigation object (tabs, navigation and post path)
 * and corresponding markdown file path (equivalent to the post's slug).
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
 * Returns the post's template component path.
 *
 * @returns {string}
 */
const getPostComponent = function getPostComponent() {

    return path.resolve(componentPath);
};

/**
 * Returns the navigations for the specified post.
 *
 * @param slug
 * @param menuItems
 */
const getPostNavigations = function getPostNavigations(slug, menuItems) {

    /* Default - slug as path. */
    const postNavigations = {path: slug};

    /* For each menuItem. */
    for ( const [, menuItem] of menuItems.entries() ) {

        /* Handle special case where any news of events file (not listed in the site map) is allocated a page title. */
        const [,title,] = slug.split("/");

        if ( title === "news" || title === "events" ) {

            Object.assign(postNavigations, {title: title});
        }

        /* For every tab. */
        for ( const [t, tab] of menuItem.tabs.entries() ) {

            const {navItems} = tab;

            Object.assign(postNavigations, findPostNavigations(slug, menuItem, tab, t, navItems));
        }
    }

    return postNavigations;
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
 * Builds the post's navigations (navItems, path, tabs, title) for the specified slug.
 *
 * @param menuItem
 * @param navItems
 * @param navItem
 * @param t
 * @returns {{path: *, navItems: *, tabs: [null], title: *}}
 */
function buildPostNavs(menuItem, navItems, navItem, t) {

    const {pageTitle, tabs} = menuItem;
    const {path} = navItem;

    const tabsClone = [...tabs];
    tabsClone[t] = Object.assign({...tabsClone[t]}, {active: true});

    return {navItems: navItems, path: path, tabs: tabsClone, title: pageTitle};
}

/**
 * Finds the post's navigations for the specified slug.
 *
 * @param slug
 * @param menuItem
 * @param tab
 * @param t
 * @param nItems
 * @returns {{}}
 */
function findPostNavigations(slug, menuItem, tab, t, nItems) {

    const postNavigations = {};

    for ( const [, navItem] of nItems.entries() ) {

        /* Update post navigations with corresponding navigations. */
        if ( navItem.file === slug ) {

            Object.assign(postNavigations, buildPostNavs(menuItem, tab.navItems, navItem, t));
        }

        /* Investigate nested navItems to find any slug matches and update the post navigations accordingly. */
        if ( navItem.navItems ) {

            Object.assign(postNavigations, findPostNavigations(slug, menuItem, tab, t, navItem.navItems));
        }
    }

    return postNavigations;
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

module.exports.buildMenuItems = buildMenuItems;
module.exports.getPostComponent = getPostComponent;
module.exports.getPostNavigations = getPostNavigations;
