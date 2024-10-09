import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Alert = ({ children }) => (
  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
    <div className="flex">
      <AlertCircle className="h-6 w-6 mr-2" />
      <div>{children}</div>
    </div>
  </div>
);

export const AlertDescription = ({ children }) => <p>{children}</p>;