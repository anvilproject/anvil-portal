/**
 * The AnVIL
 * https://www.anvilproject.org
 * Custom source plugin for AnVIL dashboard.
 */

// Core dependencies
const path = require("path");

// App dependencies
const { buildStudiesDetail } = require(path.resolve(
  __dirname,
  "../utils/dashboard-detail.service.js"
));
const { generateAnVILDashboardIndex } = require(path.resolve(
  __dirname,
  "../utils/dashboard-indexing-anvil.service.js"
));
const { buildStats } = require(path.resolve(
  __dirname,
  "../utils/dashboard-statistics.service.js"
));
const { getWorkspaces } = require(path.resolve(
  __dirname,
  "../utils/dashboard-workspaces-anvil.service.js"
));
/**
 * Creates node for specified node type.
 *
 * @param createNode
 * @param createNodeId
 * @param createContentDigest
 * @param content
 * @param id
 * @param type
 */
function addNode(
  createNode,
  createNodeId,
  createContentDigest,
  content,
  id,
  type
) {
  /* Create node. */
  const nodeContent = JSON.stringify(content);

  const nodeMeta = {
    id: createNodeId(id),
    parent: null,
    children: [],
    internal: {
      type: type,
      mediaType: `application/json`,
      content: nodeContent,
      contentDigest: createContentDigest(content),
    },
  };

  const node = Object.assign({}, content, nodeMeta);
  createNode(node);
}

/**
 * Source nodes.
 *
 * @param actions
 * @param createNodeId
 * @param createContentDigest
 * @returns {Promise.<void>}
 */
exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  /* Build up the workspaces model from the ingested attributes. */
  const workspaces = await getWorkspaces();

  /* Create nodes - workspaces. */
  workspaces.forEach((workspace) => {
    const workspaceId = `${workspace.consortium}${workspace.projectId}`;

    /* Create node - workspace. */
    addNode(
      createNode,
      createNodeId,
      createContentDigest,
      workspace,
      workspaceId,
      `Workspace`
    );
  });

  /* Build the statistics model for AnVIL home page. */
  const stat = buildStats(workspaces);

  /* Create node - stats. */
  addNode(createNode, createNodeId, createContentDigest, stat, `stat`, `Stat`);

  /* Build the studies for the dashboard study page. */
  const studies = buildStudiesDetail(workspaces);

  /* Create nodes - dashboard study. */
  studies.forEach((study) => {
    /* Create node - study. */
    addNode(
      createNode,
      createNodeId,
      createContentDigest,
      study,
      study.studyId,
      `DashboardStudy`
    );
  });
};

/**
 * Create schema customization.
 *
 * @param actions
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type ConsentName {
      long: String
      short: String
    }
    type DashboardStudy implements Node {
        id: ID!
        fhirUrl: String
        studyAccession: String
        studyConsortia: String
        studyDescription: String
        studyDescriptionShort: String
        studyId: String
        studyName: String
        studyRequestAccessUrl: String
        studySlug: String
        studyStat: Stat
        studySummary: StudySummary
        studyWorkspaces: [StudyWorkspace]
        studyUrl: String
    }
    type GapId implements Node {
        gapIdDisplay: String
        studyUrl: String
    }
    type Stat implements Node {
        cohorts: Int
        consortia: Int
        samples: Int
        size: Float
        subjects: Int
    }
    type StudySummary implements Node {
        accessTypes: [String]
        consentNames: [ConsentName]
        consentShortNames: [String]
        dataTypes: [String]
        diseases: [String]
        focuses: [String]
        studyDesigns: [String]
        studyPlatforms: [String]
        subjectsTotal: Int
    }
    type StudyWorkspace implements Node {
        accessType: String
        consentName: ConsentName
        dataTypes: [String]
        diseases: [String]
        projectId: String
        samples: Int
        size: Float
        studyDesigns: [String]
        subjects: Int
    }
    type Workspace implements Node {
        id: ID!
        accessType: String
        consentLongName: String
        consentName: ConsentName
        consentShortName: String
        consortium: String
        createdAt: String
        dataTypes: [String]
        dataUseLimitationModifiers: [String]
        dataUseLimitations: [String]
        dbGapId: String
        dbGapIdAccession: String
        diseaseSpecificDataUseLimitations: [String]
        diseases: [String]
        gapId: GapId
        projectId: String
        samples: Int
        size: Float
        studyDesigns: [String]
        studyName: String
        studySlug: String
        subjects: Int
    }`);
};

/**
 * Post bootstrap.
 *
 * @param getNodesByType
 */
exports.onPostBootstrap = ({ getNodesByType }) => {
  /* Get the workspaces. */
  const workspaces = getNodesByType("Workspace");

  /* Generate the dashboard search index. */
  generateAnVILDashboardIndex(workspaces);
};
