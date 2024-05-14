export const getProfileInfo = async () => {
  try {
    const response = await fetch("/api/users/profile");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
