const URL = process.env.URL;

export const sendMail = async (name, email, message) => {
  try {
    const response = await fetch(`${URL}/api/contact/mail`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });
    return await response.json();
  } catch (err) {
    return {
      error: 'Oops! Looks like something went wrong',
    };
  }
};
