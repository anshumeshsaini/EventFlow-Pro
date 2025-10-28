import { Hero } from '@/components/Hero';
import { useEvents } from '@/context/EventContext';
import { EventCard } from '@/components/events/EventCard';
import { Event } from '@/types';
import { useState } from 'react';
import { EventDetails } from '@/components/events/EventDetails';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { events } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const featuredEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Featured Events Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Events</h2>
            <p className="text-lg text-muted-foreground">
              Don't miss out on these amazing upcoming events
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewDetails={setSelectedEvent}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/events">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <EventDetails
        event={selectedEvent}
        open={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default Index;
