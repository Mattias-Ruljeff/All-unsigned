import React from "react";
import { Link } from "react-router-dom";


const NotFoundPage = () => {

  // The HTML that is being rendered.
  return (
    <div>
      <h1>404</h1>
      <p>Oops! Something went wrong!</p>
      <p>The page you were looking for doesen't exist</p>
      <p>
        <Link to="/">Go to home</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
