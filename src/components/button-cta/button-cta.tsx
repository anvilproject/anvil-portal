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
import Target from "../target/target.model";

// Styles
import { button, large, primary, secondary } from "./button-cta.module.css";

interface Props {
  attributeHREF: string;
  buttonSize?: ButtonSize;
  buttonTheme?: ButtonTheme;
  children: ReactNode;
}

const ButtonCta: FC<Props> = ({
  attributeHREF,
  buttonSize,
  buttonTheme,
  children,
}): JSX.Element => {
  const internalCta = /^\/(?!\/)/.test(
    attributeHREF
  ); /* See https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/#reminder-use-link-only-for-internal-links. */
  const buttonClassNames = classNames({
    [button]: buttonTheme !== ButtonTheme.NONE,
    [large]: buttonSize === ButtonSize.LARGE,
    [primary]: buttonTheme === ButtonTheme.PRIMARY,
    [secondary]: buttonTheme === ButtonTheme.SECONDARY,
  });

  return internalCta ? (
    <Link className={buttonClassNames} to={attributeHREF}>
      {children}
    </Link>
  ) : (
    <a
      className={buttonClassNames}
      href={attributeHREF}
      rel="noopener"
      target={Target.BLANK}
    >
      {children}
    </a>
  );
};

ButtonCta.defaultProps = {
  buttonSize: ButtonSize.NONE,
  buttonTheme: ButtonTheme.NONE,
};

export default ButtonCta;
