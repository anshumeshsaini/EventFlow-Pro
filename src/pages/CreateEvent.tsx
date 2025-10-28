import { CreateEventForm } from '@/components/admin/CreateEventForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CreateEvent() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <CreateEventForm />
      </div>
    </div>
  );
}
