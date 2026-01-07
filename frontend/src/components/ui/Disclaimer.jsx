import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer = () => (
    <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
        <div className="flex">
            <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 mr-3" />
            <div>
                <h3 className="text-sm font-medium text-orange-800">AI Explanation Disclaimer</h3>
                <p className="text-sm text-orange-700 mt-1">
                    This AI-generated explanation is for informational purposes only. It is not a diagnosis,
                    medical advice, or treatment recommendation. Always consult with a qualified healthcare professional
                    for interpretation of medical reports and clinical decisions.
                </p>
            </div>
        </div>
    </div>
);

export default Disclaimer;
