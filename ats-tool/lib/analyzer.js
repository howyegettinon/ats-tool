import OpenAI from 'openai'
import https from 'https'

const insecureAgent = new https.Agent({
  rejectUnauthorized: false
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  httpAgent: insecureAgent
})

export async function analyzeResume(resumeText) {
  try {
    console.log('=== SENDING TO OPENAI ===\n', resumeText.substring(0, 500))
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{
        role: "system",
        content: "Analyze this resume for Applicant Tracking System compatibility. List missing keywords, formatting issues, and improvement suggestions."
      }, {
        role: "user",
        content: resumeText.substring(0, 3000)
      }],
      temperature: 0.7
    })

    console.log('=== OPENAI RESPONSE ===\n', completion.choices[0].message.content)
    return completion.choices[0].message.content
    
  } catch (error) {
    console.error('=== OPENAI ERROR ===\n', error)
    return 'Analysis failed. Error: ' + error.message
  }
}
