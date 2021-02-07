export const useFetch = async (path: string) => {
  let response = await fetch(`http://3.137.211.94:5000/v1${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: "lnardon", password: "test" }),
  });
  let parsedResponse = await response.json();
  return parsedResponse;
};
