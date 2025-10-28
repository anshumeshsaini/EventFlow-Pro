import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-hero opacity-90" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-cyan/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blue/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm animate-fade-in">
            <Sparkles className="mr-2 h-4 w-4" />
            Welcome to the future of event management
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl animate-fade-in-up">
            Seamlessly Manage &{' '}
            <span className="bg-gradient-to-r from-cyan via-blue to-purple-400 bg-clip-text text-transparent">
              Discover Unforgettable
            </span>{' '}
            Events
          </h1>

          {/* Sub-headline */}
          <p className="mb-10 text-xl text-white/80 md:text-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            The modern platform for creating, managing, and attending extraordinary events.
            From conferences to concerts, we've got you covered.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button asChild size="lg" className="group shadow-glow w-full sm:w-auto">
              <Link to="/events">
                Browse Events
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20">
              <Link to="/dashboard/create">Get Started</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <Calendar className="mx-auto mb-2 h-8 w-8 text-cyan" />
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-sm text-white/70">Events Created</div>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <Users className="mx-auto mb-2 h-8 w-8 text-cyan" />
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-sm text-white/70">Happy Attendees</div>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6">
              <Sparkles className="mx-auto mb-2 h-8 w-8 text-cyan" />
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-sm text-white/70">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
