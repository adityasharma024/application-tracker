import { useState } from 'react';
import {
  addApplicationToFirestore,
  getApplicationsFromFirestore
} from '../../firebase/firestoreService.js';

import { CheckCircle, XCircle, Loader } from 'lucide-react';

function FirebaseTest() {
  const [status, setStatus] = useState('idle'); // idle | testing | success | error
  const [message, setMessage] = useState('');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const testFirebaseConnection = async () => {
    setStatus('testing');
    setMessage('Testing Firebase connection...');

    try {
      // STEP 1: WRITE
      setMessage('Step 1: Writing test data to Firestore...');
      
      const testApp = {
        company: 'Firebase Test Company',
        role: 'Test Role',
        jobType: 'fulltime',
        status: 'applied',
        dateApplied: new Date().toISOString().split('T')[0],
        applicationUrl: '',
        notes: [],
        statusHistory: []
      };

      const docRef = await addApplicationToFirestore(testApp);

      setMessage(
        `✅ Step 1: Successfully added test application${
          docRef?.id ? ` (ID: ${docRef.id})` : ''
        }`
      );

      await sleep(800);

      // STEP 2: READ
      setMessage('Step 2: Reading data from Firestore...');
      const applications = await getApplicationsFromFirestore();

      setMessage(
        `✅ Step 2: Successfully read ${applications?.length ?? 0} application(s)`
      );

      await sleep(800);

      // SUCCESS
      setStatus('success');
      setMessage('🎉 Firebase connection successful! All tests passed.');

    } catch (error) {
      console.error('Firebase test error:', error);
      setStatus('error');
      setMessage(
        `❌ Firebase connection failed: ${error?.message || 'Unknown error'}`
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg border-2 border-blue-200 p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🔥 Firebase Connection Test
          </h2>
          <p className="text-gray-600">
            Test your Firebase Firestore connection
          </p>
        </div>

        {/* Status Display */}
        <div className="mb-6">
          {status === 'idle' && (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                Ready to test Firebase connection
              </p>
            </div>
          )}

          {status === 'testing' && (
            <div className="text-center p-8 bg-blue-50 rounded-lg border border-blue-200">
              <Loader className="w-8 h-8 text-blue-600 mx-auto mb-3 animate-spin" />
              <p className="text-blue-900 font-medium">{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-green-900 font-bold text-lg">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
              <XCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <p className="text-red-900 font-medium">{message}</p>
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={testFirebaseConnection}
          disabled={status === 'testing'}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold
                     hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'testing' ? 'Testing...' : 'Test Firebase Connection'}
        </button>

        {/* Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">
            What this test does:
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Writes a test application to Firestore</li>
            <li>✓ Reads applications back from Firestore</li>
            <li>✓ Verifies your Firebase configuration</li>
          </ul>
        </div>

        {status === 'success' && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">✅ Next Steps:</h3>
            <p className="text-sm text-green-800">
              Firebase is configured correctly! Next, integrate this with Redux
              so all applications sync automatically.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default FirebaseTest;
