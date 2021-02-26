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
    bodyColor: "var(--default-text)",
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
    headerColor: "var(--shade-dark)",
    headerFontFamily: [
        "Open Sans",
        "sans-serif"
    ],
    headerLineHeight: 1.25,
    headerWeight: 400,
    scaleRatio: 2,
    overrideStyles: ({rhythm}) => {
        return {
            "h2, h3, h4, h5, h6": {
                marginTop: rhythm(1+1/3),
            },
            "h2":{
                borderBottom: "1px solid rgba(var(--accent-blue-green-rgb), .58)",
                paddingBottom: "6px"
            },
            "h4, h5, h6": {
                lineHeight: 1.1
            },
            "ol, ul": {
                margin: 0,
                paddingLeft: rhythm(1+1/3)
            },
            "li": {
                marginBottom: rhythm(2/3),
                marginTop: rhythm(2/3),
            },
            // Children lists
            "li > ol, li > ul": {
                margin: 0,
                paddingLeft: rhythm(1+1/3)
            },
            "li br + span": {
                marginLeft: "0 !important",
                marginTop: "16px"
            },
            "li blockquote": {
                margin: "16px 0",
            },
            "ol ol, ul ol": {
                listStyleType: "lower-roman"
            },
            a: { // Set link colors to default text color (this is for header, navs etc), markdown links override this
                color: "var(--default-text)",
                borderBottom: "none",
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
            code: {
                background: "#f6f7f4 !important",
                "overflow-wrap": "break-word", /* IE, Edge */
                "word-break": "break-word"
            }
        };
    }
});

export default typography;
