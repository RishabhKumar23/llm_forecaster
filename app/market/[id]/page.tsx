'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MarketDetail({ marketId }: { marketId: string }) {
  const [confidence, setConfidence] = useState<number | null>(null);
  const [reason, setReason] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [marketData, setMarketData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMarketData = async () => {
      const response = await fetch(`/api/markets?id=${marketId}`);
      const data = await response.json();
      setMarketData(data.items[0]);
    };

    fetchMarketData();
  }, [marketId]);

  useEffect(() => {
    const fetchTradeSignal = async () => {
      if (!marketData) return;

      setLoading(true);

      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `${marketData.title}\n\n${marketData.description}`
        }),
      });

      const data = await res.json();

      if (data.confidence && !isNaN(data.confidence)) {
        setConfidence(data.confidence);
        setReason(data.reason || '');
      }

      setLoading(false);
    };

    fetchTradeSignal();
  }, [marketData]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">

        {/* Back Button */}
        <button
          onClick={() => router.push('/Marketlist')}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full mb-6 hover:bg-gray-400 transition"
        >
          &#8592; Back to Home
        </button>

        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{marketData?.title || "Loading..."}</h1>
        <p className="text-lg text-gray-600 mb-4">{marketData?.description || "Loading market description..."}</p>

        {loading ? (
          <div className="flex justify-center items-center">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0114.14-4.14l1.42-1.42A10 10 0 103 12h1z"></path>
            </svg>
            <span className="ml-2 text-lg text-gray-600">Fetching trade signal...</span>
          </div>
        ) : (
          <div className="mt-6">
            <h2 className="text-xl font-medium text-gray-800 mb-2">Confidence Score</h2>
            <div className="flex items-center">
              <div className="w-full bg-gray-300 h-4 rounded-full">
                <div
                  className={`h-4 rounded-full ${confidence >= 70 ? 'bg-green-500' : confidence >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${confidence || 0}%` }}
                ></div>
              </div>
              <span className="ml-4 text-xl font-semibold text-gray-800">
                {confidence !== null ? `${confidence}%` : "N/A"}
              </span>
            </div>

            {reason && (
              <div className="mt-4">
                <h3 className="text-md font-medium text-gray-700 mb-1">Reason</h3>
                <p className="text-gray-600">{reason}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
