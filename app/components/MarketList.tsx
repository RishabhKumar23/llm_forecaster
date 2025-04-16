// Server Component – No "use client"

type Market = {
    id: string
    title: string
    ig_prob: number
    pm_prob: number
    delta: number
}

async function getMarkets(): Promise<{ markets: Market[] }> {
    const res = await fetch('http://localhost:3000/api/markets', {
        next: { revalidate: 300 }, // revalidate every 5 minutes (optional)
    })

    if (!res.ok) {
        throw new Error('Failed to fetch markets')
    }

    return res.json()
}

export default async function MarketList() {
    const data = await getMarkets()

    return (
        <div className="grid gap-4">
            {data.markets.map((m) => (
                <div key={m.id} className="bg-white shadow p-4 rounded-xl">
                    <h2 className="text-lg font-semibold">{m.title}</h2>
                    <div className="text-sm">
                        IG: {m.ig_prob.toFixed(1)}% | PM: {m.pm_prob.toFixed(1)}%
                    </div>
                    <div
                        className={`text-sm font-bold ${Math.abs(m.delta) > 5 ? 'text-red-500' : 'text-gray-600'
                            }`}
                    >
                        Δ {m.delta.toFixed(1)}%
                    </div>
                </div>
            ))}
        </div>
    )
}
