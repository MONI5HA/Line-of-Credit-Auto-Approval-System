import { useState } from 'react';
import ApplicationForm from './components/ApplicationForm';
import ResultDisplay from './components/ResultDisplay';
import { LOCApplicationData, LOCDecisionResult } from './types';
import ErrorModal from './components/ErrorModal'; // Import the modal

function App() {
  const [result, setResult] = useState<LOCDecisionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: LOCApplicationData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred while processing your application');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error submitting application:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const handleCloseModal = () => {
    setError(null); // Close the modal by clearing the error state
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white py-10 px-10 shadow-md">
        <h1 className="text-2xl font-bold">Credit Approval System</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow p-8">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Our System</h2>
          <p className="text-lg text-gray-700 mb-8">
            Our Credit Approval System helps individuals and businesses determine their credit eligibility with ease. 
            Simply provide your details, and our intelligent system will analyze your financial profile to offer personalized credit insights.
          </p>
        </div>

        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
          <div className="flex justify-center items-center">
            {!result ? (
              <ApplicationForm 
                onSubmit={handleSubmit} 
                loading={loading} 
                error={error} 
              />
            ) : (
              <ResultDisplay 
                result={result} 
                onReset={handleReset} 
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-4 mt-8">
        <p>&copy; 2025 Credit Approval System. All rights reserved.</p>
      </footer>

      {/* Error Modal */}
      {error && <ErrorModal errorMessage={error} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
