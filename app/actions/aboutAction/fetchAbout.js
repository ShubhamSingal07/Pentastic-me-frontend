const URL = process.env.URL;

export const fetchAbout = async () => {
  try {
    const response = await fetch(`${URL}/api/about`, {
      headers: {
        Auhtorization: `Token ${localStorage.jwt}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      error: 'Oops! Looks like something went wrong',
    };
  }
};
