
// Mock data for buses - would come from backend API in real app
const MOCK_BUSES = [
  {
    id: 1,
    operator: 'Volcano Express',
    logo: 'https://via.placeholder.com/100/1E3A8A/FFFFFF?text=VE',
    from: 'Kigali',
    to: 'Butare',
    departureTime: '08:00 AM',
    arrivalTime: '10:30 AM',
    duration: '2h 30m',
    price: 'RWF 5,000',
    numericPrice: 5000,
    seatsAvailable: 12,
    features: {
      wifi: true,
      ac: true,
      usb: true,
    },
    date: '2025-04-10',
  },
  {
    id: 2,
    operator: 'Horizon Coach',
    logo: 'https://via.placeholder.com/100/047857/FFFFFF?text=HC',
    from: 'Kigali',
    to: 'Butare',
    departureTime: '09:30 AM',
    arrivalTime: '12:00 PM',
    duration: '2h 30m',
    price: 'RWF 5,500',
    numericPrice: 5500,
    seatsAvailable: 8,
    features: {
      wifi: true,
      ac: true,
      usb: false,
    },
    date: '2025-04-10',
  },
  {
    id: 3,
    operator: 'Rwanda Tours',
    logo: 'https://via.placeholder.com/100/FCD34D/FFFFFF?text=RT',
    from: 'Kigali',
    to: 'Butare',
    departureTime: '11:00 AM',
    arrivalTime: '01:30 PM',
    duration: '2h 30m',
    price: 'RWF 4,800',
    numericPrice: 4800,
    seatsAvailable: 5,
    features: {
      wifi: false,
      ac: true,
      usb: true,
    },
    date: '2025-04-10',
  },
  {
    id: 4,
    operator: 'Volcano Express',
    logo: 'https://via.placeholder.com/100/1E3A8A/FFFFFF?text=VE',
    from: 'Kigali',
    to: 'Butare',
    departureTime: '02:00 PM',
    arrivalTime: '04:30 PM',
    duration: '2h 30m',
    price: 'RWF 5,000',
    numericPrice: 5000,
    seatsAvailable: 15,
    features: {
      wifi: true,
      ac: true,
      usb: true,
    },
    date: '2025-04-10',
  },
  {
    id: 5,
    operator: 'Capital Express',
    logo: 'https://via.placeholder.com/100/1E3A8A/FFFFFF?text=CE',
    from: 'Kigali',
    to: 'Butare',
    departureTime: '04:30 PM',
    arrivalTime: '07:00 PM',
    duration: '2h 30m',
    price: 'RWF 5,200',
    numericPrice: 5200,
    seatsAvailable: 10,
    features: {
      wifi: true,
      ac: false,
      usb: true,
    },
    date: '2025-04-10',
  },
  {
    id: 6,
    operator: 'Volcano Express',
    logo: 'https://via.placeholder.com/100/1E3A8A/FFFFFF?text=VE',
    from: 'Kigali',
    to: 'Gisenyi',
    departureTime: '07:00 AM',
    arrivalTime: '10:00 AM',
    duration: '3h 00m',
    price: 'RWF 6,000',
    numericPrice: 6000,
    seatsAvailable: 18,
    features: {
      wifi: true,
      ac: true,
      usb: true,
    },
    date: '2025-04-10',
  },
  {
    id: 7,
    operator: 'Horizon Coach',
    logo: 'https://via.placeholder.com/100/047857/FFFFFF?text=HC',
    from: 'Kigali',
    to: 'Gisenyi',
    departureTime: '09:00 AM',
    arrivalTime: '12:00 PM',
    duration: '3h 00m',
    price: 'RWF 6,200',
    numericPrice: 6200,
    seatsAvailable: 12,
    features: {
      wifi: true,
      ac: true,
      usb: true,
    },
    date: '2025-04-11',
  },
  {
    id: 8,
    operator: 'Horizon Coach',
    logo: 'https://via.placeholder.com/100/047857/FFFFFF?text=HC',
    from: 'Butare',
    to: 'Kigali',
    departureTime: '08:30 AM',
    arrivalTime: '11:00 AM',
    duration: '2h 30m',
    price: 'RWF 5,000',
    numericPrice: 5000,
    seatsAvailable: 20,
    features: {
      wifi: true,
      ac: true,
      usb: true,
    },
    date: '2025-04-12',
  },
];

export interface BusSearchFilters {
  from?: string;
  to?: string;
  date?: string;
  minPrice?: number;
  maxPrice?: number;
  departureTime?: string;
  operator?: string;
  features?: {
    wifi?: boolean;
    ac?: boolean;
    usb?: boolean;
  };
}

export interface Bus {
  id: number;
  operator: string;
  logo: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: string;
  numericPrice: number;
  seatsAvailable: number;
  features: {
    wifi: boolean;
    ac: boolean;
    usb: boolean;
  };
  date: string;
}

export const BusSearchService = {
  searchBuses: (filters: BusSearchFilters): Promise<Bus[]> => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredBuses = [...MOCK_BUSES];

        // Apply filters
        if (filters.from) {
          filteredBuses = filteredBuses.filter(bus => 
            bus.from.toLowerCase() === filters.from.toLowerCase()
          );
        }

        if (filters.to) {
          filteredBuses = filteredBuses.filter(bus => 
            bus.to.toLowerCase() === filters.to.toLowerCase()
          );
        }

        if (filters.date) {
          filteredBuses = filteredBuses.filter(bus => bus.date === filters.date);
        }

        if (filters.minPrice) {
          filteredBuses = filteredBuses.filter(bus => bus.numericPrice >= filters.minPrice);
        }

        if (filters.maxPrice) {
          filteredBuses = filteredBuses.filter(bus => bus.numericPrice <= filters.maxPrice);
        }

        if (filters.operator) {
          filteredBuses = filteredBuses.filter(bus => 
            bus.operator.toLowerCase().includes(filters.operator.toLowerCase())
          );
        }

        // Filter by features
        if (filters.features) {
          if (filters.features.wifi) {
            filteredBuses = filteredBuses.filter(bus => bus.features.wifi);
          }
          
          if (filters.features.ac) {
            filteredBuses = filteredBuses.filter(bus => bus.features.ac);
          }
          
          if (filters.features.usb) {
            filteredBuses = filteredBuses.filter(bus => bus.features.usb);
          }
        }

        resolve(filteredBuses);
      }, 500); // Simulate network delay
    });
  },

  getBusById: (id: number): Promise<Bus | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bus = MOCK_BUSES.find(bus => bus.id === id) || null;
        resolve(bus);
      }, 300);
    });
  },

  getAvailableRoutes: (): Promise<{from: string, to: string}[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const uniqueRoutes = Array.from(
          new Set(MOCK_BUSES.map(bus => `${bus.from}|${bus.to}`))
        ).map(route => {
          const [from, to] = route.split('|');
          return { from, to };
        });
        resolve(uniqueRoutes);
      }, 300);
    });
  }
};
