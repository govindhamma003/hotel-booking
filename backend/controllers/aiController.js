const rooms = require('../data/rooms.json')

const PROMPT = `You help guests of a hotel in Puducherry find a room.
Turn the guest's message into JSON filters. Return ONLY JSON like this:
{"roomType": string|null, "maxPrice": number|null, "guests": number|null, "keywords": string[]}
Use null or [] if the guest did not mention it. Do not invent values.
"cheap" or "budget" means maxPrice 3000. Map "sea view" to the keyword "view".`

exports.search = async (req, res) => {
  try {
    const message = (req.body.message || '').trim()
    if (!message) {
      return res.status(400).json({ status: false, message: 'Please type a message.' })
    }

    // Step 1: ask the AI to turn the text into filters
    const aiRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
       model: 'openai/gpt-oss-20b',
        temperature: 0,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: PROMPT },
          { role: 'user', content: message }
        ]
      })
    })

      if (aiRes.status === 429) {
      return res.status(429).json({ status: false, message: 'Too many requests, try again soon.' })
    }

    const data = await aiRes.json()
    console.log('Groq status:', aiRes.status)
    console.log('Groq response:', JSON.stringify(data))

    if (!aiRes.ok) {
      return res.status(500).json({ status: false, message: 'AI service error. Please try again.' })
    }

    let filters = {}
    try {
      filters = JSON.parse(data.choices[0].message.content)
    } catch (e) {
      console.error('Could not parse AI JSON:', e.message)
      return res.status(500).json({ status: false, message: 'Could not understand the AI reply.' })
    }
    console.log('Filters:', filters)

    // Step 2: our own code filters the rooms
    const keywords = filters.keywords || []

    const result = rooms.filter((room) => {
      const price = Number(room.pricePerNight)
      const capacity = Number(room.capacity)
      const features = [...room.additionalDetails, ...room.services].join(' ').toLowerCase()

      if (filters.maxPrice && price > filters.maxPrice) return false
      if (filters.guests && capacity < filters.guests) return false
      if (filters.roomType && !room.roomType.toLowerCase().includes(filters.roomType.toLowerCase())) return false
      if (!keywords.every((k) => features.includes(String(k).toLowerCase()))) return false
      return true
    })

    res.status(200).json({
      status: true,
      data: {
        reply: result.length ? `I found ${result.length} room(s) for you:` : 'Sorry, no rooms match that.',
        rooms: result
      }
    })
  } catch (error) {
    console.error('AI search error:', error)
    res.status(500).json({ status: false, message: 'Something went wrong.' })
  }
}