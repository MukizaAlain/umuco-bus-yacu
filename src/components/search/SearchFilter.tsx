
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { BusSearchFilters } from '@/services/BusSearchService';
import { Wifi, Snowflake, Zap } from 'lucide-react';

interface SearchFilterProps {
  onChange: (filters: Partial<BusSearchFilters>) => void;
  currentFilters: BusSearchFilters;
}

export default function SearchFilter({ onChange, currentFilters }: SearchFilterProps) {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [wifiFilter, setWifiFilter] = useState(false);
  const [acFilter, setAcFilter] = useState(false);
  const [usbFilter, setUsbFilter] = useState(false);
  const [operators, setOperators] = useState<string[]>([
    'Volcano Express',
    'Horizon Coach',
    'Rwanda Tours',
    'Capital Express'
  ]);
  const [selectedOperator, setSelectedOperator] = useState<string | undefined>(
    currentFilters.operator
  );

  // Update filters when price range changes
  useEffect(() => {
    const [minPrice, maxPrice] = priceRange;
    onChange({
      minPrice,
      maxPrice,
      features: {
        wifi: wifiFilter,
        ac: acFilter,
        usb: usbFilter
      },
      operator: selectedOperator
    });
  }, [priceRange, wifiFilter, acFilter, usbFilter, selectedOperator, onChange]);

  const handleReset = () => {
    setPriceRange([0, 10000]);
    setWifiFilter(false);
    setAcFilter(false);
    setUsbFilter(false);
    setSelectedOperator(undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filter Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium mb-2">Price Range</h3>
            <div className="px-2">
              <Slider
                value={priceRange}
                min={0}
                max={10000}
                step={100}
                onValueChange={setPriceRange}
                className="mt-6"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>RWF {priceRange[0].toLocaleString()}</span>
                <span>RWF {priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Operators */}
          <div>
            <h3 className="text-sm font-medium mb-2">Operators</h3>
            <div className="space-y-2">
              {operators.map((operator, index) => (
                <div key={index} className="flex items-center">
                  <Checkbox 
                    id={`operator-${index}`}
                    checked={selectedOperator === operator}
                    onCheckedChange={(checked) => 
                      setSelectedOperator(checked ? operator : undefined)
                    }
                  />
                  <label
                    htmlFor={`operator-${index}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {operator}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Features */}
          <div>
            <h3 className="text-sm font-medium mb-2">Features</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox 
                  id="feature-wifi"
                  checked={wifiFilter}
                  onCheckedChange={(checked) => setWifiFilter(!!checked)}
                />
                <label
                  htmlFor="feature-wifi"
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                >
                  <Wifi className="h-4 w-4 mr-1 text-blue-500" />
                  Wi-Fi
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox 
                  id="feature-ac"
                  checked={acFilter}
                  onCheckedChange={(checked) => setAcFilter(!!checked)}
                />
                <label
                  htmlFor="feature-ac"
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                >
                  <Snowflake className="h-4 w-4 mr-1 text-blue-500" />
                  Air Conditioning
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox 
                  id="feature-usb"
                  checked={usbFilter}
                  onCheckedChange={(checked) => setUsbFilter(!!checked)}
                />
                <label
                  htmlFor="feature-usb"
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                >
                  <Zap className="h-4 w-4 mr-1 text-blue-500" />
                  USB Charging
                </label>
              </div>
            </div>
          </div>
          
          {/* Reset Button */}
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full"
          >
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
