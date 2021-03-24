/**
 * The AnVIL
 * https://www.anvilproject.org
 * Custom source plugin for AnVIL dashboard.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {getFieldTypeWorkspaceGapId, getFieldTypeWorkspaceStudyName} = require(path.resolve(__dirname, "../utils/dashboard-field-extension-anvil.service.js"));
const {generateAnVILDashboardIndex} = require(path.resolve(__dirname, "../utils/dashboard-indexing-anvil.service.js"));
const {getStudies} = require(path.resolve(__dirname, "../utils/dashboard-studies-anvil.service.js"));
const {getWorkspaces} = require(path.resolve(__dirname, "../utils/dashboard-workspaces-anvil.service.js"));

exports.sourceNodes = async ({actions, createNodeId, createContentDigest}) => {

    const {createNode} = actions;

    /* Build up the workspaces model from the ingested attributes. */
    const workspaces = await getWorkspaces();

    /* Build up the studies model from the workspaces. */
    const studies = await getStudies(workspaces);

    /* Create node - studies. */
    studies.forEach(study => {

        const nodeContent = JSON.stringify(study);
        const studyId = `${study.dbGapId}${study.studyName}`;

        const nodeMeta = {
            id: createNodeId(studyId),
            parent: null,
            children: [],
            internal: {
                type: `Study`,
                mediaType: `application/json`,
                content: nodeContent,
                contentDigest: createContentDigest(study),
            },
        };

        const node = Object.assign({}, study, nodeMeta);

        createNode(node)
    });

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

    const {createFieldExtension, createTypes} = actions;

    createFieldExtension({
        name: "gapId",
        extend(options, prevFieldConfig) {
            return {
                resolve(source, arg, context, info) {
                    const studies = context.nodeModel.getAllNodes({type: "Study"});
                    return getFieldTypeWorkspaceGapId(source, studies);
                },
            }
        }
    });

    createFieldExtension({
        name: "studyName",
        extend(options, prevFieldConfig) {
            return {
                resolve(source, arg, context, info) {
                    const studies = context.nodeModel.getAllNodes({type: "Study"});
                    return getFieldTypeWorkspaceStudyName(source, studies);
                },
            }
        }
    });

    createTypes(`
    type Consents implements Node {
        consentCode: Int
        consentLongName: String
        consentName: String
        consentShortName: String
        consentStat: Int
    }
    type ConsentGroup implements Node {
        consents: [Consents]
        consentsStat: Int
    }
    type GapId implements Node {
        gapIdDisplay: String
        studyUrl: String
    }
    type Study implements Node {
        id: ID!
        consentGroup: ConsentGroup
        dbGapIdAccession: String
        diseases: [String]
        gapId: GapId
        studyName: String
        studyUrl: String
        subjectsCount: Int
        subjectsTotal: Int
    }
    type Workspace implements Node {
        id: ID!
        accessType: String
        consentShortNames: [String]
        consortium: String
        dataTypes: [String]
        dbGapId: String
        dbGapIdAccession: String
        diseases: [String]
        gapId: GapId @gapId
        projectId: String
        samples: Int
        size: Float
        studyName: String @studyName
        subjects: Int
    }`);
};

exports.onPostBootstrap = ({getNodesByType}) => {

    /* Get the workspaces. */
    const workspaces = getNodesByType("Workspace");

    /* Get the studies. */
    const studies = getNodesByType("Study");

    /* Generate the dashboard search index. */
    generateAnVILDashboardIndex(studies, workspaces);
};
