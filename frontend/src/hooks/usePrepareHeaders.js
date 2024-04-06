import useAuth from './useAuth';

const usePrepareHeaders = (headers) => {
  const { user } = useAuth();
  if (user) {
    const { token } = user;
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

export default usePrepareHeaders;
