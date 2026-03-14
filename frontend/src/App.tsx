import { useState } from 'react';
import { RichEditor } from './editor/Editor';

function App() {
  const [userName, setUserName] = useState('User ' + Math.floor(Math.random() * 100));
  const [documentId, setDocumentId] = useState('my-document');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Revize Documentation
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            AI-Powered Rich Documentation Suite
          </p>
        </div>

        <div className="bg-white shadow sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="documentId" className="block text-sm font-medium text-gray-700">Document ID</label>
                <input
                  type="text"
                  name="documentId"
                  id="documentId"
                  className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={documentId}
                  onChange={(e) => setDocumentId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-shrink-0">
               <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Connected
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <RichEditor documentId={documentId} userName={userName} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
