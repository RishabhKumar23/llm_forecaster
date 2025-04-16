import Head from 'next/head'
import MarketList from '@/components/MarketList'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head><title>Polymarket Terminal</title></Head>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Polymarket Trading Terminal</h1>
        <MarketList />
      </div>
    </Layout>
  )
}