/** Helper function that makes POST requests for us to our backend API (i.e. /api/posts/create-post).
 * It takes in the API url, the options for the request, and the data being sent to the server.
 * It returns back the data or error from the server in a {success: data, message: message} format */
type DataType = {
  success: any;
  message: string;
};

export const fetchPostRequest = async (
  apiUrl: string,
  data: object,
  signal: AbortController,
  options?: object
): Promise<any> => {
  try {
    const response = await fetch(apiUrl, {
      ...options,
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
      signal: signal.signal,
    });
    const { success, message }: DataType = await response.json();

    if (!success) {
      throw new Error(message);
    }

    return { success, message };
  } catch (e) {
    const error = e as Error;
    console.log(JSON.stringify(error.message));
  }
};
