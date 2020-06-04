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

    function buildStudyConsentGroups(consents) {

        /* Consent groups, normalize. */
        const consentsNormalized = normalizeNodeData(consents);

        /* Build the consent groups. */
        if ( consentsNormalized ) {

            return consentsNormalized.map(consent => {

                const {groupNum, longName, shortName} = consent;

                return {
                    groupNum: Number(groupNum),
                    longName: longName,
                    shortName: shortName
                }
            });
        }
    }

    function buildStudyDiseases(diseases) {

        if ( diseases ) {

            return diseases.map(disease => disease.vocab_term).join(", ");
        }
    }

    function buildSubjectConsents(consents, consentsStat, consentsId) {

        if ( consents ) {

            const consentsByEnum = consents.map(consent => {

                return {
                    consentCode: Number(consent.code),
                    consentName: consent.value,
                    consentStat: Number(consent.count)
                }
            });

            return {
                consents: consentsByEnum,
                consentsId: consentsId,
                consentsStat: Number(consentsStat),
            }
        }
    }

    function getDictionaryConsentId(variables) {

        if ( !variables ) {

            return {};
        }

        /* Find the "CONSENT" <variable> tag. */
        const variableByConsent = variables.find(variable => variable.name === "CONSENT");

        if ( variableByConsent ) {

            return variableByConsent.att.id;
        }
    }

    function getSubjectVariablesByConsent(variables) {

        /* Find all <variable> with var_name "CONTENTS". */
        const consents = variables.filter(variable => variable.att.var_name.toLowerCase() === "consent");

        if ( !consents ) {

            return {};
        }

        const subjectConsents = consents.map(consent => {

            const {att, total} = consent,
                {id} = att,
                {stats} = total,
                {enum: consents, stat} = stats;

            /* Attributes - stat count var "n". */
            const n = stat.att.n;

            /* Consent groups, normalize and build. */
            const consentsNormalized = normalizeNodeData(consents);
            return buildSubjectConsents(consentsNormalized, n, id);
        });

        return subjectConsents.filter(consent => !!consent);
    }

    function normalizeNodeData(values) {

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

    /* We only care about the studies-xml. */
    if ( node.sourceInstanceName !== `studies-xml` ) {
        return;
    }

    /* We only care about XML content. */
    if (node.internal.mediaType !== `application/xml`) {
        return
    }

    const xmlContent = await loadNodeContent(node);

    /* Parse xml. */
    parseString(xmlContent, ({attrkey: "att", explicitArray: false, normalize: true, trim: true}), function (err, result) {

        /* Build the study schema . */
        /* Includes study accession, study name and diseases. */
        if ( node.name.toLowerCase().includes("gapexchange") ) {

            const {GaPExchange} = result,
                {Studies} = GaPExchange || {},
                {Study} = Studies || {},
                {Configuration} = Study || {},
                {ConsentGroups, Diseases, StudyNameEntrez, StudyNameReportPage} = Configuration || {},
                {ConsentGroup} = ConsentGroups || {},
                {Disease} = Diseases || {};

            /* Attributes - accession. */
            const dbGapIdAccession = Study.att.accession;

            /* Diseases, normalize and build. */
            const diseasesNormalized = normalizeNodeData(Disease);
            const diseases = buildStudyDiseases(diseasesNormalized);

            /* Consent groups. */
            const consentGroups = buildStudyConsentGroups(ConsentGroup);

            const study =  {
                consentGroups: consentGroups,
                dbGapIdAccession: dbGapIdAccession,
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

        /* Build the subject dictionary schema. */
        /* Includes the study accession and the consent phv id with the subject participation value. */
        if ( node.name.toLowerCase().includes("data_dict") ) {

            const {data_table} = result,
                {variable} = data_table;

            /* Attributes - study_id, participant_set. */
            const dbGapIdAccession = data_table.att.study_id;
            const participantSet = data_table.att.participant_set;

            /* <variables> filtered by var_name is "CONSENT". */
            const variableConsentId = getDictionaryConsentId(variable);
            const consentId = `${variableConsentId}.p${participantSet}`;

            const subjectDictionary = {
                dbGapIdAccession: dbGapIdAccession,
                variableConsentId: consentId
            };

            transformObject(
                subjectDictionary,
                `${node.id}  >>> XML`,
                'SubjectDictionarySchema');
        }

        /* Build the subject report schema. */
        /* Includes study accession, study name, and the <variables> tags where var_name is "CONSENT". */
        if ( node.name.toLowerCase().includes("var_report") ) {

            const {data_table} = result,
                {variable} = data_table;

            /* Attributes - dbGapId, study_id. */
            const dbGapIdAccession = data_table.att.study_id;
            const studyName = data_table.att.study_name;

            /* <variables> filtered by var_name is "CONSENT". */
            const variablesByConsent = getSubjectVariablesByConsent(variable);

            const subjectReport = {
                dbGapIdAccession: dbGapIdAccession,
                name: studyName,
                variables: variablesByConsent
            };

            transformObject(
                subjectReport,
                `${node.id}  >>> XML`,
                'SubjectReportSchema');
        }
    });
}

exports.onCreateNode = onCreateNodede = onCreateNode;
