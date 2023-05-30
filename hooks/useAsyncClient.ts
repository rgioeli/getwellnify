import { useState } from "react";

/** This function takes a function that returns a promise and gets the data */
export const useAsyncClientFn = (
  func: (params: any | null) => Promise<any>,
  params?: any | null
) => {
  // We initialize the state data here
  // This will be pre-set when calling useAsyncClientFn
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<any>(null);

  // We will call this function when we want to make the request
  // We want to make a post request
  const execute = () => {
    setLoading(true);
    return func(params)
      .then((data) => {
        console.log(data);
        if (!data) {
          throw new Error("No results");
        }
        setLoading(false);
        setData(data);
        return data;
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(execute);

  return { execute, loading, error, data };
};

// const { loading, error, data, execute } = useAsyncClientFn(getPosts("1"));
