import React from 'react';
import { useParams } from 'react-router-dom';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';

const UploadDocumentPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [file, setFile] = React.useState<File | null>(null);
    const [dragging, setDragging] = React.useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) setFile(dropped);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Upload Document</h1>
                <p className="text-gray-500 mb-6 text-sm">Session #{id}</p>

                <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-colors cursor-pointer ${dragging ? 'border-teal-400 bg-teal-50' : 'border-gray-300 bg-white'}`}
                >
                    <FiUpload className="w-10 h-10 text-teal-500 mb-3" />
                    <p className="text-gray-600 font-medium">Drag & drop your file here</p>
                    <p className="text-gray-400 text-sm mt-1">or click to browse</p>
                    <input
                        type="file"
                        className="absolute opacity-0 w-full h-full cursor-pointer"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </div>

                {file && (
                    <div className="mt-4 flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <FiFile className="text-teal-500 w-5 h-5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 flex-1 truncate">{file.name}</span>
                        <button onClick={() => setFile(null)}>
                            <FiX className="text-gray-400 hover:text-red-500 transition-colors" />
                        </button>
                    </div>
                )}

                <button
                    disabled={!file}
                    className="mt-6 w-full py-3 rounded-xl bg-teal-500 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-600 transition-colors"
                >
                    Upload Document
                </button>
            </div>
        </div>
    );
};

export default UploadDocumentPage;
