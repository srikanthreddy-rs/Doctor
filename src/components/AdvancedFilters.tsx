
import { useState } from 'react';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  minRating: number;
  minExperience: number;
  availabilityStatus: string[];
  showFavoritesOnly: boolean;
}

const AVAILABILITY_OPTIONS = [
  { id: 'available', label: 'Available Today' },
  { id: 'booked', label: 'Fully Booked' },
  { id: 'unavailable', label: 'On Leave' }
];

export const AdvancedFilters = ({ onFiltersChange }: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [50, 250],
    minRating: 0,
    minExperience: 0,
    availabilityStatus: [],
    showFavoritesOnly: false
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const clearFilters = () => {
    const cleared = {
      priceRange: [50, 250] as [number, number],
      minRating: 0,
      minExperience: 0,
      availabilityStatus: [],
      showFavoritesOnly: false
    };
    setFilters(cleared);
    onFiltersChange(cleared);
  };

  const hasActiveFilters = 
    filters.minRating > 0 || 
    filters.minExperience > 0 || 
    filters.availabilityStatus.length > 0 ||
    filters.showFavoritesOnly ||
    filters.priceRange[0] > 50 ||
    filters.priceRange[1] < 250;

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span>Advanced Filters</span>
        {hasActiveFilters && (
          <Badge variant="secondary" className="ml-2">
            Active
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute top-full mt-2 w-80 z-50 shadow-lg">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filter Options</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <Label>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                  min={50}
                  max={250}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Minimum Rating */}
              <div className="space-y-2">
                <Label>Minimum Rating: {filters.minRating || 'Any'}</Label>
                <Slider
                  value={[filters.minRating]}
                  onValueChange={(value) => updateFilters({ minRating: value[0] })}
                  min={0}
                  max={5}
                  step={0.5}
                  className="w-full"
                />
              </div>

              {/* Minimum Experience */}
              <div className="space-y-2">
                <Label>Minimum Experience: {filters.minExperience || 'Any'} years</Label>
                <Slider
                  value={[filters.minExperience]}
                  onValueChange={(value) => updateFilters({ minExperience: value[0] })}
                  min={0}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Availability Status */}
              <div className="space-y-2">
                <Label>Availability Status</Label>
                <div className="space-y-2">
                  {AVAILABILITY_OPTIONS.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={filters.availabilityStatus.includes(option.id)}
                        onCheckedChange={(checked) => {
                          const newStatus = checked
                            ? [...filters.availabilityStatus, option.id]
                            : filters.availabilityStatus.filter(s => s !== option.id);
                          updateFilters({ availabilityStatus: newStatus });
                        }}
                      />
                      <Label htmlFor={option.id} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorites Only */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="favorites-only"
                  checked={filters.showFavoritesOnly}
                  onCheckedChange={(checked) => 
                    updateFilters({ showFavoritesOnly: !!checked })
                  }
                />
                <Label htmlFor="favorites-only" className="text-sm">
                  Show favorites only
                </Label>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
