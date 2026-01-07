import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => (
    <div className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-2" />
        <p className="text-gray-600">Processing...</p>
    </div>
);

export default Loader;
