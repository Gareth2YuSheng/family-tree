export const fetchData = async (url) => {
  const response = await fetch(url);

  // 1. Check for HTTP errors
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || `Error ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage); // Throwing here rejects the promise
  }

  // 2. Return the data
  const result = await response.json();
  return result; // This becomes the resolved value of the Promise
};