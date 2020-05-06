/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - style guide typography example component.
 * Used by the markdown page "/anvil-style-guide/typography-examples".
 * Use the closed tag syntax <style-guide-typography-example></style-guide-typography-example>.
 */

// Core dependencies
import React from "react";

// App dependencies
import {TypographyExampleStaticQuery} from "../../hooks/typography-example-query";

// Styles
import compStyles from "./style-guide-typography-example.module.css";

const headingLabels = {
    "h1": "Heading One",
    "h2": "Heading Two",
    "h3": "Heading Three",
    "h4": "Heading Four",
    "h5": "Heading Five"
};

class StyleGuideTypographyExample extends React.Component {

    render() {
        const {examples} = this.props;

        const Example = (props) => {

            const {example} = props;

            return (
                <div className={compStyles.example}>
                    <Heading example={example}/>
                    <LorumIpsum/>
                </div>
            )
        };

        const Heading = (props) => {

            const {example} = props,
                {margin, tagName: Tag} = example,
                label = headingLabels[Tag];

            return (
                <Tag className={compStyles.label}>
                    {label ? <span>{label}</span> : null}
                    <Margin margin={margin}/>
                </Tag>
            )
        };

        const LorumIpsum = () => {

            return (
                <p className={compStyles.latin}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
            )
        };

        const Margin = (props) => {

            const {margin} = props,
                bottomMargin = margin.split(" ")[2] || "0px";

            return (
                <span className={compStyles.marginIndicator} style={{height: bottomMargin}}>
                    <span className={compStyles.marginText}>margin {bottomMargin}</span>
                </span>
            )
        };

        return (
            <>
            {examples ? examples.map((example, i) => <Example key={i} example={example}/>) : null}
            </>
        );
    }
}

export default () => {

    const examples = TypographyExampleStaticQuery();

    return (
        <StyleGuideTypographyExample examples={examples}/>
    );
}
