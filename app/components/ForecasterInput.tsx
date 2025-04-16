import { useState } from 'react'

export default function ForecasterInput() {
    const [input, setInput] = useState('')
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        setLoading(true)
        const res = await fetch('/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: input }),
        })
        const data = await res.json()
        setResult(data)
        setLoading(false)
    }

    return (
        <div>
            <textarea
                className="w-full border rounded p-2"
                rows={3}
                placeholder="Will there be a ceasefire in Gaza in 2025?"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
                disabled={loading}
            >{loading ? 'Thinking...' : 'Ask Gemini'}</button>

            {result && (
                <div className="mt-4 bg-white shadow p-4 rounded-xl">
                    <p className="font-semibold">Forecast: {result.answer} ({result.confidence}%)</p>
                    <p className="text-sm mt-1">{result.explanation}</p>
                </div>
            )}
        </div>
    )
}
