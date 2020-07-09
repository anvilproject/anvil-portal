/*
 * The AnVIL
 * https://www.anvilproject.org/
 *
 * Core Typography.js file, as per https://www.gatsbyjs.org/tutorial/part-two/#typographyjs. Typography.js docs
 * can be found at https://kyleamathews.github.io/typography.js/.
 */

// Core dependencies
import Typography from "typography";

const typography = new Typography({
    baseFontSize: "16px",
    baseLineHeight: 1.5,
    blockMarginBottom: 2/3,
    bodyColor: "rgb(36, 41, 46)",
    bodyFontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji"
    ],
    bodyWeight: "normal",
    boldWeight: 600,
    googleFonts: [
        {
            name: "Open Sans",
            styles: ["400", "600", "700"]
        }
    ],
    headerFontFamily: [
        "Open Sans",
        "sans-serif"
    ],
    headerWeight: 400,
    scaleRatio: 2,
    overrideStyles: ({rhythm}) => {
        return {
            "h2, h3, h4, h5,h6": {
                marginTop: rhythm(1),
            },
            "ol, ul": {
                margin: 0,
                paddingLeft: rhythm(1.3333)
            },
            "li": {
                marginBottom: rhythm(2/3),
                marginTop: rhythm(2/3),
            },
            // Children lists
            "li > ol, li > ul": {
                margin: 0,
                paddingLeft: rhythm(1.3333)
            },
            "ol ol, ul ol": {
                listStyleType: "lower-roman"
            },
            a: {
                color: "rgb(36, 41, 46)",
                textDecoration: "none",
            },
            blockquote: {
                borderLeft: "4px solid var(--accent-mustard)",
                color: "var(--black58)",
                marginTop: 0,
                marginRight: 0,
                marginLeft: 0,
                paddingLeft: `calc(${rhythm(2/3)})`,
            },
            "blockquote > *": {
                margin: 0
            },
            pre: {
                "white-space": "pre-wrap"
            },
            code: {
                "overflow-wrap": "break-word", /* IE, Edge */
                "word-break": "break-word"
            }
        };
    }
});

export default typography;
