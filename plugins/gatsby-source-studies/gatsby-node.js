/**
 * The AnVIL
 * https://www.anvilproject.org
 * Custom source plugin for Dashboard studies.
 */

// Core dependencies
const path = require("path");

// App dependencies
const {getWorkspaceAccessUI, getWorkspaceDiseases, getWorkspaceStudyName} = require(path.resolve(__dirname, "dashboard-field-extension.service.js"));
const {generateDashboardIndex} = require(path.resolve(__dirname, "dashboard-index.service.js"));
const {getStudies} = require(path.resolve(__dirname, "dashboard-studies.service.js"));
const {getWorkspaces} = require(path.resolve(__dirname, "dashboard-workspaces.service.js"));

exports.sourceNodes = async ({actions, createNodeId, createContentDigest}) => {

    const {createNode} = actions;

    /* Build up the workspaces model. */
    const workspaces = await getWorkspaces();

    /* Build up the studies model. */
    const studies = await getStudies(workspaces);

    /* Create node - study. */
    studies.forEach(study => {

        const nodeContent = JSON.stringify(study);

        const nodeMeta = {
            id: createNodeId(study.studyName),
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

    /* Create node - workspace. */
    workspaces.forEach(workspace => {

        const nodeContent = JSON.stringify(workspace);
        const workspaceId = `${workspace.program}${workspace.projectId}`;

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
        name: "accessUI",
        extend(options, prevFieldConfig) {
            return {
                resolve(source, arg, context, info) {
                    const studies = context.nodeModel.getAllNodes({type: "Study"});
                    return getWorkspaceAccessUI(source, studies);
                },
            }
        }
    });

    createFieldExtension({
        name: "diseases",
        extend(options, prevFieldConfig) {
            return {
                resolve(source, arg, context, info) {
                    const studies = context.nodeModel.getAllNodes({type: "Study"});
                    return getWorkspaceDiseases(source, studies);
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
                    return getWorkspaceStudyName(source, studies);
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
    type Workspace implements Node {
        id: ID!
        access: String
        accessUI: String @accessUI
        dataType: [String]
        demographics: Int
        diagnosis: Int
        families: Int
        files: Int
        dbGapId: String
        dbGapIdAccession: String
        diseases: [String] @diseases
        program: String
        projectId: String!
        samples: Int
        size: Float
        sizeTB: Float
        study: Study @link(by: "dbGapIdAccession", from: "dbGapIdAccession")
        studyName: String @studyName
        subjects: Int
    }
    type Study implements Node {
        id: ID!
        consentGroup: ConsentGroup
        consortia: String
        dbGapIdAccession: String!
        diseases: [String]
        studyName: String!
        subjectsCount: Int
        subjectsTotal: Int
        workspaces: [Workspace]
    }`);
};

exports.createResolvers = ({createResolvers}) => {
    const resolvers = {
        Study: {
            workspaces: {
                type: ["Workspace"],
                resolve(source, args, context, info) {
                    return context.nodeModel.runQuery({
                        query: {
                            filter: {
                                study: {
                                    elemMatch: {
                                        dbGapIdAccession: {
                                            eq: source.dbGapIdAccession,
                                        },
                                    }
                                }
                            },
                        },
                        type: "Workspace",
                        firstOnly: false,
                    })
                },
            },
        },
    };

    createResolvers(resolvers);
};

exports.onPostBootstrap = ({getNodesByType}) => {

    /* Get the workspaces. */
    const workspaces = getNodesByType("Workspace");

    /* Get the studies. */
    const studies = getNodesByType("Study");

    /* Generate the dashboard search index. */
    generateDashboardIndex(studies, workspaces);
};
