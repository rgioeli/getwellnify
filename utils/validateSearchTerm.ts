import { fetchExternalApi } from "./fetchExternalApi";
import { flattenNestedArray } from "./flattenNestedArray";

/** Takes in a search term for the health diagnosis API and returns either true, false, or an error concerning the status of the search term within the API */
export const validateSearchTerm = async (searchTerm: string | undefined) => {
  try {
    if (!searchTerm) {
      throw new Error("No channel search param was added.");
    }
    const res = await fetchExternalApi(
      `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${searchTerm}`
    );

    if (!res[3].length) throw new Error("Not a valid channel value");

    const doesInclude = flattenNestedArray(res).includes(searchTerm);
    if (!doesInclude) throw new Error("That channel value does not exist.");

    return doesInclude;
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
  }
};
