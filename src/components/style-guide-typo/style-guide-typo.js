/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - style guide typo component.
 */

// Core dependencies
import React, {useEffect, useRef, useState} from "react";

// App dependencies
import Overline from "../overline/overline";

// Styles
import compStyles from "./style-guide-typo.module.css";

function StyleGuideTypo(props) {

    const {children} = props;
    const typoRef = useRef(null);
    const [styles, setStyles] = useState({
        backgroundColor: "",
        color: "",
        fontFamily: "",
        fontSize: "",
        fontWeight: "",
        lineHeight: "",
        margin: "",
        padding: "",
        showBackgroundColor: false});
    const {backgroundColor, color, fontFamily, fontSize, fontWeight,
        lineHeight, margin, padding, showBackgroundColor} = styles || {};

    /* useEffect - componentDidMount. */
    /* Grab styles from the typo ref. */
    useEffect(() => {

        if ( typoRef && typoRef.current !== null ) {

            /* Grab the typography element. */
            const typoStyles = window.getComputedStyle(typoRef.current);

            /* Set the styles. */
            setStyles(styles => ({...styles,
                backgroundColor: typoStyles.backgroundColor,
                color: typoStyles.color,
                fontFamily: typoStyles.fontFamily,
                fontSize: typoStyles.fontSize,
                fontWeight: typoStyles.fontWeight,
                lineHeight: typoStyles.lineHeight,
                margin: typoStyles.margin,
                padding: typoStyles.padding,
                showBackgroundColor: typoStyles.backgroundColor !== "rgba(0, 0, 0, 0)"}));
        }
    }, []);

    return (
        <>
        {React.cloneElement(children, {ref: typoRef})}
        <span className={compStyles.styles}>
            <Overline><span>Font Family</span></Overline>
            <span>{fontFamily}</span>
            <Overline><span>Font Styles</span></Overline>
            {showBackgroundColor ?
                <span className={compStyles.style}>
                    <span className={compStyles.label}>Background Color: </span>{backgroundColor}</span> : null}
            <span className={compStyles.style}><span className={compStyles.label}>Color: </span>{color}</span>
            <span className={compStyles.style}><span className={compStyles.label}>Font Size: </span>{fontSize}</span>
            <span className={compStyles.style}><span className={compStyles.label}>Font Weight: </span>{fontWeight}</span>
            <span className={compStyles.style}><span className={compStyles.label}>Line Height: </span>{lineHeight}</span>
            <span className={compStyles.style}><span className={compStyles.label}>Margin: </span>{margin}</span>
            <span className={compStyles.style}><span className={compStyles.label}>Padding: </span>{padding}</span>
        </span>
        </>
    )
}

export default StyleGuideTypo;
