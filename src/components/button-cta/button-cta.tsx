/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - button cta component.
 * Provides styling to a call to action similar to a button.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import { Link } from "gatsby";
import React, { FC, ReactNode } from "react";

// App dependencies
import ButtonSize from "../button/button-size";
import ButtonTheme from "../button/button-theme";
import ButtonCtaNavigationMethod from "./button-cta-navigation-method";
import Target from "../target/target.model";

// Styles
import { button, large, primary, secondary } from "./button-cta.module.css";

interface Props {
  attributeHREF: string;
  buttonSize?: ButtonSize;
  buttonTheme?: ButtonTheme;
  children: ReactNode;
}

/**
 * Returns navigation method:
 * - HTML_ANCHOR - standard external navigation using anchor tag,
 * - IN_ROUTE_NAV - in-route navigation with a hash also using anchor tag, or
 * - GATSBY_LINK - in-route navigation using gatsby link.
 * @param attributeHREF
 */
function getNavigationMethod(attributeHREF: string): ButtonCtaNavigationMethod {
  /* Start with external navigation. */
  let navigationType = ButtonCtaNavigationMethod.HTML_ANCHOR;
  /* In-route navigation - test link is internal. */
  /* See https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/#reminder-use-link-only-for-internal-links. */
  if (/^\/(?!\/)/.test(attributeHREF)) {
    navigationType = ButtonCtaNavigationMethod.GATSBY_LINK;
    /* In-route navigation with a hash - test for fragment. */
    if (/#/.test(attributeHREF)) {
      navigationType = ButtonCtaNavigationMethod.IN_ROUTE_HTML_ANCHOR;
    }
  }
  return navigationType;
}

const ButtonCta: FC<Props> = ({
  attributeHREF,
  buttonSize,
  buttonTheme,
  children,
}): JSX.Element => {
  /* Determine the type of navigation to be used by the call to action. */
  const navigationType = getNavigationMethod(attributeHREF);
  const buttonClassNames =
    classNames({
      [button]: buttonTheme !== ButtonTheme.NONE,
      [large]: buttonSize === ButtonSize.LARGE,
      [primary]: buttonTheme === ButtonTheme.PRIMARY,
      [secondary]: buttonTheme === ButtonTheme.SECONDARY,
    }) || undefined;

  if (navigationType === ButtonCtaNavigationMethod.GATSBY_LINK) {
    return (
      <Link className={buttonClassNames} to={attributeHREF}>
        {children}
      </Link>
    );
  }
  if (navigationType === ButtonCtaNavigationMethod.HTML_ANCHOR) {
    return (
      <a
        className={buttonClassNames}
        href={attributeHREF}
        rel="noopener"
        target={Target.BLANK}
      >
        {children}
      </a>
    );
  }
  return (
    <a className={buttonClassNames} href={attributeHREF} target={Target.SELF}>
      {children}
    </a>
  );
};

ButtonCta.defaultProps = {
  buttonSize: ButtonSize.NONE,
  buttonTheme: ButtonTheme.NONE,
};

export default ButtonCta;
