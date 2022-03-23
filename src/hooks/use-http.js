import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const sendRequest = useCallback(async (request, functionToApply) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(request.url, {
        body: request.body ? JSON.stringify(request.body) : null,
        headers: request.headers ? request.headers : {},
        method: request.method ? request.method : "GET",
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const dataRetrieved = await response.json();
      setData(dataRetrieved)
      functionToApply && functionToApply(dataRetrieved);
    } catch {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    data,
    isError,
    sendRequest,
  };
};

export default useHttp;
