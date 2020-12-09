import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h2>404</h2>
      <h2>Page not found</h2>
      <p>
        <Link to="/" className="btn btn-primary">
          Back to homepage
        </Link>
      </p>
    </>
  );
}
export default NotFoundPage;
