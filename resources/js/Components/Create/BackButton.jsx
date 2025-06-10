import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <button
      onClick={handleBack}
      className="flex items-center space-x-2 px-4 py-2 rounded-full shadow bg-white cursor-pointer hover:bg-gray-300 transition"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="font-semibold text-sm">Voltar</span>
    </button>
  )
}
