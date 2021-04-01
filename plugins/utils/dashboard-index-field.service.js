/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for dashboard search index fields.
 */

// Template variables
const regexSpecialChars = /[^a-zA-Z0-9\s]/g;

/**
 * Returns the GapId and GapId's corresponding number.
 * Indexes GapId's number - strips off any prefix/suffix.
 * e.g. a GapId of "phs001395.v1.p1" returns "1395" and "phs001395.v1.p1".
 *
 * @param gapId
 * @returns {*}
 */
const getIndexFieldGapNumber = function getIndexFieldGapNumber(gapId) {

    if ( gapId ) {

        const gapNumber = gapId.replace(/(^phs0*|\..*$)/g, "");
        return [gapId, gapNumber];
    }

    return [];
};

/**
 * Facilitates the indexing of an array of values into searchable text or checkbox values.
 * Replaces any white space, hyphens etc with an underscore for searchable term values.
 * Allows for flexible searching of an array of values either by checkbox selection or input text.
 * e.g. "gru-irb" returns ["gru-irb", "gru_irb"] or ["Hearing Loss, Sensorineural"] returns ["Hearing Loss, Sensorineural", "Hearing_Loss__Sensorineural"].
 *
 * @param array
 */
const getIndexFieldTypeOfArray = function getIndexFieldTypeOfArray(array) {

    return getSearchableTextOrCheckboxValues(array);
};

/**
 * Return the the string value, replacing any special characters with the specified replacement string value.
 * Facilitates the indexing of the value into a searchable checkbox value or a searchable input value.
 *
 * For checkbox selection an exact match will be possible when the replacement string value is an underscore "_".
 * For input text searching a partial match will be possible when the replacement string value is white space " ".
 * i.e. searching "talkowki" will return the resulting workspace "asc_ndd_daly_talkowski_AGRE-FEMF_asd_exome".
 *
 * e.g. "asc_ndd_daly_talkowski_AGRE-FEMF_asd_exome" returns "asc ndd daly talkowski AGRE FEMF asd exome" or,
 * "1000 genomes" returns "1000_genomes", "GTEx (v8)" returns "GTEx__v8_" or "gru-irb" returns "gru_irb".
 *
 * @param subStr
 * @param newSubStr
 */
const getIndexFieldTypeOfString = function getIndexFieldTypeOfString(subStr, newSubStr) {

    if ( subStr ) {

        return replaceStringWithSearchableTerm(subStr, newSubStr);
    }

    return "";
};

/**
 * Returns a new array of values; comprising of searchable text and checkbox values.
 * The original values are retained for indexing searchable text.
 * And, for the purpose of term selection via checkboxes, an equivalent value is added where any special characters are replaced by an underscore "_".
 * e.g. ["1000 Genomes", "GTEx (v8)"] returns ["1000 Genomes", "GTEx (v8)", "1000_genomes", "gtex__v8_"].
 *
 * @param array
 * @returns {*}
 */
function getSearchableTextOrCheckboxValues(array) {

    if ( array && array.length ) {

        /* Clone the array. */
        const cloneArray = Array.from(array);

        /* Return the new array. */
        /* The new array will comprise of original values (for searchable text) and values with any special characters removed (for checkbox selection). */
        return cloneArray.reduce((acc, value) => {

            if ( value ) {

                /* Replace any special characters with an underscore "_" for checkbox selection. */
                const valueStr = replaceStringWithSearchableTerm(value, "_");

                /* Accumulate any new values. */
                if ( !acc.includes(valueStr) ) {

                    acc.push(valueStr);
                }
            }

            return acc;
        }, cloneArray);
    }

    return array;
}

/**
 * Replaces any special characters from the specified string with the specified replacement string.
 * Facilitates the indexing of any string value into a searchable term.
 * Replacement string may be either an underscore "_" for searchable facet terms, or white space " " for searchable input values.
 *
 * @param subStr
 * @param newSubStr
 * @returns {*}
 */
function replaceStringWithSearchableTerm(subStr, newSubStr = "_") {

    if ( subStr && typeof subStr === "string" ) {

        return subStr
            .toLowerCase()
            .replace(regexSpecialChars, newSubStr)
            .replace(/\s/g, newSubStr)
            .trim()
    }

    return subStr;
}

module.exports.getIndexFieldTypeOfArray = getIndexFieldTypeOfArray;
module.exports.getIndexFieldTypeOfString = getIndexFieldTypeOfString;
module.exports.getIndexFieldGapNumber = getIndexFieldGapNumber;
