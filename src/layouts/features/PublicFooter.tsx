import React, { memo } from 'react';

const PublicFooter: React.FC = memo(() => (
    <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto p-4">© {new Date().getFullYear()}</div>
    </footer>
));

export default PublicFooter;


