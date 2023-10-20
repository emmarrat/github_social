import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
  returnTo: string;
}

const ProtectedRoute: React.FC<Props> = ({ isAllowed, children, returnTo }) => {
  if (!isAllowed) {
    return <Navigate to={returnTo} />;
  }

  return children as ReactElement;
};

export default ProtectedRoute;
