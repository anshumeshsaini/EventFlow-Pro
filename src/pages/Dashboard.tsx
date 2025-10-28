import { DashboardStats } from '@/components/admin/DashboardStats';
import { EventManagement } from '@/components/admin/EventManagement';
import { RegistrationsManagement } from '@/components/admin/RegistrationsManagement';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your events and registrations</p>
          </div>
          <Button asChild className="shadow-glow">
            <Link to="/dashboard/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <DashboardStats />
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          <EventManagement />
          <RegistrationsManagement />
        </div>
      </div>
    </div>
  );
}
