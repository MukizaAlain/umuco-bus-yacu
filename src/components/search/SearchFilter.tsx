
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin, Calendar as CalendarIcon, Filter, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Placeholder locations - would come from API
const LOCATIONS = [
  { id: 1, name: 'Kigali' },
  { id: 2, name: 'Butare' },
  { id: 3, name: 'Gisenyi' },
  { id: 4, name: 'Ruhengeri' },
  { id: 5, name: 'Cyangugu' },
  { id: 6, name: 'Kibungo' },
];

export default function SearchFilter() {
  const [date, setDate] = useState<Date>();
  const [priceRange, setPriceRange] = useState([0, 20000]); // RWF
  const [departureTime, setDepartureTime] = useState<string>("");
  const [busFeatures, setBusFeatures] = useState({
    ac: false,
    wifi: false,
    usb: false,
  });

  const handleBusFeatureChange = (feature: keyof typeof busFeatures) => {
    setBusFeatures({
      ...busFeatures,
      [feature]: !busFeatures[feature],
    });
  };

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Search Filters</h2>
          <Filter className="h-5 w-5 text-rwanda-blue" />
        </div>
        
        <div className="space-y-6">
          {/* Route Selection */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-rwanda-blue" />
                From
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select departure" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map(location => (
                    <SelectItem key={location.id} value={location.name.toLowerCase()}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-rwanda-blue" />
                To
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map(location => (
                    <SelectItem key={location.id} value={location.name.toLowerCase()}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2 text-rwanda-blue" />
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Time Selection */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-rwanda-blue" />
              Preferred Departure Time
            </Label>
            <Select value={departureTime} onValueChange={setDepartureTime}>
              <SelectTrigger>
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                <SelectItem value="evening">Evening (5PM - 10PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Price Range */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Price Range (RWF)</Label>
              <span className="text-sm text-gray-500">
                {priceRange[0]} - {priceRange[1]}
              </span>
            </div>
            <Slider
              defaultValue={priceRange}
              max={20000}
              step={500}
              onValueChange={setPriceRange}
              className="cursor-pointer"
            />
          </div>
          
          {/* Bus Features */}
          <div className="space-y-3">
            <Label>Bus Features</Label>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Air Conditioning</span>
              <Switch
                checked={busFeatures.ac}
                onCheckedChange={() => handleBusFeatureChange('ac')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Wi-Fi</span>
              <Switch
                checked={busFeatures.wifi}
                onCheckedChange={() => handleBusFeatureChange('wifi')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">USB Charging</span>
              <Switch
                checked={busFeatures.usb}
                onCheckedChange={() => handleBusFeatureChange('usb')}
              />
            </div>
          </div>
          
          <Button 
            className="w-full bg-rwanda-blue hover:bg-blue-800"
          >
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
