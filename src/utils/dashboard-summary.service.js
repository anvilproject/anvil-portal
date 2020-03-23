/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Service for formatting data dashboard summary into FE model.
 */

import * as NumberFormatService from "./number-format.service";

/**
 * Parse the dashboard JSON and build up FE-compatible model of data dashboard summary, to be displayed on the dashboard page.
 */
export function getDashboardSummary(data) {

    const programs = setOfPrograms(data);

    return [...programs].map(program => {

        const projectsByProgram = filterProjectsByProgram(data.projects, program);

        return {
            cohorts: countCohorts(projectsByProgram),
            files: sumFiles(projectsByProgram),
            program: switchProgramName(program),
            samples: sumSamples(projectsByProgram),
            size: formatSize(calculateSize(projectsByProgram)),
            subjects: sumSubjects(projectsByProgram)
        }
    });
}

/**
 * Returns the total size.
 */
function calculateSize(data) {

    return data.reduce((accum, project) => {

        accum += project.size;
        return accum;
    }, 0);
}

/**
 * Returns the number of cohorts.
 * @param data
 */
function countCohorts(data) {

    return data.length;
}

/**
 * Filter the project nodes by the specified type.
 */
function filterProjectNodesByType(project, type) {

    return project.nodes.filter(node => node.type === type) || [];
}

/**
 * Filter the projects by the specified program.
 *
 * @param projects
 * @param program
 */
function filterProjectsByProgram(projects, program) {

    return projects.filter(project => project.source === program);
}

/**
 * Returns size in TB, formatted to two decimal places.
 *
 * @param size
 * @returns {string}
 */
function formatSize(size) {

    return NumberFormatService.formatSizeToTB(size);
}

/**
 * Returns the set of programs.
 *
 * @param data
 * @returns {Set}
 */
function setOfPrograms(data) {

    return new Set(data.projects.map(project => project.source));
}

/**
 * Counts the total number of files.
 *
 * @param data
 */
function sumFiles(data) {

    return sumProjectFileValues(data);
}

/**
 * Sum the specified file counts.
 *
 * @param files
 * @returns {*}
 */
function sumFileValues(files) {

    return files.reduce((accum, file) => {
        accum += file.count;
        return accum;
    }, 0);
}

/**
 * Sum the specified node counts.
 */
function sumNodeValues(nodes) {

    return nodes.reduce((accum,  node) => {
        accum += node.count;
        return accum;
    }, 0);
}

/**
 * Sum the file value, for the group of projects.
 *
 * @param data
 * @returns {*}
 */
function sumProjectFileValues(data) {

    return data.reduce((projectAccum, project) => {

        projectAccum += sumFileValues(project.files);
        return projectAccum;
    }, 0);
}

/**
 * Sum the node value for the specified type, for the group of projects.
 */
function sumProjectNodeValues(data, nodeType) {

    return data.reduce((projectAccum, project) => {

        projectAccum += sumNodeValues(filterProjectNodesByType(project, nodeType));
        return projectAccum;
    }, 0);
}

/**
 * Counts the total number of samples.
 */
function sumSamples(data) {

    return sumProjectNodeValues(data, "Sample");
}

/**
 * Counts the total number of subjects.
 */
function sumSubjects(data) {

    return sumProjectNodeValues(data, "Subject");
}

/**
 * Returns the corresponding program display name.
 *
 * @param program
 * @returns {*}
 */
function switchProgramName(program) {

    switch (program) {
        case "GTEx":
            return "GTEx (v8)";
        case "ThousandGenomes":
            return "1000 Genomes";
        default:
            return program;
    }
}
