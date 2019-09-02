const URL = process.env.URL;

export const publishDraft = async (draftId, title, body, image) => {
  try {
    const response = await fetch(`${URL}/api/draft/publish`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ draftId, title, body, image }),
    });
    return await response.json();
    // return data;
  } catch (err) {
    return {
      error: 'Oops! Looks Like something went wrong',
    };
  }
};
