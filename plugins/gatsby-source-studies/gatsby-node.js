/**
 * The AnVIL
 * https://www.anvilproject.org
 * Custom source plugin for Dashboard studies.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {getDashboardDetail} = require(path.resolve(__dirname, "dashboard-detail.service.js"));
const {getStudies} = require(path.resolve(__dirname, "dashboard-studies.service.js"));

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {

    const { createNode } = actions;

    /* Build up the dashboard detail FE-compatible model. */
    const workspaces = getDashboardDetail();

    /* Build up the studies model. */
    const studies = await getStudies(workspaces);

    const dashboard = {
        studies: studies,
        workspaces: workspaces
    };

    const nodeContent = JSON.stringify(dashboard);

    const nodeMeta = {
        id: createNodeId(`dashboard`),
        parent: null,
        children: [],
        internal: {
            type: `DashboardSchema`,
            mediaType: `application/json`,
            content: nodeContent,
            contentDigest: createContentDigest(dashboard),
        },
    };

    const node = Object.assign({}, dashboard, nodeMeta);
    createNode(node)
};
