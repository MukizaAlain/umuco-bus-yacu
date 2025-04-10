
// This file initializes mock data for local development
// It should be removed when integrating with a real backend

export const initializeMockData = () => {
  // Only initialize if not already done
  if (localStorage.getItem('mockDataInitialized')) return;

  // Initialize users
  const users = [
    {
      id: 'user-1',
      name: 'Admin User',
      email: 'admin@umuco.com',
      password: 'adminpass', // In a real app, passwords would be hashed server-side
      role: 'ADMIN',
      phone: '+250789123456',
      createdAt: new Date().toISOString()
    },
    {
      id: 'user-2',
      name: 'Operator User',
      email: 'operator@umuco.com',
      password: 'operatorpass',
      role: 'OPERATOR',
      phone: '+250789123457',
      createdAt: new Date().toISOString()
    },
    {
      id: 'user-3',
      name: 'Customer User',
      email: 'customer@example.com',
      password: 'customerpass',
      role: 'CUSTOMER',
      phone: '+250789123458',
      createdAt: new Date().toISOString()
    }
  ];
  localStorage.setItem('users', JSON.stringify(users));

  // Initialize routes
  const routes = [
    {
      id: 'route-1',
      origin: 'Kigali',
      destination: 'Musanze',
      distance: 75,
      estimatedTime: '1.5 hours',
      fare: 5000
    },
    {
      id: 'route-2',
      origin: 'Kigali',
      destination: 'Huye',
      distance: 133,
      estimatedTime: '2.5 hours',
      fare: 8000
    },
    {
      id: 'route-3',
      origin: 'Kigali',
      destination: 'Rusizi',
      distance: 218,
      estimatedTime: '4 hours',
      fare: 12000
    },
    {
      id: 'route-4',
      origin: 'Kigali',
      destination: 'Nyagatare',
      distance: 161,
      estimatedTime: '3 hours',
      fare: 9000
    },
    {
      id: 'route-5',
      origin: 'Musanze',
      destination: 'Rubavu',
      distance: 62,
      estimatedTime: '1.5 hours',
      fare: 4000
    }
  ];
  localStorage.setItem('routes', JSON.stringify(routes));

  // Initialize operators
  const operators = [
    {
      id: 'operator-1',
      name: 'Volcano Express',
      contact: '+250789123001',
      email: 'info@volcanoexpress.rw'
    },
    {
      id: 'operator-2',
      name: 'Horizon Coach',
      contact: '+250789123002',
      email: 'info@horizoncoach.rw'
    },
    {
      id: 'operator-3',
      name: 'Rwanda Tours',
      contact: '+250789123003',
      email: 'info@rwandatours.rw'
    },
    {
      id: 'operator-4',
      name: 'Capital Express',
      contact: '+250789123004',
      email: 'info@capitalexpress.rw'
    }
  ];
  localStorage.setItem('operators', JSON.stringify(operators));

  // Initialize buses
  const buses = [
    {
      id: 'bus-1',
      plate: 'RAB 123 A',
      operatorId: 'operator-1',
      capacity: 45,
      features: { wifi: true, ac: true, usb: true }
    },
    {
      id: 'bus-2',
      plate: 'RAC 456 B',
      operatorId: 'operator-2',
      capacity: 50,
      features: { wifi: true, ac: true, usb: false }
    },
    {
      id: 'bus-3',
      plate: 'RAD 789 C',
      operatorId: 'operator-3',
      capacity: 45,
      features: { wifi: false, ac: true, usb: true }
    },
    {
      id: 'bus-4',
      plate: 'RAE 012 D',
      operatorId: 'operator-4',
      capacity: 50,
      features: { wifi: true, ac: false, usb: true }
    },
    {
      id: 'bus-5',
      plate: 'RAF 345 E',
      operatorId: 'operator-1',
      capacity: 45,
      features: { wifi: true, ac: true, usb: true }
    }
  ];
  localStorage.setItem('buses', JSON.stringify(buses));

  // Initialize trips
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const trips = [
    {
      id: 'trip-1',
      routeId: 'route-1',
      busId: 'bus-1',
      operatorId: 'operator-1',
      date: formatDate(today),
      departureTime: '08:00',
      status: 'scheduled',
      availableSeats: 45,
      price: 5000
    },
    {
      id: 'trip-2',
      routeId: 'route-1',
      busId: 'bus-1',
      operatorId: 'operator-1',
      date: formatDate(today),
      departureTime: '14:00',
      status: 'scheduled',
      availableSeats: 45,
      price: 5000
    },
    {
      id: 'trip-3',
      routeId: 'route-2',
      busId: 'bus-2',
      operatorId: 'operator-2',
      date: formatDate(today),
      departureTime: '09:00',
      status: 'scheduled',
      availableSeats: 50,
      price: 8000
    },
    {
      id: 'trip-4',
      routeId: 'route-3',
      busId: 'bus-3',
      operatorId: 'operator-3',
      date: formatDate(tomorrow),
      departureTime: '07:00',
      status: 'scheduled',
      availableSeats: 45,
      price: 12000
    },
    {
      id: 'trip-5',
      routeId: 'route-4',
      busId: 'bus-4',
      operatorId: 'operator-4',
      date: formatDate(tomorrow),
      departureTime: '10:00',
      status: 'scheduled',
      availableSeats: 50,
      price: 9000
    },
    {
      id: 'trip-6',
      routeId: 'route-5',
      busId: 'bus-5',
      operatorId: 'operator-1',
      date: formatDate(dayAfterTomorrow),
      departureTime: '11:00',
      status: 'scheduled',
      availableSeats: 45,
      price: 4000
    }
  ];
  localStorage.setItem('trips', JSON.stringify(trips));

  // Mark as initialized
  localStorage.setItem('mockDataInitialized', 'true');
};
