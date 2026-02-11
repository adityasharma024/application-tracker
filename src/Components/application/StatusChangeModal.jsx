import { useState } from "react";
import { X, AlertTriangle } from 'lucide-react';
function StatusChangeModal({
    isOpen,
    onClose,
    onConfirm,
    currentStatus,
    newStatus,
    applicationName
}) {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    if (!isOpen) return null;
    const requireReason = newStatus === 'rejected';
    const formatStatus = (status) => {
        const statusMap = {
            'applied': 'Applied',
            'hr-round': 'HR Round',
            'technical-round': 'Technical Round',
            'offer': 'Offer',
            'rejected': 'Rejected'
        };
        return statusMap[status] || status;

    };
    const handleConfirm = () => {
        if (requireReason && !reason.trim()) {
            setError('Please Provide a reason for rejection');
            return;
        }
        onConfirm(reason.trim() || null);
        setReason('');
        setError('');

    };
    const handleClose = () => {
        setReason('');
        setError('');
        onClose();


    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        Confirm Status Change
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="mb-6">
                    <p className="text-gray-600 mb-4">
                        Change status for <strong>{applicationName}</strong>:
                    </p>

                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                            {formatStatus(currentStatus)}
                        </span>
                        <span className="text-gray-400">→</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${newStatus === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : newStatus === 'offer'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                            }`}>
                            {formatStatus(newStatus)}
                        </span>
                    </div>

                    {/* Reason for Rejection */}
                    {requireReason && (
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                                <label className="text-sm font-semibold text-gray-700">
                                    Reason for rejection <span className="text-red-500">*</span>
                                </label>
                            </div>
                            <textarea
                                value={reason}
                                onChange={(e) => {
                                    setReason(e.target.value);
                                    setError('');
                                }}
                                placeholder="e.g., Not a good fit, Salary mismatch, etc."
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none ${error ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                rows={3}
                            />
                            {error && (
                                <p className="text-sm text-red-600 mt-1">{error}</p>
                            )}
                        </div>
                    )}

                    {/* Optional reason for other statuses */}
                    {!requireReason && (
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Add a note (optional)
                            </label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="e.g., Interview scheduled for next week"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                rows={2}
                            />
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                    <button
                        onClick={handleClose}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-colors ${newStatus === 'rejected'
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        Confirm
                    </button>
                </div>

            </div>
        </div>

    )

}
export default StatusChangeModal;