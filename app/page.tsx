'use client';

import { useState, useEffect } from 'react';
import { OperaRecording, SearchFilters } from '@/app/types/opera';
import { ArchiveAPI } from '@/app/lib/archive-api';
import { groupRecordingsByWork } from '@/app/lib/work-grouper';
import SearchBar from '@/app/components/SearchBar';
import WorkGroupGrid from '@/app/components/WorkGroupGrid';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Archive } from 'lucide-react';

export default function Home() {
  const [operas, setOperas] = useState<OperaRecording[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (filters: SearchFilters) => {
    setLoading(true);
    setHasSearched(true);
    
    try {
      const response = await ArchiveAPI.searchOperas(filters);
      setOperas(response.docs);
    } catch (error) {
      console.error('Search failed:', error);
      setOperas([]);
    } finally {
      setLoading(false);
    }
  };

  // Group recordings by work
  const groupedWorks = groupRecordingsByWork(operas);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Opera Archive Explorer</h1>
              <p className="text-muted-foreground">
                Discover and explore opera recordings from the Internet Archive
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Archive className="w-4 h-4" />
            <span>
              Powered by{' '}
              <a 
                href="https://archive.org/details/vinyl_frank-defreytas-memoria-opera" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Internet Archive - Frank DeFreytas Memoria Opera Collection
              </a>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Search Section */}
          <SearchBar onSearch={handleSearch} loading={loading} />

          {/* Results Section */}
          {hasSearched && (
            <WorkGroupGrid 
              works={groupedWorks} 
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
      </main>
    </div>
  );
}
