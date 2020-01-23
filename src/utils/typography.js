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
                ...adjustFontSizeTo("38px"),
                lineHeight: "44px",
                margin: "0 0 24px",
            },
            h2: {
                ...adjustFontSizeTo("28px"),
                letterSpacing: "0.25px",
                lineHeight: "36px",
                margin: "0 0 12px",
            },
            h3: {
                ...adjustFontSizeTo("18px"),
                fontWeight: 600,
                letterSpacing: "0.15px",
                lineHeight: "26px",
                margin: "0 0 10px",
            },
            h4: {
                ...adjustFontSizeTo("16px"),
                fontWeight: 600,
                lineHeight: "24px",
                margin: "0 0 4px",
            },
            h5: {
                ...adjustFontSizeTo("12px"),
                fontWeight: 400,
                lineHeight: "18px",
                margin: "0 0 8px",
            },
            img: {
                border: 0,
                marginBottom: "24px",
            },
            "img:focus": {
                outline: "none"
            },
            ".anchor": {
                border: "none !important"
            },
            ul: {
                marginBottom: "2.5rem"
            },
            li: {
                marginBottom: 0
            }
        }
    }
});

export default typography;
