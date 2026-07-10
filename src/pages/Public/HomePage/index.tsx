import React from 'react';
import { Button, Card } from '@components';

const HomePage: React.FC = () => (
  <div className="max-w-6xl mx-auto p-6 space-y-6">
    <h1 className="text-2xl font-semibold">Home</h1>
    <Card>
      <p className="mb-4">Welcome to the boilerplate.</p>
      <Button>Get Started</Button>
    </Card>
  </div>
);

export default HomePage;

