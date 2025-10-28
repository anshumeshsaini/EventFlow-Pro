import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-secondary/30">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-accent">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold bg-gradient-accent bg-clip-text text-transparent">
                EventFlow Pro
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Seamlessly manage and discover unforgettable events.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/events" className="hover:text-foreground transition-colors">Browse Events</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/dashboard/create" className="hover:text-foreground transition-colors">Create Event</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 EventFlow Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
