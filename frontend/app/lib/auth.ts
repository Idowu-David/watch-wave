export const setAuthenticated = () => {
  // Save a "true" value to the browser's storage
  if (typeof window !== "undefined") {
    localStorage.setItem("isLoggedIn", "true");
  }
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isLoggedIn") === "true";
  }
  return false;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login"; // Redirect to login on logout
  }
};