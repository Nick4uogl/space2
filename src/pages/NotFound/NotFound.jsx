import React from 'react';
import './notFound.scss';
import Header from '../../components/Header/Header';

function NotFound(props) {
  return (
    <div>
      <Header />
      <p className="not-found">{props.message}</p>
    </div>
  );
}

export default NotFound;
