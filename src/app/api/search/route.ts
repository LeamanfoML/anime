import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.anilibria.tv/v3/title/search?search=${encodeURIComponent(query)}&limit=20`,
      { 
        headers: {
          'User-Agent': 'AnimeHub/1.0'
        }
      }
    )

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()
    
    const results = data.list?.map((item: any) => ({
      id: `anilibria_${'''item.id'''}`,
      title: item.names?.ru || item.names?.en,
      poster: item.posters?.original?.url ? `https://anilibria.tv${item.posters.original.url}` : null,
      rating: item.rating?.rating,
      year: item.season?.year,
      episodes: item.type?.episodes,
      genres: item.genres || []
    })) || []

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}