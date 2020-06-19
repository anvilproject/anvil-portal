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
    baseLineHeight: "24px",
    bodyColor: "#000000",
    bodyFontFamily: ["Barlow", "sans-serif"],
    bodyWeight: "400",
    headerColor: "#012840",
    headerFontFamily: ["Open Sans", "sans-serif"],
    headerWeight: "400",
    googleFonts: [
        {
            name: "Open Sans",
            styles: ["400", "600", "700"]
        },
        {
            name: "Barlow",
            styles: ["300", "400"]
        }
    ],
    includeNormalize: true,
    overrideStyles: ({adjustFontSizeTo, scale}, options, styles) => {
        return {
            "body, html": {
                overscrollBehavior: "none",
            },
            "body": {
                margin: 0
            },
            "*, *:before, *:after": {
                mozBoxSizing: "border-box",
                webkitBoxSizing: "border-box",
                boxSizing: "border-box",
            },
            "a": {
                color: "inherit",
                cursor: "pointer",
                font: "inherit",
                textDecoration: "none",
            },
            "a:focus,a:active,a:hover": {
                outline: 0,
            },
            "p:last-child": {
                margin: 0
            },
            h1: {
                ...adjustFontSizeTo("32px"),
                fontWeight: 400,
                lineHeight: "40px",
                margin: "0 0 24px"
            },
            h2: {
                ...adjustFontSizeTo("24px"),
                fontWeight: 400,
                lineHeight: "32px",
                margin: "48px 0 24px"
            },
            h3: {
                ...adjustFontSizeTo("20px"),
                fontWeight: 400,
                lineHeight: "28px",
                margin: "32px 0 16px"
            },
            h4: {
                ...adjustFontSizeTo("16px"),
                fontWeight: 400,
                lineHeight: "24px",
                margin: "32px 0 16px"
            },
            h5: {
                ...adjustFontSizeTo("14px"),
                fontWeight: 600,
                lineHeight: "24px",
                margin: "32px 0 16px"
            },
            h6: {
                ...adjustFontSizeTo("14px"),
                fontWeight: 500,
                lineHeight: "24px",
                margin: "32px 0 16px",
            },
            p: {
                ...adjustFontSizeTo("16px"),
                lineHeight: "24px",
                margin: "16px 0"
            },
            img: {
                display: "block",
                border: 0,
                margin: "0 auto"
            },
            "img:focus": {
                outline: "none"
            },
            ".anchor": {
                borderBottom: "none !important"
            },
            "ol, ul": {
                listStyle: "disc outside",
                margin: "0",
                paddingLeft: "40px"
            },
            li: {
                margin: "12px 0",
                padding: "0"
            }
        }
    }
});

export default typography;
