import ForecasterInput from '../components/ForecasterInput'

export default function Forecaster() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ask a Forecast</h1>
      <ForecasterInput />
    </div>
  )
}
