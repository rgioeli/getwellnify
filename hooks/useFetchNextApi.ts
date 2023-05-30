import { FetchOptions } from "@/types/FetchType";
import { useState, useCallback } from "react";

type ExecuteFunction = (body?: any) => Promise<any>;

type FetchNextApiResult = {
  data: any;
  error: string | null;
  loading: boolean;
  execute: ExecuteFunction;
};

/** Use this function to GET, POST, UPDATE, or DELETE to a custom Next api route in the pages folder */
export const useFetchNextApi = (
  apiRoute: string,
  options: FetchOptions,
  dependencies: any[] = [],
  apiRouteSearchParams?: string
): FetchNextApiResult => {
  const url = `${apiRoute}${
    apiRouteSearchParams ? "?" + apiRouteSearchParams : ""
  }`;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>({ success: false, message: "" });

  const execute: ExecuteFunction = useCallback((body?) => {
    setLoading(true);
    let optionsBody = JSON.stringify(body);
    return fetch(url, { ...options, body: optionsBody })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((data) => {
        console.log("INSIDE FETCH CALL => ", data);
        if (!data.success) {
          throw new Error(
            data.message || "A server error occured preventing data"
          );
        }
        setError(null);
        setData(data); //* returned as a {success: _, message: _} object
        return data;
      })
      .catch((error) => {
        setData({ success: false, message: "" });
        setError(error.message || "An error occured");
        console.log(error.message || "An error occured");

        return null;
      })
      .finally(() => {
        setLoading(false);

        console.log("Promise has finished computing.");
      });
  }, dependencies);

  return { data, error, loading, execute };
};
