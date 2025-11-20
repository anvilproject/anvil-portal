import * as path from "path";

/**
 * Resolves an absolute docs path from a single set of directory segments.
 * TODO - Update with function from @databiosphere/findable-ui.
 * @param relativeDirs - Directory segments relative to the docs root.
 * @returns Absolute path.
 */
export function resolveRelativeDirs(relativeDirs: string[]): string {
  return path.join(process.cwd(), ...relativeDirs);
}
