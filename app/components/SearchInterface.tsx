'use client';

import { useState } from 'react';
import { SearchFilters } from '@/app/types/opera';
import SearchBar from '@/app/components/SearchBar';
import ServerWorkGroupGrid from '@/app/components/ServerWorkGroupGrid';
import { Card, CardContent } from '@/components/ui/card';
import { Music } from 'lucide-react';

export default function SearchInterface() {
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (filters: SearchFilters) => {
    setLoading(true);
    setHasSearched(true);
    
    try {
      // Use server-side API for better performance
      const params = new URLSearchParams({
        q: filters.query || '',
        creator: filters.creator || '',
        date: filters.date || '',
        language: filters.language || '',
        page: '1',
        rows: '50'
      });
      
      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setWorks(data.works);
    } catch (error) {
      console.error('Search failed:', error);
      setWorks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <SearchBar onSearch={handleSearch} loading={loading} />

      {/* Results Section */}
      {hasSearched && (
        <ServerWorkGroupGrid 
          works={works} 
          loading={loading}
        />
      )}

      {/* Welcome Message */}
      {!hasSearched && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Welcome to Opera Archive Explorer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Search through a curated collection of opera recordings from the Internet Archive. 
              Discover classical masterpieces, explore different composers and performers, 
              and listen to high-quality audio recordings.
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Search for a work (e.g., "Madama Butterfly") to see all available recordings grouped together.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
