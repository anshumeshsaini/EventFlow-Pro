import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEvents } from '@/context/EventContext';
import { Calendar, Users, Ticket, TrendingUp } from 'lucide-react';

export const DashboardStats = () => {
  const { events, registrations } = useEvents();

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).length;
  const totalRegistrations = registrations.length;
  const totalRevenue = registrations.reduce((sum, reg) => {
    const event = events.find(e => e.id === reg.eventId);
    return sum + (event ? event.ticketPrice * reg.numberOfTickets : 0);
  }, 0);

  const stats = [
    {
      title: 'Total Events',
      value: events.length,
      icon: Calendar,
      description: `${upcomingEvents} upcoming`,
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Total Registrations',
      value: totalRegistrations,
      icon: Users,
      description: 'All time',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Total Tickets',
      value: registrations.reduce((sum, reg) => sum + reg.numberOfTickets, 0),
      icon: Ticket,
      description: 'Sold across all events',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      description: 'Total earnings',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`rounded-lg bg-gradient-to-br ${stat.gradient} p-2`}>
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
