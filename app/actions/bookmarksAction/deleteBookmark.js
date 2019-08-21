const URL = process.env.URL;

export const deleteBookmark = async storyId => {
  try {
    const response = await fetch(`${URL}/api/draft/${storyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    return await response.json();
  } catch (err) {
    return {
      error: 'Oops! Looks like something went wrong',
    };
  }
};
