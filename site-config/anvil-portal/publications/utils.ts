import { SelectCategoryValueView } from "@databiosphere/findable-ui/lib/common/entities";
import { COLLATOR_CASE_INSENSITIVE } from "@databiosphere/findable-ui/lib/common/constants";

/**
 * Sorting function to sort publication years in descending order.
 * Uses a case-insensitive collator for string comparison.
 *
 * @param a - The first select category value view to compare.
 * @param b - The second select category value view to compare.
 * @returns A negative number if b should come before a, a positive number if a should come before b, or 0 if they are equal.
 */
export function sortByYearDescending(
  a: SelectCategoryValueView,
  b: SelectCategoryValueView
): number {
  return COLLATOR_CASE_INSENSITIVE.compare(b.label, a.label);
}
