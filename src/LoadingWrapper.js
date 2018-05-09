// LoadingWrapper.js

import React from 'react';

export const Loading = ({message = 'Loading...'}) => <h3>{ message }</h3>;

export const LoadingWrapper = ({isLoading, children, message}) => {
  return isLoading ? <Loading message={ message }/> : children;
};