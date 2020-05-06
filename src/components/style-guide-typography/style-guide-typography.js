/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - style guide typography component.
 * Used by the markdown page "/anvil-style-guide/typography".
 * Use the closed tag syntax <style-guide-typography></style-guide-typography>.
 */

// Core dependencies
import React from "react";

// App dependencies
import Hero from "../hero/hero";
import {TypographyStaticQuery} from "../../hooks/typography-query";

// Styles
import compStyles from "./style-guide-typography.module.css";

class StyleGuideTypography extends React.Component {

    render() {
        const {typography} = this.props;

        const componentsMap = {hero: Hero, "hero small": Hero};
        const componentsProps = {"hero small": {small: ""}};

        const Typography = (props) => {

            const {typo} = props,
                {color, fontFamily, fontSize, fontWeight, label, letterSpacing, lineHeight, margin, tagName} = typo;

            const Tag = componentsMap[tagName] ? componentsMap[tagName] : tagName;
            const componentProps = componentsProps[tagName];

            return (
                <div className={compStyles.typo}>
                    {Tag ? <Tag className={compStyles.label} {...componentProps}>{label}</Tag> : null}
                    <p className={compStyles.styles}>
                        <span>{fontFamily}</span>
                        <span>{fontWeight}</span>
                        <span>{fontSize} / {lineHeight}</span>
                        <span>{letterSpacing}</span>
                        <span>{margin}</span>
                        <span>{color}</span>
                    </p>
                </div>
            )

        };

        return (
            <>
            {typography ? typography.map((typo, i) => <Typography key={i} typo={typo}/>) : null}
            </>
        );
    }
}

export default () => {

    const typography = TypographyStaticQuery();

    return (
        <StyleGuideTypography typography={typography}/>
    );
}
