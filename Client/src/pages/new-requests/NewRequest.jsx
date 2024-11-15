import React, { useState, useEffect } from 'react';
import RenderPage from '../../components/RenderPage';
import Navigator from '../../components/Navigator';

const NewRequestsComponent = () => {
    const [requests, setRequests] = useState([]);
    const [newRequest, setNewRequest] = useState({ name: '', type: '', date: '', message: '', specificField: '' });

    useEffect(() => {
        const data = [
            // Aquí puedes cargar las solicitudes existentes si es necesario
        ];
        setRequests(data);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRequest(prev => ({ ...prev, [name]: value }));
    };

    const handleAddRequest = () => {
        if (newRequest.name && newRequest.type && newRequest.date && newRequest.message) {
            setRequests(prevRequests => [
                ...prevRequests,
                { ...newRequest, id: prevRequests.length + 1, status: 'pending' }
            ]);
            setNewRequest({ name: '', type: '', date: '', message: '', specificField: '' });
        } else {
            alert("Please fill in all fields");
        }
    };

    const pendingRequests = requests.filter(r => r.status === 'pending');

    return (
        <>
        <Navigator/>
        <div className="p-8 rounded-lg">
            <div className='w-1/2 m-auto'>
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                    {pendingRequests.length === 1 ? 'Pending Request' : 'Pending Requests'}
                </h1>

                {/* Formulario de nueva solicitud */}
                <div className="mb-8 p-6 border border-blue-200 rounded-lg bg-blue-50 shadow-md">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">📋 New Request</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={newRequest.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                        />
                        <select
                            name="type"
                            value={newRequest.type}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Select Request Type</option>
                            <option value="Evaluation Request">Solicitar evaluación extraordinaria</option>
                            <option value="Withdrawal Request">Solicitar retiro de asignatura</option>
                        </select>
                        <input
                            type="date"
                            name="date"
                            value={newRequest.date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-gray-700 placeholder-gray-400"
                        />
                        <textarea
                            name="message"
                            value={newRequest.message}
                            onChange={handleChange}
                            placeholder="Enter your message"
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                        ></textarea>

                        {/* Campos específicos según el tipo de solicitud */}
                        {newRequest.type === "Evaluation Request" && (
                            <input
                                type="text"
                                name="specificField"
                                value={newRequest.specificField}
                                onChange={handleChange}
                                placeholder="Enter your reason for evaluation"
                                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                            />
                        )}

                        {newRequest.type === "Withdrawal Request" && (
                            <textarea
                                name="specificField"
                                value={newRequest.specificField}
                                onChange={handleChange}
                                placeholder="Enter your reason for withdrawal"
                                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                            ></textarea>
                        )}

                        <button
                            type="button"
                            onClick={handleAddRequest}
                            className="w-full p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Add Request
                        </button>
                    </form>
                </div>

                {/* Pending Requests */}
                <div className="mb-6">
                    {pendingRequests.length > 0 ? (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">🔔 Pending Requests</h2>
                            <ul>
                                {pendingRequests.map(request => (
                                    <li key={request.id} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm">
                                        <p className="text-lg font-medium text-gray-800">Name: {request.name}</p>
                                        <p className="text-sm text-gray-500">Type: {request.type}</p>
                                        <p className="text-sm text-gray-500">Date: {request.date}</p>
                                        <p className="text-sm text-gray-500">Status: Pending</p>
                                        <p className="text-sm text-gray-500 mt-2">Message: {request.message}</p>
                                        <p className="text-sm text-gray-500 mt-2">Reason: {request.specificField}</p> {/* Mostrar el campo específico */}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <div className="flex items-center space-x-2 p-4 border border-yellow-300 bg-yellow-50 rounded-lg shadow-md">
                            <span className="text-yellow-500 text-3xl">⚠️</span>
                            <p className="text-lg text-gray-700">No pending requests at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

const NewRequests = () => {
    return <RenderPage component={<NewRequestsComponent />} />
}

export default NewRequests;
