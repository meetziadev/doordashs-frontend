import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="max-w-2xl mx-auto p-10 text-center">
    <h1 className="text-3xl font-semibold mb-2">404 - Page Not Found</h1>
    <p className="mb-6">The page you are looking for does not exist.</p>
    <Link to="/" className="text-blue-600">Go Home</Link>
  </div>
);

export default NotFound;

