import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, mustVerifyEmail, status }) {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Super Admin Dashboard
                </h2>
            }
        >
            <Head title="Super Admin Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Tab Navigation */}
                    <div className="bg-white shadow-sm rounded-lg mb-6">
                        <nav className="flex space-x-8 px-6">
                            {['overview', 'profile', 'users', 'settings'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === tab
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Quick Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
                                    <p className="text-3xl font-bold text-blue-600">152</p>
                                    <p className="text-sm text-gray-500">Registered users</p>
                                </div>
                                
                                <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-800">Club Admins</h3>
                                    <p className="text-3xl font-bold text-green-600">8</p>
                                    <p className="text-sm text-gray-500">Active administrators</p>
                                </div>
                                
                                <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-800">Clubs</h3>
                                    <p className="text-3xl font-bold text-purple-600">12</p>
                                    <p className="text-sm text-gray-500">Active clubs</p>
                                </div>
                            </div>

                            {/* Action Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </div>
                                        <h3 className="ml-4 text-lg font-semibold text-gray-800">Manage Club Admins</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">Create and manage club administrators.</p>
                                    <Link 
                                        href={route('super.admin.create')} 
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Create Club Admin
                                    </Link>
                                </div>

                                <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="p-3 bg-green-100 rounded-lg">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                        </div>
                                        <h3 className="ml-4 text-lg font-semibold text-gray-800">User Management</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">View and manage all system users.</p>
                                    <Link 
                                        href={route('user.management')} 
                                        className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Manage Users
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Profile Tab - Integrated Breeze Profile Features */}
                    {activeTab === 'profile' && (
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <div className="max-w-2xl mx-auto">
                                <h3 className="text-lg font-semibold text-gray-800 mb-6">Profile Information</h3>
                                
                                {/* Profile Update Form */}
                                <div className="mb-8">
                                    <h4 className="text-md font-medium text-gray-700 mb-4">Update Profile Information</h4>
                                    <Link 
                                        href={route('profile.edit')}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Edit Profile
                                    </Link>
                                </div>

                                {/* Current User Info */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h4 className="text-md font-medium text-gray-700 mb-4">Current Information</h4>
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{auth.user.name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{auth.user.email}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Role</dt>
                                            <dd className="mt-1 text-sm text-gray-900">Super Administrator</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Member since</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(auth.user.created_at).toLocaleDateString()}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                {/* Email Verification Status */}
                                {mustVerifyEmail && auth.user.email_verified_at === null && (
                                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                                        <p className="text-sm text-yellow-800">
                                            Your email address is unverified.
                                            <Link
                                                href={route('verification.send')}
                                                method="post"
                                                as="button"
                                                className="underline text-sm text-yellow-600 hover:text-yellow-500 ml-2"
                                            >
                                                Click here to re-send the verification email.
                                            </Link>
                                        </p>
                                        {status === 'verification-link-sent' && (
                                            <div className="mt-2 text-sm text-green-600">
                                                A new verification link has been sent to your email address.
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Password Update */}
                                <div className="border-t border-gray-200 pt-6 mt-6">
                                    <h4 className="text-md font-medium text-gray-700 mb-4">Update Password</h4>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Ensure your account is using a long, random password to stay secure.
                                    </p>
                                    <Link 
                                        href={route('profile.edit')}
                                        className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Update Password
                                    </Link>
                                </div>

                                {/* Account Deletion */}
                                <div className="border-t border-gray-200 pt-6 mt-6">
                                    <h4 className="text-md font-medium text-gray-700 mb-4">Delete Account</h4>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Once your account is deleted, all of its resources and data will be permanently deleted.
                                    </p>
                                    <Link 
                                        href={route('profile.edit')}
                                        className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Delete Account
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">User Management</h3>
                            <p className="text-gray-600">User management features will be implemented here.</p>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">System Settings</h3>
                            <p className="text-gray-600">System configuration settings will be implemented here.</p>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}