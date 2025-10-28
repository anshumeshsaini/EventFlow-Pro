import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, LayoutDashboard, Plus } from 'lucide-react';

export const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-accent">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
            EventFlow Pro
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <Button
            variant={isActive('/') ? 'secondary' : 'ghost'}
            asChild
          >
            <Link to="/">Home</Link>
          </Button>
          <Button
            variant={isActive('/events') ? 'secondary' : 'ghost'}
            asChild
          >
            <Link to="/events">Events</Link>
          </Button>
          <Button
            variant={isActive('/dashboard') ? 'secondary' : 'ghost'}
            asChild
          >
            <Link to="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </nav>

        <Button asChild className="shadow-glow">
          <Link to="/dashboard/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>
    </header>
  );
};
