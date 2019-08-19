export const fetchHomePage = async () => {
  try {
    //   console.log('fetching home page in actions')
    const response = await fetch(`${process.env.URL}/api/home`, {
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
      },
    });
    const res = await response.json();
    // console.log(res);
  } catch (err) {
    console.log(err);
  }
};
