import { ErrorBoundary, Provider } from '@rollbar/react';
import React from 'react';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: process.env.REACT_APP_ENV_MODE,
};
const RollbarProvider = ({ children }) => {
  // check our environment
  const isProd = process.env.NODE_ENV === 'production';
  return isProd ? (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Provider>
  ) : (
    children
  );
};

export default RollbarProvider;
