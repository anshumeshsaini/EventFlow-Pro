import { DashboardStats } from '@/components/admin/DashboardStats';
import { EventManagement } from '@/components/admin/EventManagement';
import { RegistrationsManagement } from '@/components/admin/RegistrationsManagement';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, TrendingUp, Users, Calendar, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      <div className="container py-8">
        {/* Enhanced Header */}
        <div className="mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-accent/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between relative z-10">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-accent shadow-glow">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                 
                
                </div>
              </div>
            </div>
            
            <Button 
              asChild 
              size="lg"
              className="relative bg-gradient-accent hover:bg-gradient-accent/90 text-white font-bold px-8 py-6 rounded-2xl shadow-glow-intense hover:shadow-glow-strong transition-all duration-300 hover:scale-105 group overflow-hidden"
            >
              <Link
  to="/dashboard/create"
  className="relative flex items-center justify-center px-6 py-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white font-semibold shadow-lg group transition-all duration-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.8)]"
>
  {/* Glowing sweep animation */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
  
  {/* Icon rotation */}
  <Plus className="mr-2 h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
  
  Create Event
</Link>

            </Button>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Performance Overview</h2>
            </div>
            <DashboardStats />
          </div>
        </div>

        {/* Enhanced Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2 relative">
          {/* Background Decorations */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl"></div>
          
          {/* Event Management Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-accent/10 rounded-3xl blur-md transition-all duration-500 group-hover:blur-lg"></div>
            <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-1 shadow-soft-xl hover:shadow-glow transition-all duration-500 group-hover:scale-[1.02] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Event Management</h3>
                </div>
                <EventManagement />
              </div>
            </div>
          </div>

          {/* Registrations Management Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-primary/10 rounded-3xl blur-md transition-all duration-500 group-hover:blur-lg"></div>
            <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-1 shadow-soft-xl hover:shadow-glow transition-all duration-500 group-hover:scale-[1.02] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold">Registrations</h3>
                </div>
                <RegistrationsManagement />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
       
      </div>
    </div>
  );
}