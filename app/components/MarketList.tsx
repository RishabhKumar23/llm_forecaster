'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Market = {
    event_id: string
    title: string
    description: string
}

export default function MarketList() {
    const [markets, setMarkets] = useState<Market[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMarkets = async () => {
            try {
                const res = await fetch('/api/markets')
                const data = await res.json()

                // Use data.items, fallback to [] if missing
                const items = Array.isArray(data?.items) ? data.items : []
                setMarkets(items)
            } catch (error) {
                console.error('Error fetching markets:', error)
                setMarkets([])
            } finally {
                setLoading(false)
            }
        }

        fetchMarkets()
    }, [])

    if (loading) return <p className="text-gray-500">Loading markets...</p>
    if (markets.length === 0) return <p>No markets found.</p>

    return (
        <div className="space-y-4">
            {markets.map((market) => (
                <Link
                    key={market.event_id}
                    href={`/market/${market.event_id}`}
                    className="block border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                    <h2 className="text-lg font-semibold">{market.title}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2">{market.description}</p>
                </Link>
            ))}
        </div>
    )
}
