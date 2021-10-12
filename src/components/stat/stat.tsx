/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - stat component.
 */

// Core dependencies
import React, { FC, ReactNode } from "react";

// Styles
import * as compStyles from "./stat.module.css";

interface Props {
  children: ReactNode;
  stat: number;
  unit?: string;
}

const Stat: FC<Props> = ({ children, stat, unit }): JSX.Element => {
  return (
    <div className={compStyles.stat}>
      <span className={compStyles.count}>
        {stat}+ {unit || null}
      </span>
      <span className={compStyles.label}>{children}</span>
    </div>
  );
};

Stat.defaultProps = {
  unit: "",
};

export default Stat;
