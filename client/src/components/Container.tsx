import React from 'react';

interface ContainerProps{
    children:React.ReactNode;
}
const Container = ({ children }:ContainerProps) => {
  return (
    <div className="container min-h-screen mx-auto px-0  sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Container;
