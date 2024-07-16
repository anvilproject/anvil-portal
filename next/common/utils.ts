import { PathParameter } from "./entities";

/**
 * Replaces path parameters in the given URL string e.g. {portalURL} with the corresponding path.
 * @param str - URL string, with parameters.
 * @param pathParameter - Path parameter.
 * @returns string with path parameters replaced.
 */
export function replacePathParameters(
  str: string,
  pathParameter: PathParameter
): string {
  const decodedUrl = decodeURI(str);
  const result = Object.entries(pathParameter).reduce(
    (acc, [parameter, parameterValue]) => {
      const regex = new RegExp(`\\{${parameter}}`, "g");
      return acc.replace(regex, parameterValue);
    },
    decodedUrl
  );
  if (/\[\w+]/.test(result)) {
    throw new Error(`URL still contains path parameters: ${result}`);
  }
  return result;
}
