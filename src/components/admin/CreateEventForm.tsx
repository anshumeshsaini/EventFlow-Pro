import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '@/context/EventContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Calendar, MapPin, Image, Users, DollarSign, ArrowLeft, Sparkles } from 'lucide-react';

const CATEGORIES = ['Technology', 'Business', 'Entertainment', 'Sports', 'Education', 'Arts', 'Other'];

export const CreateEventForm = () => {
  const navigate = useNavigate();
  const { addEvent } = useEvents();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    imageUrl: '',
    category: '',
    maxAttendees: 100,
    ticketPrice: 0,
    organizerId: 'admin',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    addEvent(formData);
    setLoading(false);
    navigate('/dashboard');
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-accent shadow-glow">
            <Calendar className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black bg-gradient-accent bg-clip-text text-transparent">
              Create New Event
            </h1>
            <p className="text-lg text-muted-foreground font-medium flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              Craft unforgettable experiences for your audience
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Background Decorations */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        
        <Card className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-soft-xl overflow-hidden">
          {/* Gradient Border Top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-purple-600"></div>
          
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              Event Details
            </CardTitle>
            <p className="text-muted-foreground">Fill in the information below to create your amazing event</p>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Main Information Grid */}
              <div className="grid gap-8 md:grid-cols-2">
                {/* Event Title */}
                <div className="space-y-3 group">
                  <Label htmlFor="title" className="text-sm font-semibold flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    Event Title *
                  </Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Tech Innovation Summit 2025"
                    className="rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary h-12"
                  />
                </div>

                {/* Category */}
                <div className="space-y-3 group">
                  <Label htmlFor="category" className="text-sm font-semibold flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-accent/10">
                      <Users className="h-3 w-3 text-accent" />
                    </div>
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange('category', value)}
                    required
                  >
                    <SelectTrigger className="rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary h-12">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-border/50 backdrop-blur-xl">
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category} className="rounded-lg focus:bg-accent/10">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date */}
                <div className="space-y-3 group">
                  <Label htmlFor="date" className="text-sm font-semibold flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-green-500/10">
                      <Calendar className="h-3 w-3 text-green-500" />
                    </div>
                    Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary h-12"
                  />
                </div>

                {/* Time */}
                <div className="space-y-3 group">
                  <Label htmlFor="time" className="text-sm font-semibold flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-500/10">
                      <Calendar className="h-3 w-3 text-blue-500" />
                    </div>
                    Time *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary h-12"
                  />
                </div>

                {/* Location */}
                <div className="space-y-3 group">
                  <Label htmlFor="location" className="text-sm font-semibold flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-orange-500/10">
                      <MapPin className="h-3 w-3 text-orange-500" />
                    </div>
                    Location *
                  </Label>
                  <Input
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="San Francisco Convention Center"
                    className="rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary h-12"
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-3 group">
                  <Label htmlFor="imageUrl" className="text-sm font-semibold flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-purple-500/10">
                      <Image className="h-3 w-3 text-purple-500" />
                    </div>
                    Image URL *
                  </Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary h-12"
                  />
                </div>

                {/* Max Attendees */}
                <div className="space-y-3 group">
                  <Label htmlFor="maxAttendees" className="text-sm font-semibold flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-cyan-500/10">
                      <Users className="h-3 w-3 text-cyan-500" />
                    </div>
                    Max Attendees *
                  </Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    min="1"
                    required
                    value={formData.maxAttendees}
                    onChange={(e) => handleInputChange('maxAttendees', parseInt(e.target.value))}
                    className="rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary h-12"
                  />
                </div>

                {/* Ticket Price */}
                <div className="space-y-3 group">
                  <Label htmlFor="ticketPrice" className="text-sm font-semibold flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/10">
                      <DollarSign className="h-3 w-3 text-emerald-500" />
                    </div>
                    Ticket Price ($) *
                  </Label>
                  <Input
                    id="ticketPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={formData.ticketPrice}
                    onChange={(e) => handleInputChange('ticketPrice', parseFloat(e.target.value))}
                    className="rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary h-12"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 group">
                <Label htmlFor="description" className="text-sm font-semibold flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-amber-500/10">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                  </div>
                  Description *
                </Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your event in detail... What makes it special? What will attendees experience?"
                  rows={6}
                  className="rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 h-12 rounded-xl border-border/50 bg-background/50 hover:bg-muted/50 transition-all duration-300 group hover:scale-105 font-semibold"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 h-12 rounded-xl bg-gradient-accent hover:bg-gradient-accent/90 text-white font-bold shadow-glow hover:shadow-glow-strong transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Event...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Create Event
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};