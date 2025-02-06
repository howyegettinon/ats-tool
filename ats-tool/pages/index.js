import { useState } from 'react'
import { Sparkles } from '../components/Sparkles'

export default function Home() {
  const [resume, setResume] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!resume.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume }),
      })

      if (!response.ok) throw new Error('Analysis failed')
      
      const data = await response.json()
      setAnalysis(data.result)
    } catch (error) {
      console.error('Error:', error)
      setAnalysis('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Sparkles />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            AI Resume Analyzer
          </h1>
          <p className="text-xl text-gray-300">
            Get past automated hiring systems
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
          <form onSubmit={handleSubmit}>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="w-full h-96 bg-gray-900 text-white rounded-xl p-6 border border-gray-700 focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Paste your resume here..."
              disabled={loading}
            />
            
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </form>

          {analysis && (
            <div className="mt-8 p-6 bg-gray-700 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Analysis Results</h2>
              <div className="text-gray-200 whitespace-pre-wrap">
                {analysis}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
