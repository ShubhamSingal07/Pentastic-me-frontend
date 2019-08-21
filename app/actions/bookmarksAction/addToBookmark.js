const URL = process.env.URL;

const addToBookmark = async storyId => {
  try {
    const response = await fetch(`${URL}/api/bookmark`, {
      method: 'POST',
      headers: {
        Auhtorization: `Token ${localStorage.jwt}`,
      },
    });
    return await response.json();
  } catch (err) {
    return {
      error: 'Oops! Looks like something qent wrong',
    };
  }
};
