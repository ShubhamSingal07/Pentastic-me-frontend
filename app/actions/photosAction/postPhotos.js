const URL = process.env.URL;

export const postPhotos = async (url, signal) => {
  try {
    const response = await fetch(`${URL}/api/photo`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
      signal,
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    if (err.name === 'AbortError') return true;
    return {
      error: 'Oops! Looks like something went wrong',
    };
  }
};
