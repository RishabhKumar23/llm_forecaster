import { useRouter } from 'next/router'

export default function MarketDetail() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Market ID: {id}</h1>
      {/* Add more details here */}
    </div>
  )
}
