const URL = process.env.URL;

export const publishStory = async (title, body, image, description) => {
  try {
    const response = await fetch(`${URL}/api/story`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, image, description }),
    });
    return await response.json();
  } catch (err) {
    return {
      error: 'Oops! Looks like something went wrong',
    };
  }
};
