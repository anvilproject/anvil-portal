/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - socials component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import FrontmatterContext from "../context/frontmatter-context";
import * as RedirectService from "../../utils/redirect.service";

// Styles
import compStyles from "./socials.module.css";

// Images
import linkedin from "../../../images/logo-linkedin.svg"
import twitter from "../../../images/logo-twitter.svg";

function Socials() {

    function getEmailHREF(encodedTitle) {

        const encodedURL = getEncodedURL();

        return `mailto:?subject=${encodedTitle}&body=${encodedURL}`;
    }

    function getEncodedURL() {

        return encodeURIComponent(window.location.href);
    }

    function getLinkedinHREF() {

        const encodedURL = getEncodedURL();

        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`;
    }

    function getTwitterHREF(encodedTitle) {

        const encodedURL = getEncodedURL();

        return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}&via=useAnVIL`;
    }

    const frontmatterContext = useContext(FrontmatterContext),
        {title} = frontmatterContext;
    const encodedTitle = encodeURIComponent(`AnVIL - ${title}`).toString();

    return (
        <div className={compStyles.socials}>
            <button className={compStyles.twitter}
                    type="button"
                    onClick={() => RedirectService.redirect(getTwitterHREF(encodedTitle), title)}>
                <img src={twitter} alt="twitter"/>
            </button>
            <button className={compStyles.linkedin}
                    type="button"
                    onClick={() => RedirectService.redirect(getLinkedinHREF(), title)}>
                <img src={linkedin} alt="linkedin"/>
            </button>
            <button className={compStyles.email}
                    type="button"
                    onClick={() => RedirectService.redirect(getEmailHREF(encodedTitle), title)}>
                <span className="material-icons-round">email</span>
            </button>
        </div>
    );
}

export default Socials;
