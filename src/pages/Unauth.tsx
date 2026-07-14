import React from 'react';
import { Link } from 'react-router-dom';

const Unauth: React.FC = () => (
  <div className="max-w-2xl mx-auto p-10 text-center">
    <h1 className="text-2xl font-semibold mb-2">Unauthorized</h1>
    <p className="mb-6">You don't have access to view this page.</p>
    <Link to="/" className="text-blue-600">Go Home</Link>
  </div>
);

export default Unauth;

