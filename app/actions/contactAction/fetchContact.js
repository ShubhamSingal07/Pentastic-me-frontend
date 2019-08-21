const URL = process.env.URL;

export const fetchContact = async () => {
  try {
    const response = await fetch(`${URL}/api/contact`, {
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
