/**
 * The AnVIL
 * https://www.anvilproject.org
 * Dashboard studies XML transformer.
 */

// App dependencies
const crypto = require(`crypto`);
const _ = require(`lodash`);
const {parseString} = require("xml2js");


async function onCreateNode({node, actions, loadNodeContent}) {

    const {createNode, createParentChildLink} = actions;

    function buildStudyConsentGroups(groups) {

        if ( groups ) {

            return groups.map(group => {

                return {
                    longName: group.longName,
                    shortName: group.shortName
                }
            })
        }
    }

    function buildStudyDiseases(diseases) {

        if ( diseases ) {

            return diseases.map(disease => disease.vocab_term).join(", ");
        }
    }

    function buildSubjectConsentGroups(groups) {

        if ( groups ) {

            return groups.map(group => {

                return {
                    consentName: group.value,
                    consentStat: Number(group.count)
                }
            })
        }
    }

    function normalizeStudyNodeData(values) {

        if ( !values ) {

            return;
        }

        /* Normalize object to an array. Return array reformatted to handle any node data with key "_". */
        if ( !Array.isArray(values) ) {

            let nodeData = assignNodeValue(values);

            return Object.keys(nodeData).map((key) => {

                return nodeData[key];
            })
        }

        /* Node data is already an array. Return array reformatted to handle any node data with key "_". */
        return values.map(value => {

            let nodeData = assignNodeValue(value);

            return nodeData.att;
        });
    }

    function assignNodeValue(nodeData) {

        let packagedNode = nodeData;

        /* Handle any node with key "_" and its associated value.
         * An example would be <enum code="1" count="2149">Disease-Specific (Cardiology, MDS, GSO) (DS-CARD-MDS-GSO)</enum>.
         * The node data returns an object e.g. {"_": "Disease-Specific...., {code: "1", count: "2149"}}.
         * For consistency within the normalization method the value for the key "_" is assigned with its other
         * corresponding keys to a new object, so that it will return an array of the same shape
         * as other similar node data without the key "_".
         */
        if ( packagedNode[`_`] ) {

            const nodeDataValue = {value: packagedNode[`_`]};

            packagedNode = {att: Object.assign(packagedNode.att, nodeDataValue)};
        }

        return packagedNode;
    }

    function transformObject(obj, id, type) {

        const objStr = JSON.stringify(obj);
        const contentDigest = crypto
            .createHash(`md5`)
            .update(objStr)
            .digest(`hex`);
        const jsonNode = {
            ...obj,
            id,
            children: [],
            parent: node.id,
            internal: {
                contentDigest,
                type,
            },
        };

        createNode(jsonNode);
        createParentChildLink({
            parent: node,
            child: jsonNode
        })
    }

    /* We only care about the db-gap-xml. */
    if ( node.sourceInstanceName !== `db-gap-xml` ) {
        return;
    }

    /* We only care about XML content. */
    if (node.internal.mediaType !== `application/xml`) {
        return
    }

    const xmlContent = await loadNodeContent(node);

    /* Parse xml. */
    parseString(xmlContent, ({attrkey: "att", explicitArray: false, normalize: true, trim: true}), function (err, result) {

        /* Build the study schema. */
        if ( node.name.toLowerCase().includes("gapexchange") ) {

            const {GaPExchange} = result,
                {Studies} = GaPExchange || {},
                {Study} = Studies || {},
                {Configuration} = Study || {},
                {ConsentGroups, Diseases, StudyNameEntrez, StudyNameReportPage} = Configuration || {},
                {Disease} = Diseases || {},
                {ConsentGroup} = ConsentGroups || {};

            /* Attributes - dbGapId. */
            const dbGapId = Study.att.accession;

            /* Consent groups, normalize and build. */
            const consentGroupsNormalized = normalizeStudyNodeData(ConsentGroup);
            const consentGroups = buildStudyConsentGroups(consentGroupsNormalized);

            /* Diseases, normalize and build. */
            const diseasesNormalized = normalizeStudyNodeData(Disease);
            const diseases = buildStudyDiseases(diseasesNormalized);

            const study =  {
                dbGapId: dbGapId,
                consentGroups: consentGroups,
                diseases: diseases,
                name: {
                    longName: StudyNameReportPage,
                    shortName: StudyNameEntrez,
                }
            };

            transformObject(
                study,
                `${node.id}  >>> XML`,
                'StudySchema');
        }

        /* Build the subject schema. */
        if ( node.name.toLowerCase().includes("subject") ) {

            const {data_table} = result,
                {variable: variables} = data_table;

            /* Attributes - dbGapId, studyName. */
            const dbGapId = data_table.att.study_id;
            const studyName = data_table.att.study_name;

            /* Find <variable> with var_name "CONTENTS" where the id ends with ".v1.p1". */
            const consent = variables.find(variable => variable.att.var_name.toLowerCase() === "consent" && variable.att.id.endsWith(".v1.p1"));

            if ( !consent ) {

                return {};
            }

            const {total} = consent,
                {stats} = total,
                {enum: groups, stat} = stats;

            /* Attributes - stat count var "n". */
            const n = stat.att.n;

            /* Consent groups, normalize and build. */
            const consentGroupsNormalized = normalizeStudyNodeData(groups);
            const consentGroups = buildSubjectConsentGroups(consentGroupsNormalized);

            const subject = {
                dbGapId: dbGapId,
                consentGroups: consentGroups,
                count: n,
                name: studyName,
            };

            transformObject(
                subject,
                `${node.id}  >>> XML`,
                'SubjectSchema');
        }


    });
}

exports.onCreateNode = onCreateNodede = onCreateNode;
