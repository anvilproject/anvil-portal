import { useLayoutDimensions } from "@databiosphere/findable-ui/lib/providers/layoutDimensions/hook";

export const useScrollMarginTop = (): number => {
  const { dimensions } = useLayoutDimensions();
  const { header } = dimensions;
  const { height } = header;

  // Add 16px for spacing.
  return height + 16;
};
