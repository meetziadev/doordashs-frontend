import React from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = { title: string };

const ComingSoonPage: React.FC<Props> = ({ title }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();

  return (
    <div className="max-w-6xl mx-auto p-6 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-primary-600">{title}</p>
      <h1 className="mt-2 text-3xl font-semibold text-gray-900">Coming soon</h1>
      <p className="mt-3 text-gray-500">We're working on this page. Check back soon.</p>
      {query && (
        <p className="mt-6 inline-block rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-600">
          Applied filters: {query}
        </p>
      )}
    </div>
  );
};

export default ComingSoonPage;
