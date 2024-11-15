import React, { useState, useEffect } from 'react';
import RenderPage from '../../components/RenderPage';
import Navigator from '../../components/Navigator';

const RequestsComponent = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const data = [
            { id: 1, status: 'pending', name: 'Request 1', type: 'Course Withdrawal', message: 'Requesting course withdrawal for personal reasons.', date: '2024-10-01' },
            { id: 3, status: 'rejected', name: 'Request 3', type: 'Grade Review', message: 'Requesting a review of my final exam grades.', date: '2024-09-15' },
            { id: 4, status: 'accepted', name: 'Request 4', type: 'Course Withdrawal', message: 'Request for course withdrawal due to health reasons.', date: '2024-08-25' },
            { id: 5, status: 'pending', name: 'Request 5', type: 'Course Change', message: 'Requesting a course change to improve academic performance.', date: '2024-11-10' },
          ];

        setRequests(data);
    }, []);

    const pendingRequests = requests.filter(r => r.status === 'pending');
    const rejectedRequests = requests.filter(r => r.status === 'rejected');
    const acceptedRequests = requests.filter(r => r.status === 'accepted');

    return (
        <>
        <Navigator/>
        <div className="p-8 rounded-lg">
            <div className='w-1/2 m-auto'>
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Request History</h1>

                {/* Pending Requests */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">🔔 Pending Requests</h2>
                    {pendingRequests.length > 0 ? (
                        <ul>
                            {pendingRequests.map(request => (
                                <li key={request.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                                    <p className="text-lg font-medium text-gray-800">{request.name}</p>
                                    <p className="text-sm text-gray-500">Type: {request.type}</p>
                                    <p className="text-sm text-gray-500">Date: {request.date}</p>
                                    <p className="text-sm text-gray-500">Status: Pending</p>
                                    <p className="text-sm text-gray-500 mt-2">Message: {request.message}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex items-center space-x-2 p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
                            <span className="text-yellow-500 text-3xl">⚠️</span>
                            <p className="text-lg text-gray-700">No pending requests at the moment.</p>
                        </div>
                    )}
                </div>

                {/* Rejected Requests */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">🚫 Rejected Requests</h2>
                    {rejectedRequests.length > 0 ? (
                        <ul>
                            {rejectedRequests.map(request => (
                                <li key={request.id} className="mb-4 p-4 border border-red-100 bg-red-50 rounded-lg">
                                    <p className="text-lg font-medium text-red-600">{request.name}</p>
                                    <p className="text-sm text-gray-500">Type: {request.type}</p>
                                    <p className="text-sm text-gray-500">Date: {request.date}</p>
                                    <p className="text-sm text-gray-500">Status: Rejected</p>
                                    <p className="text-sm text-gray-500 mt-2">Message: {request.message}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex items-center space-x-2 p-4 border border-red-300 bg-red-50 rounded-lg">
                            <span className="text-red-500 text-3xl">❌</span>
                            <p className="text-lg text-gray-700">No rejected requests at the moment.</p>
                        </div>
                    )}
                </div>

                {/* Accepted Requests */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">✅ Accepted Requests</h2>
                    {acceptedRequests.length > 0 ? (
                        <ul>
                            {acceptedRequests.map(request => (
                                <li key={request.id} className="mb-4 p-4 border border-green-100 bg-green-50 rounded-lg">
                                    <p className="text-lg font-medium text-green-600">{request.name}</p>
                                    <p className="text-sm text-gray-500">Type: {request.type}</p>
                                    <p className="text-sm text-gray-500">Date: {request.date}</p>
                                    <p className="text-sm text-gray-500">Status: Accepted</p>
                                    <p className="text-sm text-gray-500 mt-2">Message: {request.message}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex items-center space-x-2 p-4 border border-green-300 bg-green-50 rounded-lg">
                            <span className="text-green-500 text-3xl">✔️</span>
                            <p className="text-lg text-gray-700">No accepted requests at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

const ViewRequests = () => {
    return <RenderPage component={<RequestsComponent />} />
}

export default ViewRequests;
