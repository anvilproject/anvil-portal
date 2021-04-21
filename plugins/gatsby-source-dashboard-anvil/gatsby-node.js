/**
 * The AnVIL
 * https://www.anvilproject.org
 * Custom source plugin for AnVIL dashboard.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {generateAnVILDashboardIndex} = require(path.resolve(__dirname, "../utils/dashboard-indexing-anvil.service.js"));
const {getWorkspaces} = require(path.resolve(__dirname, "../utils/dashboard-workspaces-anvil.service.js"));

exports.sourceNodes = async ({actions, createNodeId, createContentDigest}) => {

    const {createNode} = actions;

    /* Build up the workspaces model from the ingested attributes. */
    const workspaces = await getWorkspaces();

    /* Create node - workspaces. */
    workspaces.forEach(workspace => {

        const nodeContent = JSON.stringify(workspace);
        const workspaceId = `${workspace.consortium}${workspace.projectId}`;

        const nodeMeta = {
            id: createNodeId(workspaceId),
            parent: null,
            children: [],
            internal: {
                type: `Workspace`,
                mediaType: `application/json`,
                content: nodeContent,
                contentDigest: createContentDigest(workspace),
            },
        };

        const node = Object.assign({}, workspace, nodeMeta);

        createNode(node)
    });
};

exports.createSchemaCustomization = ({actions}) => {

    const {createTypes} = actions;

    createTypes(`
    type GapId implements Node {
        gapIdDisplay: String
        studyUrl: String
    }
    type Workspace implements Node {
        id: ID!
        accessType: String
        consentShortName: String
        consortium: String
        dataTypes: [String]
        dbGapId: String
        dbGapIdAccession: String
        diseases: [String]
        gapId: GapId
        projectId: String
        samples: Int
        size: Float
        studyName: String
        subjects: Int
    }`);
};

exports.onPostBootstrap = ({getNodesByType}) => {

    /* Get the workspaces. */
    const workspaces = getNodesByType("Workspace");

    /* Generate the dashboard search index. */
    generateAnVILDashboardIndex(workspaces);
};
