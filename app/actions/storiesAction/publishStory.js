const URL = process.env.URL;

export const publishStory = async (title, body, image) => {
  try {
    const response = await fetch(`${URL}/api/story`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, image }),
    });
    return await response.json();
    // return data;
  } catch (err) {
    return {
      error: 'Oops! Looks like something went wrong',
    };
  }
};
