import React from 'react';

const NotFoundPage = ({ location }) => (
  <div>
    <h3>404 Page</h3>
    <p>
      No match for <code>{location.pathname}</code>
    </p>
  </div>
);

export default NotFoundPage;
