/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - style guide typography component.
 * Used by the markdown page "/anvil-style-guide/typography".
 * <style-guide-typography></style-guide-typography>.
 */

// Core dependencies
import React from "react";

// App dependencies
import Hero from "../hero/hero";
import LogoFont from "../logo-font/logo-font";
import StyleGuideTypo from "../style-guide-typo/style-guide-typo";

function StyleGuideTypography() {

    return (
        <>
        <StyleGuideTypo><LogoFont>AnVIL</LogoFont></StyleGuideTypo>
        <StyleGuideTypo><h1>Heading1</h1></StyleGuideTypo>
        <StyleGuideTypo><h2>Heading2</h2></StyleGuideTypo>
        <StyleGuideTypo><h3>Heading3</h3></StyleGuideTypo>
        <StyleGuideTypo><h4>Heading4</h4></StyleGuideTypo>
        <StyleGuideTypo><h5>Heading5</h5></StyleGuideTypo>
        <StyleGuideTypo><p>Paragraph</p></StyleGuideTypo>
        <StyleGuideTypo><Hero>Hero</Hero></StyleGuideTypo>
        </>
    )
}

export default StyleGuideTypography;
