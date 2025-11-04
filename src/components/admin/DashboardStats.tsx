import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEvents } from '@/context/EventContext';
import { Calendar, Users, Ticket, TrendingUp, Sparkles, ArrowUp, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export const DashboardStats = () => {
  const { events, registrations } = useEvents();
  const [animatedValues, setAnimatedValues] = useState({
    events: 0,
    registrations: 0,
    tickets: 0,
    revenue: 0
  });

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).length;
  const totalRegistrations = registrations.length;
  const totalTickets = registrations.reduce((sum, reg) => sum + reg.numberOfTickets, 0);
  const totalRevenue = registrations.reduce((sum, reg) => {
    const event = events.find(e => e.id === reg.eventId);
    return sum + (event ? event.ticketPrice * reg.numberOfTickets : 0);
  }, 0);

  // Animation for counter values
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animateValue = (start: number, end: number, setter: (value: number) => void) => {
      let current = start;
      const increment = (end - start) / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
          current = end;
          clearInterval(timer);
        }
        setter(Math.round(current));
      }, stepDuration);
    };

    animateValue(0, events.length, (val) => setAnimatedValues(prev => ({...prev, events: val})));
    animateValue(0, totalRegistrations, (val) => setAnimatedValues(prev => ({...prev, registrations: val})));
    animateValue(0, totalTickets, (val) => setAnimatedValues(prev => ({...prev, tickets: val})));
    animateValue(0, totalRevenue, (val) => setAnimatedValues(prev => ({...prev, revenue: val})));
  }, [events.length, totalRegistrations, totalTickets, totalRevenue]);

  const stats = [
    {
      title: 'Total Events',
      value: animatedValues.events,
      icon: Calendar,
      description: `${upcomingEvents} upcoming`,
      gradient: 'from-cyan-500 via-blue-500 to-purple-600',
      bgGradient: 'from-cyan-500/10 via-blue-500/10 to-purple-600/10',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Total Registrations',
      value: animatedValues.registrations,
      icon: Users,
      description: 'All time registrations',
      gradient: 'from-purple-500 via-pink-500 to-rose-600',
      bgGradient: 'from-purple-500/10 via-pink-500/10 to-rose-600/10',
      trend: '+23%',
      trendUp: true,
    },
    {
      title: 'Tickets Sold',
      value: animatedValues.tickets,
      icon: Ticket,
      description: 'Across all events',
      gradient: 'from-orange-500 via-red-500 to-amber-600',
      bgGradient: 'from-orange-500/10 via-red-500/10 to-amber-600/10',
      trend: '+18%',
      trendUp: true,
    },
    {
      title: 'Total Revenue',
      value: `$${animatedValues.revenue.toLocaleString()}`,
      icon: TrendingUp,
      description: 'Gross earnings',
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
      bgGradient: 'from-green-500/10 via-emerald-500/10 to-teal-600/10',
      trend: '+31%',
      trendUp: true,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Background Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-3xl blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
          
          {/* Animated Border */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-3xl p-0.5 opacity-0 group-hover:opacity-100 transition-all duration-500`}>
            <div className="w-full h-full bg-background rounded-3xl"></div>
          </div>

          <Card className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-soft-xl hover:shadow-glow-strong transition-all duration-500 overflow-hidden">
            {/* Animated Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            {/* Floating Particles */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
            </div>

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
              <CardTitle className="text-sm font-semibold text-foreground/80">
                {stat.title}
              </CardTitle>
              <div className={`relative rounded-2xl bg-gradient-to-br ${stat.gradient} p-3 shadow-glow group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className="flex items-end justify-between mb-2">
                <div className="text-3xl font-black bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                  stat.trendUp 
                    ? 'bg-green-500/20 text-green-600' 
                    : 'bg-red-500/20 text-red-600'
                }`}>
                  {stat.trendUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {stat.trend}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-medium">
                  {stat.description}
                </p>
                {/* Progress Bar */}
                <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000`}
                    style={{ 
                      width: `${Math.min(100, (index + 1) * 25 + Math.random() * 20)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
          </Card>
        </div>
      ))}
    </div>
  );
};