/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - privacy "banner" component.
 */

// Core dependencies
import Cookies from "js-cookie";
import React from "react";

// App dependencies
import ClickHandler from "../clickHandler/clickHandler";

// Styles
import globalStyles from "../../styles/global.module.css";
import compStyles from "./banner-privacy.module.css";

let bannerHtmlCollection;

class BannerPrivacy extends React.Component {

    constructor(props) {
        super(props);
        this.accept.bind(this);
        this.state = {bannerHeight: 0, visible: false};
    }

    componentDidMount() {

        // Privacy banner html collection
        bannerHtmlCollection = document.getElementsByClassName(compStyles.privacy);

        // Calculate privacy banner height
        this.calculatePrivacyBannerHeight();

        window.addEventListener("resize", this.calculatePrivacyBannerHeight);

        if ( Cookies.get("privacyAccepted") === undefined ) {

            this.setState({visible: true});
        }

        if ( Cookies.get("privacyAccepted") === true ) {

            this.setState({visible: false});
        }
    }

    componentWillUnmount() {

        window.removeEventListener("resize", this.calculatePrivacyBannerHeight);
    }

    componentDidUpdate(_, prevState) {

        if ( prevState.bannerHeight === 0 && Cookies.get("privacyAccepted") === undefined ) {

            // Calculate the banner height on initial render
            this.calculatePrivacyBannerHeight();
        }

        if (prevState.bannerHeight !== this.state.bannerHeight) {

            // Banner height has changed
            this.props.onBannerHeightChange(this.state.bannerHeight);
        }
    }

    calculatePrivacyBannerHeight = () => {

        let heightOfBanner;

        if ( bannerHtmlCollection.length > 0 ) {

            heightOfBanner = bannerHtmlCollection.item(0).offsetHeight;
        }
        else {

            heightOfBanner = 0;
        }

        this.setState({bannerHeight: heightOfBanner});
    };

    accept = () => {

        Cookies.set("privacyAccepted", true);

        this.setState({bannerHeight: 0});
        this.setState({visible: false});
    };

    render() {

        if (!this.state.visible) {
            return null;
        }

        return (
            <div className={compStyles.privacy}>
                <div className={globalStyles.container}>
                    <span>This website uses cookies for security and analytics purposes. By using this site, you agree to these uses. <a
                        className={compStyles.underline} href="/privacy">Learn more here</a>.</span>
                    <ClickHandler clickAction={() => {this.accept()}}tag={"span"}>
                        <span className={compStyles.underline}>Ok</span>.</ClickHandler>
                </div>
            </div>
        );
    }
}

export default BannerPrivacy;
