const useAuth = () => {
  const getUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  };
  const login = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
  };
  const logout = () => {
    localStorage.removeItem('user');
  };
  return { login, logout, user: getUser() };
};

export default useAuth;
