/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - dashboard search selected term component.
 */

// Core dependencies
import React from "react";

// Styles
import * as compStyles from "./dashboard-search-selected-term.module.css";

// Template Variables
const Operator = {
  AND: "AND",
  NAND: "AND NOT",
  NOT: "NOT",
  OR: "OR",
};

function DashboardSearchSelectedTerm(props) {
  const { facet, first, last, onHandleClearTerm, termOperator } = props;
  const [term, logicalOperator] = termOperator;
  const operator = Operator[logicalOperator];
  const firstOperator = first && operator === Operator.NAND ? Operator.NOT : "";

  return (
    <>
      <span>
        {first ? (
          <>
            <span className={compStyles.bracket}>(</span>
            {firstOperator && (
              <span className={compStyles.operator}>{firstOperator}</span>
            )}
          </>
        ) : (
          <span className={compStyles.operator}>{operator}</span>
        )}
        <span
          className={compStyles.term}
          onClick={() => onHandleClearTerm(facet, logicalOperator, term)}
          role={"presentation"}
        >
          {term}
        </span>
        {last ? <span className={compStyles.bracket}>)</span> : null}
      </span>
    </>
  );
}

export default DashboardSearchSelectedTerm;
