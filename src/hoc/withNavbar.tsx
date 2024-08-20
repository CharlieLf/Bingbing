import React from 'react';
import Navbar from '../components/Navbar';

const withNavbar = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    return (
      <div>
        <Navbar />
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withNavbar;