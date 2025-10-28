import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Event, Registration, EventContextType } from '@/types';
import { toast } from 'sonner';

const EventContext = createContext<EventContextType | undefined>(undefined);

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2025',
    description: 'Join us for an inspiring day of cutting-edge technology discussions, networking with industry leaders, and hands-on workshops. Discover the latest trends in AI, blockchain, and cloud computing.',
    date: '2025-02-15',
    time: '09:00 AM',
    location: 'San Francisco Convention Center',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    category: 'Technology',
    maxAttendees: 500,
    ticketPrice: 149,
    organizerId: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Digital Marketing Masterclass',
    description: 'Learn advanced digital marketing strategies from industry experts. Topics include SEO, social media marketing, content strategy, and analytics. Perfect for marketers looking to level up their skills.',
    date: '2025-02-20',
    time: '02:00 PM',
    location: 'Virtual Event',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
    category: 'Business',
    maxAttendees: 1000,
    ticketPrice: 99,
    organizerId: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Summer Music Festival',
    description: 'Experience an unforgettable evening with top artists and emerging talents. Multiple stages, food trucks, and a celebration of music in all its forms. Bring your friends and enjoy the vibes!',
    date: '2025-03-10',
    time: '05:00 PM',
    location: 'Central Park Amphitheater',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
    category: 'Entertainment',
    maxAttendees: 5000,
    ticketPrice: 75,
    organizerId: 'admin',
    createdAt: new Date().toISOString(),
  },
];

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useLocalStorage<Event[]>('eventflow_events', MOCK_EVENTS);
  const [registrations, setRegistrations] = useLocalStorage<Registration[]>('eventflow_registrations', []);

  const addEvent = (eventData: Omit<Event, 'id' | 'createdAt'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setEvents([...events, newEvent]);
    toast.success('Event created successfully!');
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    setEvents(events.map(event => event.id === id ? { ...event, ...eventData } : event));
    toast.success('Event updated successfully!');
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    setRegistrations(registrations.filter(reg => reg.eventId !== id));
    toast.success('Event deleted successfully!');
  };

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  const registerForEvent = (registrationData: Omit<Registration, 'id' | 'registeredAt' | 'checkedIn'>) => {
    const newRegistration: Registration = {
      ...registrationData,
      id: Date.now().toString(),
      registeredAt: new Date().toISOString(),
      checkedIn: false,
    };
    setRegistrations([...registrations, newRegistration]);
    toast.success('Registration successful! Check your email for confirmation.');
  };

  const getRegistrationsByEventId = (eventId: string) => {
    return registrations.filter(reg => reg.eventId === eventId);
  };

  const checkInAttendee = (registrationId: string) => {
    setRegistrations(registrations.map(reg => 
      reg.id === registrationId ? { ...reg, checkedIn: true } : reg
    ));
    toast.success('Attendee checked in successfully!');
  };

  const value: EventContextType = {
    events,
    registrations,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    registerForEvent,
    getRegistrationsByEventId,
    checkInAttendee,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
