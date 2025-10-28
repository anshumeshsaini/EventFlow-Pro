export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  category: string;
  maxAttendees: number;
  ticketPrice: number;
  organizerId: string;
  createdAt: string;
}

export interface Registration {
  id: string;
  eventId: string;
  name: string;
  email: string;
  numberOfTickets: number;
  specialRequests?: string;
  checkedIn: boolean;
  registeredAt: string;
}

export interface EventContextType {
  events: Event[];
  registrations: Registration[];
  addEvent: (event: Omit<Event, 'id' | 'createdAt'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => Event | undefined;
  registerForEvent: (registration: Omit<Registration, 'id' | 'registeredAt' | 'checkedIn'>) => void;
  getRegistrationsByEventId: (eventId: string) => Registration[];
  checkInAttendee: (registrationId: string) => void;
}
