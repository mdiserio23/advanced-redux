const sendRequest = async (request) => {
  const response = await fetch(request.url, {
    body: request.body ? JSON.stringify(request.body) : null,
    method: request.method ? request.method : "GET",
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const data = await response.json();
  return data
};
export default sendRequest