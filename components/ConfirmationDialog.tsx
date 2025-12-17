'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ConfirmationDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDangerous?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmationDialog({
    isOpen,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDangerous = false,
    onConfirm,
    onCancel,
}: ConfirmationDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4">
                {/* Icon and Title */}
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg flex-shrink-0 ${
                        isDangerous ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                        <AlertCircle className={`w-6 h-6 ${
                            isDangerous ? 'text-red-600' : 'text-blue-600'
                        }`} />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                        <p className="text-sm text-gray-600 mt-1">{message}</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-colors ${
                            isDangerous
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

