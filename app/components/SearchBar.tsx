'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { SearchFilters } from '@/app/types/opera';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  loading?: boolean;
}

export default function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    creator: '',
    date: '',
    language: '',
    format: ''
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      creator: '',
      date: '',
      language: '',
      format: ''
    });
    onSearch({ query: '', creator: '', date: '', language: '', format: '' });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Main Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search opera recordings..."
              value={filters.query}
              onChange={(e) => handleInputChange('query', e.target.value)}
              className="pl-10"
              disabled={loading}
            />
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
            </Button>
            
            {Object.values(filters).some(value => value !== '') && (
              <Button
                type="button"
                variant="ghost"
                onClick={clearFilters}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Creator/Artist
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Verdi, Puccini"
                  value={filters.creator}
                  onChange={(e) => handleInputChange('creator', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Date
                </label>
                <Input
                  type="text"
                  placeholder="e.g., 1960, 1970-1980"
                  value={filters.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Language
                </label>
                <Select
                  value={filters.language}
                  onValueChange={(value) => handleInputChange('language', value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Language</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Russian">Russian</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Format
                </label>
                <Select
                  value={filters.format}
                  onValueChange={(value) => handleInputChange('format', value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Format</SelectItem>
                    <SelectItem value="VBR MP3">VBR MP3</SelectItem>
                    <SelectItem value="64Kbps MP3">64Kbps MP3</SelectItem>
                    <SelectItem value="128Kbps MP3">128Kbps MP3</SelectItem>
                    <SelectItem value="Flac">Flac</SelectItem>
                    <SelectItem value="Ogg Vorbis">Ogg Vorbis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Search Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="px-8"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </div>
              ) : (
                'Search Opera Recordings'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
