import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const ConsoleOutput = ({ logs, title = "System Output" }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg border border-gray-800 font-mono text-sm my-6">
            <div className="bg-gray-900 px-4 py-2 flex items-center border-b border-gray-800">
                <Terminal className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-gray-400 font-semibold">{title}</span>
                <div className="ml-auto flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
            </div>
            <div className="p-4 h-64 overflow-y-auto text-green-400 space-y-1">
                {logs.length === 0 ? (
                    <div className="text-gray-600 italic">Waiting for input...</div>
                ) : (
                    logs.map((log, index) => (
                        <div key={index} className="break-words">
                            <span className="text-gray-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                            <span className={log.type === 'error' ? 'text-red-400' : 'text-green-400'}>
                                {log.type === 'cmd' ? '> ' : ''}{log.message}
                            </span>
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default ConsoleOutput;
