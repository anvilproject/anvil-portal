/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article socials component.
 * Provides social share links for the corresponding document.
 */

// Core dependencies
import {useLocation} from "@reach/router";
import React, {useContext} from "react";

// App dependencies
import ContextFrontmatter from "../context-frontmatter/context-frontmatter";
import Socials from "../socials/socials";
import SocialEmail from "../socials/social-email/social-email";
import SocialLinkedIn from "../socials/social-linkedin/social-linkedin";
import SocialTwitter from "../socials/social-twitter/social-twitter";

function ArticleSocials() {

    const {title} = useContext(ContextFrontmatter);
    const currentLocation = useLocation(),
        {href} = currentLocation || {};
    const encodedTitle = encodeURIComponent(`AnVIL - ${title}`).toString();
    const encodedURL = encodeURIComponent(href);
    const urlEmail = `mailto:?subject=${encodedTitle}&body=${encodedURL}`;
    const urlLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`;
    const urlTwitter = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}&via=useAnVIL`;

    return (
        <Socials articleBottom>
            <SocialTwitter bird url={urlTwitter}/>
            <SocialLinkedIn url={urlLinkedIn}/>
            <SocialEmail url={urlEmail}/>
        </Socials>
    );
}

export default ArticleSocials;
