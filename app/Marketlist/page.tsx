// app/market/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';

interface Market {
    event_id: string;
    title: string;
    description: string;
}

export default function MarketPage() {
    const [markets, setMarkets] = useState<Market[]>([]);

    useEffect(() => {
        fetch('/api/markets')
            .then((res) => res.json())
            .then((data) => setMarkets(data.items))
            .catch((err) => console.error('Failed to fetch markets:', err));
    }, []);

    return (
        <main className="min-h-screen bg-gray-950 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">📈 Explore Markets</h1>

                {/* Category Filters */}
                <div className="mb-6 flex gap-3 overflow-x-auto pb-2 border-b border-gray-800 items-center justify-center">
                    {['All', 'New', 'Politics', 'Crypto', 'Trump', 'Global'].map((category) => (
                        <Button variant="outline" key={category} className="text-white bg-black border-gray-600 hover:bg-gray-800 text-center items-center">
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Market Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {markets.map((market) => (
                        <Link key={market.event_id} href={`/market/${market.event_id}`} passHref>
                            <div>
                                <Card className="bg-gray-900 hover:bg-gray-800 cursor-pointer transition-all duration-300 border border-gray-700">
                                    <CardContent className="p-5">
                                        <h2 className="text-xl text-white font-semibold mb-2">{market.title}</h2>
                                        <p className="text-white text-sm line-clamp-3">{market.description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
