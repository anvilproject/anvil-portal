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
    bodyFontFamily: ["Open Sans", "sans-serif"],
    bodyWeight: "400",
    headerColor: "#012840",
    headerFontFamily: ["Open Sans", "sans-serif"],
    headerWeight: "600",
    googleFonts: [
        {
            name: "Open Sans",
            styles: ["400", "600", "700"]
        },
        {
            name: "Lato",
            styles: ["300"]
        }
    ],
    includeNormalize: true,
    overrideStyles: ({adjustFontSizeTo, scale}, options, styles) => {
        return {
            "body, html": {},
            "body": {
                margin: 0
            },
            "*, *:before, *:after": {
                mozBoxSizing: "border-box",
                webkitBoxSizing: "border-box",
                boxSizing: "border-box",
            },
            "a": {
                cursor: "pointer",
                font: "inherit",
                textDecoration: "none",
            },
            "a:focus,a:active,a:hover": {
                outline: 0,
            },
            img: {
                border: 0,
                marginBottom: 0,
            }
        }
    }
});

export default typography;
