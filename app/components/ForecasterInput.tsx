'use client'
import { useState } from 'react'

export default function ForecasterInput({ marketId }: { marketId: string }) {
    const [question, setQuestion] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        const res = await fetch('/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: marketId, question }),
        })
        const data = await res.json()
        setResponse(data.answer)
        setLoading(false)
    }

    return (
        <div className="mt-6">
            <input
                className="border p-2 w-full mb-2"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask the LLM about this market..."
            />
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Thinking...' : 'Ask'}
            </button>

            {response && (
                <div className="mt-4 p-3 bg-gray-100 rounded">
                    <p className="font-semibold">LLM Response:</p>
                    <p>{response}</p>
                </div>
            )}
        </div>
    )
}
