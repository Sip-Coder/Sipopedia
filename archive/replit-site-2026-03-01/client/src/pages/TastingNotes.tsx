import { Link } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Wine, 
  Plus, 
  ChevronRight, 
  Calendar,
  MapPin,
  Grape,
  Check,
  X,
  Eye,
  Trash2,
  Edit,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { TastingNote } from '@shared/schema';

async function fetchTastingNotes(): Promise<TastingNote[]> {
  const response = await fetch('/api/tasting-notes', { credentials: 'include' });
  if (!response.ok) throw new Error('Failed to fetch notes');
  return response.json();
}

async function deleteTastingNote(id: string): Promise<void> {
  const response = await fetch(`/api/tasting-notes/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to delete note');
}

export default function TastingNotes() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['/api/tasting-notes'],
    queryFn: fetchTastingNotes,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTastingNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasting-notes'] });
      toast({ title: 'Note Deleted', description: 'Tasting note has been removed.' });
      setDeleteId(null);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete note.', variant: 'destructive' });
    },
  });

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getScoreColor = (correct: boolean | null) => {
    if (correct === true) return 'text-emerald-600 bg-emerald-50';
    if (correct === false) return 'text-destructive bg-destructive/10';
    return 'text-muted-foreground bg-muted';
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-navy py-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)]" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-gold/60 mb-4">
            <Link href="/dashboard" className="hover:text-gold">Dashboard</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Tasting Notes</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-white mb-1">
                My Tasting Notes
              </h1>
              <p className="text-gray-400 text-sm">
                {notes.length} {notes.length === 1 ? 'wine' : 'wines'} tasted
              </p>
            </div>
            <Link href="/dashboard/tasting-notes/new">
              <Button className="bg-gold hover:bg-gold/90 text-navy gap-2" data-testid="button-new-tasting">
                <Plus className="w-4 h-4" />
                New Tasting
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : notes.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="py-12 text-center">
              <Wine className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Tasting Notes Yet</h3>
              <p className="text-muted-foreground mb-4">Start your wine journey by recording your first tasting.</p>
              <Link href="/dashboard/tasting-notes/new">
                <Button className="bg-gold hover:bg-gold/90 text-navy gap-2">
                  <Plus className="w-4 h-4" />
                  Create Your First Note
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <Card key={note.id} className="border-border/50 hover:border-border transition-colors" data-testid={`note-${note.id}`}>
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                          <Wine className="w-5 h-5 text-burgundy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-medium text-foreground">
                              {note.actualWineName || note.actualGrape || 'Untitled Wine'}
                            </h3>
                            {note.isBlindTasting && (
                              <Badge variant="outline" className="text-xs border-gold/30 text-gold">
                                <Eye className="w-3 h-3 mr-1" />
                                Blind
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(note.tastingDate)}
                            </span>
                            {note.actualCountry && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {note.actualRegion ? `${note.actualRegion}, ${note.actualCountry}` : note.actualCountry}
                              </span>
                            )}
                            {note.actualGrape && (
                              <span className="flex items-center gap-1">
                                <Grape className="w-3.5 h-3.5" />
                                {note.actualGrape}
                              </span>
                            )}
                            {note.actualVintage && (
                              <span>{note.actualVintage}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {note.isBlindTasting && (
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${getScoreColor(note.grapeCorrect)}`} title="Grape">
                          {note.grapeCorrect === true ? <Check className="w-3.5 h-3.5" /> : 
                           note.grapeCorrect === false ? <X className="w-3.5 h-3.5" /> : 
                           <span className="text-xs">G</span>}
                        </div>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${getScoreColor(note.countryCorrect)}`} title="Country">
                          {note.countryCorrect === true ? <Check className="w-3.5 h-3.5" /> : 
                           note.countryCorrect === false ? <X className="w-3.5 h-3.5" /> : 
                           <span className="text-xs">C</span>}
                        </div>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${getScoreColor(note.regionCorrect)}`} title="Region">
                          {note.regionCorrect === true ? <Check className="w-3.5 h-3.5" /> : 
                           note.regionCorrect === false ? <X className="w-3.5 h-3.5" /> : 
                           <span className="text-xs">R</span>}
                        </div>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${getScoreColor(note.vintageCorrect)}`} title="Vintage">
                          {note.vintageCorrect === true ? <Check className="w-3.5 h-3.5" /> : 
                           note.vintageCorrect === false ? <X className="w-3.5 h-3.5" /> : 
                           <span className="text-xs">V</span>}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/tasting-notes/${note.id}`}>
                        <Button variant="ghost" size="sm" data-testid={`button-edit-${note.id}`}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(note.id)}
                        data-testid={`button-delete-${note.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tasting Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this tasting note? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
