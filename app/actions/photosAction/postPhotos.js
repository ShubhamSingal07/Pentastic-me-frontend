const URL = process.env.URL;

export const postPhotos = async url => {
  try {
    const response = await fetch(`${URL}/api/photo`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      error: 'Oops! Looks like something went wrong',
    };
  }
};
