export const isAuthenticated = () => true; // Replace with real auth logic

export const setAuthenticated = () => {
  // Set authentication state
  localStorage.setItem("isLoggedIn", "true");
};

export const logout = () => {
  // Clear session
  localStorage.clear();
  window.location.reload();
};