/**
 * The AnVIL
 * https://www.anvilproject.org
 * Custom source plugin for NCPI dashboard.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {generateNCPIDashboardIndex} = require(path.resolve(__dirname, "../utils/dashboard-indexing-ncpi.service.js"));
const {getNCPIStudies} = require(path.resolve(__dirname, "../utils/dashboard-studies-ncpi.service.js"));

exports.sourceNodes = async ({actions, createNodeId, createContentDigest}) => {

    const {createNode} = actions;

    /* Build up the NCPI dashboard model. */
    const studies = await getNCPIStudies();

    /* Create node - study. */
    studies.forEach(study => {

        const nodeContent = JSON.stringify(study);

        const nodeMeta = {
            id: createNodeId(`${study.platform}${study.dbGapIdAccession}`),
            parent: null,
            children: [],
            internal: {
                type: `DashboardNCPI`,
                mediaType: `application/json`,
                content: nodeContent,
                contentDigest: createContentDigest(study),
            },
        };

        const node = Object.assign({}, study, nodeMeta);

        createNode(node)
    });
};

exports.createSchemaCustomization = ({actions}) => {

    const {createTypes} = actions;

    createTypes(`
    type DashboardNCPI implements Node {
        id: ID!
        consentCodes: [RowCellValueTooltip]
        consentShortNames: [String]
        dataTypes: [String]
        dbGapIdAccession: String!
        diseases: [String]
        gapId: GapId
        platform: String
        studyName: String!
        studyUrl: String!
        subjectsTotal: Int
    }
    type RowCellValueTooltip implements Node {
        displayValue: String
        tooltipValue: String
    }`);
};

exports.onPostBootstrap = ({getNodesByType}) => {

    /* Get the NCPI dashboard studies. */
    const studies = getNodesByType("DashboardNCPI");

    /* Generate the NCPI dashboard search index. */
    generateNCPIDashboardIndex(studies);
};
