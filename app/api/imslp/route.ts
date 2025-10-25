import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const start = searchParams.get('start') || '0';
  const limit = searchParams.get('limit') || '50';
  const sortBy = searchParams.get('sortBy') || 'id';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // IMSLP API doesn't support search queries directly, so we'll fetch a large set and filter client-side
    const imslpParams = new URLSearchParams({
      account: 'worklist',
      disclaimer: 'accepted',
      sort: sortBy,
      type: '2', // Works only
      start: '0',
      limit: '1000', // Get a large set to search through
      retformat: 'json'
    });

    const imslpUrl = `https://imslp.org/imslpscripts/API.ISCR.php?${imslpParams.toString()}`;
    
    const response = await fetch(imslpUrl, {
      headers: {
        'User-Agent': 'OperaArchiveExplorer/1.0',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`IMSLP API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Filter results based on query
    const filteredResults: any = {};
    const searchTerms = query.toLowerCase().split(' ');
    
    for (const [key, work] of Object.entries(data)) {
      if (key === 'metadata') {
        filteredResults[key] = work;
        continue;
      }
      
      if (typeof work === 'object' && work !== null && 'intvals' in work) {
        const workData = work as any;
        const title = workData.intvals?.worktitle?.toLowerCase() || '';
        const composer = workData.intvals?.composer?.toLowerCase() || '';
        
        // Check if any search term matches title or composer
        const matches = searchTerms.some(term => 
          title.includes(term) || composer.includes(term)
        );
        
        if (matches) {
          filteredResults[key] = work;
        }
      }
    }
    
    return NextResponse.json(filteredResults);
  } catch (error) {
    console.error('IMSLP API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from IMSLP API' },
      { status: 500 }
    );
  }
}
