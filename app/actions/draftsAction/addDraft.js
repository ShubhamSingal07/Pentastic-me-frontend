const URL = process.env.URL;

export const addDraft = async (title, body, draftId) => {
  try {
    const response = await fetch(`${URL}/api/draft`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, draftId }),
    });
    return await response.json();
    // return data;
  } catch (err) {
    return {
      error: 'Oops! Looks like something went wrong',
    };
  }
};
