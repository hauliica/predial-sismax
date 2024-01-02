'use client';

import React, {useCallback, useState} from 'react';
import {Receipt, WalletCards} from "lucide-react";

const useDisclosure = (defaultOpen = false) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const onOpen = useCallback(() => setIsOpen(true), [])
    const onClose = useCallback(() => setIsOpen(false), [])
    const onToggle = useCallback(() => setIsOpen(prev => !prev), [])

    return {isOpen, onOpen, onToggle, onClose}
}

export default function PlaygroundPage() {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <div className="bg-gray-100 dark:bg-black p-5 min-h-screen">
            <div className="max-w-4xl mx-auto py-10 space-y-4">
                {/* Owner Information */}
                <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="p-4">
                        <div className="flex items-center">
                            <div
                                className="mr-4 bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center uppercase font-semibold text-sm">JD
                            </div>
                            <div>
                                <h5 className="text-lg font-semibold dark:text-gray-200">John Doe</h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Property Owner</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end p-4">
            <span
                className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900 uppercase">
              Verified
            </span>
                    </div>
                </div>

                // Payment History
                <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="p-4">
                        <h5 className="text-lg font-semibold mb-3 dark:text-gray-200">Payment History</h5>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="border-b">
                                <tr>
                                    <th className="text-left p-4">Date</th>
                                    <th className="text-left p-4">Amount</th>
                                    <th className="text-left p-4">Status</th>
                                    <th className="text-left p-4">Receipt</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="border-b">
                                    <td className="p-4">2023-01-01</td>
                                    <td className="p-4">$1,000</td>
                                    <td className="p-4">Paid</td>
                                    <td className="p-4">
                                        <button className="text-blue-500 hover:text-blue-600" title="View Receipt">
                                            <Receipt className="h-4 w-4"/>
                                        </button>
                                    </td>
                                </tr>
                                {/* More table rows */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                // Current Amount Due
                <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="p-4">
                        <h5 className="text-lg font-semibold mb-2 dark:text-gray-200">Current Amount Due</h5>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-red-500 dark:text-red-300">$2,500</span>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={onOpen}>
                                Pay Now
                            </button>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-red-500 h-2.5 rounded-full" style={{width: '75%'}}></div>
                        </div>
                    </div>
                </div>

                // Payment Modal
                {isOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                         id="my-modal">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                                <h5 className="text-lg font-semibold dark:text-gray-200">Payment Options</h5>
                                <div className="mt-2 px-7 py-3">
                                    <div className="flex flex-col space-y-4">
                                        {/* Buttons for payment options */}
                                        <button
                                            className="flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                            Credit / Debit Card <WalletCards className="h-4 w-4 ml-2"/>
                                        </button>
                                        {/* ... other buttons ... */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}