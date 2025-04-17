// app/components/MarketCard.tsx
import { Card, CardContent, CardTitle, CardDescription } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import Link from 'next/link';

interface MarketCardProps {
    event_id: string;
    title: string;
    description: string;
    igProbability: number;
    polymarketProbability: number;
}

const MarketCard: React.FC<MarketCardProps> = ({
    event_id,
    title,
    description,
    igProbability,
    polymarketProbability,
}) => {
    return (
        <Card className="cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                <CardDescription className="text-sm text-gray-600 mb-4">{description}</CardDescription>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">IG: {igProbability}%</span>
                    <span className="text-lg font-bold">Polymarket: {polymarketProbability}%</span>
                </div>
                <Link href={`/market/${event_id}`}>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full text-sm transition duration-300">
                        View Details
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};

export default MarketCard;
