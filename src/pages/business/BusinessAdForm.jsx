import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Calendar } from 'lucide-react';
import { businessApi } from '../../api';

export default function BusinessAdForm() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        mediaUrl: '',
        startDate: '',
        endDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            // Replace with actual API call
            await businessApi.postAd(formData);
            setSuccess(true);
            setFormData({
                title: '',
                content: '',
                mediaUrl: '',
                startDate: '',
                endDate: ''
            });
        } catch (err) {
            setError('Failed to submit advertisement request');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                            Create Advertisement Request
                        </h3>

                        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Content
                                </label>
                                <textarea
                                    name="content"
                                    id="content"
                                    rows={4}
                                    required
                                    value={formData.content}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Media URL
                                </label>
                                <input
                                    type="url"
                                    name="mediaUrl"
                                    id="mediaUrl"
                                    required
                                    value={formData.mediaUrl}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Start Date
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            type="datetime-local"
                                            name="startDate"
                                            id="startDate"
                                            required
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                        />
                                        <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        End Date
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            type="datetime-local"
                                            name="endDate"
                                            id="endDate"
                                            required
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                        />
                                        <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="text-sm text-red-600 dark:text-red-400">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="text-sm text-green-600 dark:text-green-400">
                                    Advertisement request submitted successfully!
                                </div>
                            )}

                            <div className="flex justify-end">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm
                    ${loading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                        }`}
                                >
                                    {loading ? 'Submitting...' : 'Submit Advertisement'}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}