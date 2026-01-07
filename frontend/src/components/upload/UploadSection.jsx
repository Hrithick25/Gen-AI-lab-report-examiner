import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

const UploadSection = ({ title, icon: Icon, fileTypes, onUpload, loading }) => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (fileTypes.includes(droppedFile.type)) {
                setFile(droppedFile);
                onUpload(droppedFile);
            } else {
                alert(`Please upload a valid ${fileTypes.join(', ')} file`);
            }
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (fileTypes.includes(selectedFile.type)) {
                setFile(selectedFile);
                onUpload(selectedFile);
            } else {
                alert(`Please upload a valid ${fileTypes.join(', ')} file`);
            }
        }
    };

    const handleClick = () => {
        document.getElementById(`file-input-${title.toLowerCase().replace(/\s+/g, '-')}`).click();
    };

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                id={`file-input-${title.toLowerCase().replace(/\s+/g, '-')}`}
                type="file"
                className="hidden"
                accept={fileTypes.join(',')}
                onChange={handleChange}
            />
            <div className="flex justify-center">
                <div className={`p-3 rounded-full ${loading ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <Icon className={`h-8 w-8 ${loading ? 'text-blue-600' : 'text-gray-600'}`} />
                </div>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-500">
                {fileTypes.includes('application/pdf') ? 'PDF files (max 10MB)' : 'Images (JPG, PNG, max 5MB)'}
            </p>
            <p className="mt-1 text-xs text-gray-400">Drag & drop or click to upload</p>
            {file && (
                <div className="mt-2 bg-gray-50 p-2 rounded text-sm text-gray-700 truncate">
                    {file.name}
                </div>
            )}
            {loading && (
                <div className="mt-4">
                    <Loader2 className="h-5 w-5 text-blue-600 animate-spin mx-auto" />
                </div>
            )}
        </div>
    );
};

export default UploadSection;
