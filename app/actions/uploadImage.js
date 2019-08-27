const URL = process.env.URL;

export const uploadImage = async (file, name) => {
  try {
    const fd = new FormData();
    fd.append('image', file, name);
    const response = await fetch(`${URL}/api/image/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: { file: fd },
    });
    return await response.json();
  } catch (err) {
    return {
      error: 'Oops! Looks like something went wrong',
    };
  }
};
