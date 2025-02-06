import { analyzeResume } from '../../lib/analyzer'

export default async function handler(req, res) {
  console.log('--- RAW REQUEST BODY ---')
  console.log(req.body) // Log raw body
  
  try {
    const { resume } = req.body
    console.log('Resume length:', resume?.length)
    
    if (!resume || resume.length < 50) {
      console.error('Invalid resume length')
      return res.status(400).json({ error: 'Resume text too short' })
    }

    console.log('Calling AI analysis...')
    const result = await analyzeResume(resume)
    
    console.log('Analysis completed:', result.substring(0, 100))
    res.status(200).json({ result })
    
  } catch (error) {
    console.error('FULL ERROR OBJECT:', error)
    console.error('ERROR RESPONSE:', error.response?.data)
    res.status(500).json({ 
      error: error.message,
      code: error.code,
      status: error.status 
    })
  }
}
