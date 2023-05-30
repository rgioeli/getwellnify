import { FetchOptions } from "@/types/FetchType";

/** Only to be used with external API calls (i.e. JSONPlaceholder)
 *
 *  How to use:
 *
 *  Takes in a URL and options (optional) and returns the data or null
 */
export const fetchExternalApi = (url: string, options?: FetchOptions) => {
  return fetch(url, options)
    .then((response) => {
      // Handle
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then((data) => {
      // Handle successful responses here
      if (process.env.NODE_ENV === "production") {
        if (!data.success) {
          throw new Error(data.message);
        }
      }

      return data;
    })
    .catch((error) => {
      // Handle error responses here
      console.log(error);
      return null;
    });
};
