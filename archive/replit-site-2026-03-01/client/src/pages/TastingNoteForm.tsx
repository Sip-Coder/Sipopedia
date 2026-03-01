import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  Wine, 
  Eye, 
  Flower2, 
  CircleDot, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft,
  Save,
  Loader2,
  Lightbulb,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { tastingOptions } from '@shared/schema';
import type { TastingNote, InsertTastingNote } from '@shared/schema';

type FormData = Partial<InsertTastingNote>;

const steps = [
  { id: 'sight', label: 'Sight', icon: Eye },
  { id: 'nose', label: 'Nose', icon: Flower2 },
  { id: 'palate', label: 'Palate', icon: CircleDot },
  { id: 'conclusion', label: 'Conclusion', icon: Lightbulb },
  { id: 'reveal', label: 'Reveal', icon: CheckCircle },
];

async function createTastingNote(data: FormData): Promise<TastingNote> {
  const response = await fetch('/api/tasting-notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to save tasting note');
  }
  // Handle potential empty response for 201/204
  const text = await response.text();
  if (!text) {
    return {} as TastingNote; // Return empty object if no body
  }
  return JSON.parse(text);
}

async function updateTastingNote(id: string, data: FormData): Promise<TastingNote> {
  const response = await fetch(`/api/tasting-notes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update tasting note');
  }
  // Handle potential empty response
  const text = await response.text();
  if (!text) {
    return {} as TastingNote;
  }
  return JSON.parse(text);
}

async function fetchTastingNote(id: string): Promise<TastingNote> {
  const response = await fetch(`/api/tasting-notes/${id}`, { credentials: 'include' });
  if (!response.ok) throw new Error('Failed to fetch tasting note');
  return response.json();
}

export default function TastingNoteForm() {
  const [, setLocation] = useLocation();
  const params = useParams<{ id?: string }>();
  const isEditing = !!params.id;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [wineType, setWineType] = useState<'white' | 'rose' | 'red'>('red');
  const [formData, setFormData] = useState<FormData>({
    isBlindTasting: true,
    tastingDate: new Date(),
  });

  // Fetch existing note if editing
  const { data: existingNote, isLoading: isLoadingNote } = useQuery({
    queryKey: ['/api/tasting-notes', params.id],
    queryFn: () => fetchTastingNote(params.id!),
    enabled: isEditing,
  });

  // Update form data when existing note is loaded
  useEffect(() => {
    if (existingNote) {
      setFormData(existingNote);
    }
  }, [existingNote]);

  const saveMutation = useMutation({
    mutationFn: (data: FormData) => 
      isEditing ? updateTastingNote(params.id!, data) : createTastingNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasting-notes'] });
      toast({
        title: isEditing ? 'Note Updated' : 'Note Saved',
        description: 'Your tasting note has been saved successfully.',
      });
      setLocation('/dashboard/tasting-notes');
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to save tasting note. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const dataToSave = {
      ...formData,
      tastingDate: new Date(),
    };
    saveMutation.mutate(dataToSave);
  };

  const getColorOptions = () => {
    switch (wineType) {
      case 'white': return tastingOptions.whiteColors;
      case 'rose': return tastingOptions.roseColors;
      case 'red': return tastingOptions.redColors;
    }
  };

  if (isEditing && isLoadingNote) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-navy py-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-gold/60 mb-4">
            <Link href="/dashboard" className="hover:text-gold">Dashboard</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/dashboard/tasting-notes" className="hover:text-gold">Tasting Notes</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">{isEditing ? 'Edit Note' : 'New Tasting'}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-white mb-1">
                {isEditing ? 'Edit Tasting Note' : 'Wine Tasting Session'}
              </h1>
              <p className="text-gray-400 text-sm">
                Systematic wine evaluation using CMS/SWE/WSET methodology
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="blind-toggle" className="text-white text-sm">Blind Tasting</Label>
              <Switch
                id="blind-toggle"
                checked={formData.isBlindTasting}
                onCheckedChange={(checked) => updateField('isBlindTasting', checked)}
                data-testid="switch-blind-tasting"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                index === currentStep
                  ? 'bg-gold text-navy'
                  : index < currentStep
                  ? 'bg-gold/20 text-gold'
                  : 'bg-muted text-muted-foreground'
              }`}
              data-testid={`step-${step.id}`}
            >
              <step.icon className="w-4 h-4" />
              {step.label}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            <Label className="text-foreground">Wine Type:</Label>
            <div className="flex gap-2">
              {(['white', 'rose', 'red'] as const).map((type) => (
                <Badge
                  key={type}
                  variant={wineType === type ? 'default' : 'outline'}
                  className={`cursor-pointer capitalize ${
                    wineType === type 
                      ? type === 'white' ? 'bg-amber-200 text-amber-900' 
                        : type === 'rose' ? 'bg-pink-300 text-pink-900'
                        : 'bg-red-800 text-white'
                      : ''
                  }`}
                  onClick={() => setWineType(type)}
                  data-testid={`badge-wine-${type}`}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {currentStep === 0 && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-serif">
                <Eye className="w-5 h-5 text-gold" />
                Sight
              </CardTitle>
              <CardDescription>Visual examination of the wine</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Clarity</Label>
                  <Select value={formData.sightClarity || ''} onValueChange={(v) => updateField('sightClarity', v)}>
                    <SelectTrigger data-testid="select-sight-clarity">
                      <SelectValue placeholder="Select clarity" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.clarity.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Color Intensity</Label>
                  <Select value={formData.sightIntensity || ''} onValueChange={(v) => updateField('sightIntensity', v)}>
                    <SelectTrigger data-testid="select-sight-intensity">
                      <SelectValue placeholder="Select intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.colorIntensity.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Color</Label>
                  <Select value={formData.sightColor || ''} onValueChange={(v) => updateField('sightColor', v)}>
                    <SelectTrigger data-testid="select-sight-color">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {getColorOptions().map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Rim Variation</Label>
                  <Select value={formData.sightRim || ''} onValueChange={(v) => updateField('sightRim', v)}>
                    <SelectTrigger data-testid="select-sight-rim">
                      <SelectValue placeholder="Select rim" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.rimVariation.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tears/Legs</Label>
                  <Select value={formData.sightTears || ''} onValueChange={(v) => updateField('sightTears', v)}>
                    <SelectTrigger data-testid="select-sight-tears">
                      <SelectValue placeholder="Select viscosity" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.tears.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Gas/Effervescence</Label>
                  <Select value={formData.sightGas || ''} onValueChange={(v) => updateField('sightGas', v)}>
                    <SelectTrigger data-testid="select-sight-gas">
                      <SelectValue placeholder="Select gas level" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.gasLevel.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sight Notes</Label>
                <Textarea
                  placeholder="Additional observations about appearance..."
                  value={formData.sightNotes || ''}
                  onChange={(e) => updateField('sightNotes', e.target.value)}
                  className="min-h-[80px]"
                  data-testid="textarea-sight-notes"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 1 && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-serif">
                <Flower2 className="w-5 h-5 text-gold" />
                Nose
              </CardTitle>
              <CardDescription>Aromatic evaluation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select value={formData.noseCondition || ''} onValueChange={(v) => updateField('noseCondition', v)}>
                    <SelectTrigger data-testid="select-nose-condition">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.noseCondition.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Intensity</Label>
                  <Select value={formData.noseIntensity || ''} onValueChange={(v) => updateField('noseIntensity', v)}>
                    <SelectTrigger data-testid="select-nose-intensity">
                      <SelectValue placeholder="Select intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.aromaIntensity.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Aroma Development</Label>
                  <Select value={formData.noseAromaAge || ''} onValueChange={(v) => updateField('noseAromaAge', v)}>
                    <SelectTrigger data-testid="select-nose-age">
                      <SelectValue placeholder="Select development" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.aromaAge.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Primary Aromas</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fruit Notes</Label>
                    <Textarea
                      placeholder="Citrus, stone fruit, tropical, red berries, black fruit..."
                      value={formData.noseFruitPrimary || ''}
                      onChange={(e) => updateField('noseFruitPrimary', e.target.value)}
                      className="min-h-[60px]"
                      data-testid="textarea-nose-fruit"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Floral Notes</Label>
                    <Textarea
                      placeholder="Rose, violet, elderflower, orange blossom..."
                      value={formData.noseFloralPrimary || ''}
                      onChange={(e) => updateField('noseFloralPrimary', e.target.value)}
                      className="min-h-[60px]"
                      data-testid="textarea-nose-floral"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Herbal/Vegetal</Label>
                    <Textarea
                      placeholder="Green pepper, eucalyptus, herbs, grass..."
                      value={formData.noseHerbal || ''}
                      onChange={(e) => updateField('noseHerbal', e.target.value)}
                      className="min-h-[60px]"
                      data-testid="textarea-nose-herbal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Earth/Mineral</Label>
                    <Textarea
                      placeholder="Wet stone, slate, forest floor, mushroom..."
                      value={formData.noseEarth || ''}
                      onChange={(e) => updateField('noseEarth', e.target.value)}
                      className="min-h-[60px]"
                      data-testid="textarea-nose-earth"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Secondary & Tertiary Aromas</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Oak Influence</Label>
                    <Textarea
                      placeholder="Vanilla, toast, smoke, cedar..."
                      value={formData.noseOak || ''}
                      onChange={(e) => updateField('noseOak', e.target.value)}
                      className="min-h-[60px]"
                      data-testid="textarea-nose-oak"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary (MLF/Lees)</Label>
                    <Textarea
                      placeholder="Butter, cream, brioche, yeast..."
                      value={formData.noseSecondary || ''}
                      onChange={(e) => updateField('noseSecondary', e.target.value)}
                      className="min-h-[60px]"
                      data-testid="textarea-nose-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tertiary (Age)</Label>
                    <Textarea
                      placeholder="Leather, tobacco, dried fruit, nuts..."
                      value={formData.noseTertiary || ''}
                      onChange={(e) => updateField('noseTertiary', e.target.value)}
                      className="min-h-[60px]"
                      data-testid="textarea-nose-tertiary"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Nose Notes</Label>
                <Textarea
                  placeholder="Other observations..."
                  value={formData.noseNotes || ''}
                  onChange={(e) => updateField('noseNotes', e.target.value)}
                  className="min-h-[80px]"
                  data-testid="textarea-nose-notes"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-serif">
                <CircleDot className="w-5 h-5 text-gold" />
                Palate
              </CardTitle>
              <CardDescription>Taste and structural evaluation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Sweetness</Label>
                  <Select value={formData.palateSweetness || ''} onValueChange={(v) => updateField('palateSweetness', v)}>
                    <SelectTrigger data-testid="select-palate-sweetness">
                      <SelectValue placeholder="Select sweetness" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.sweetness.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Acidity</Label>
                  <Select value={formData.palateAcidity || ''} onValueChange={(v) => updateField('palateAcidity', v)}>
                    <SelectTrigger data-testid="select-palate-acidity">
                      <SelectValue placeholder="Select acidity" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.acidity.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tannin Level</Label>
                  <Select value={formData.palateTannin || ''} onValueChange={(v) => updateField('palateTannin', v)}>
                    <SelectTrigger data-testid="select-palate-tannin">
                      <SelectValue placeholder="Select tannin" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.tannin.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tannin Nature</Label>
                  <Select value={formData.palateTanninNature || ''} onValueChange={(v) => updateField('palateTanninNature', v)}>
                    <SelectTrigger data-testid="select-palate-tannin-nature">
                      <SelectValue placeholder="Select nature" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.tanninNature.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Alcohol</Label>
                  <Select value={formData.palateAlcohol || ''} onValueChange={(v) => updateField('palateAlcohol', v)}>
                    <SelectTrigger data-testid="select-palate-alcohol">
                      <SelectValue placeholder="Select alcohol" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.alcohol.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Body</Label>
                  <Select value={formData.palateBody || ''} onValueChange={(v) => updateField('palateBody', v)}>
                    <SelectTrigger data-testid="select-palate-body">
                      <SelectValue placeholder="Select body" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.body.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Flavor Intensity</Label>
                  <Select value={formData.palateIntensity || ''} onValueChange={(v) => updateField('palateIntensity', v)}>
                    <SelectTrigger data-testid="select-palate-intensity">
                      <SelectValue placeholder="Select intensity" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.flavorIntensity.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Finish Length</Label>
                  <Select value={formData.palateFinish || ''} onValueChange={(v) => updateField('palateFinish', v)}>
                    <SelectTrigger data-testid="select-palate-finish">
                      <SelectValue placeholder="Select finish" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.finish.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Mousse (Sparkling)</Label>
                  <Select value={formData.palateMousse || ''} onValueChange={(v) => updateField('palateMousse', v)}>
                    <SelectTrigger data-testid="select-palate-mousse">
                      <SelectValue placeholder="Select mousse" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.mousse.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Complexity</Label>
                  <Select value={formData.palateComplexity || ''} onValueChange={(v) => updateField('palateComplexity', v)}>
                    <SelectTrigger data-testid="select-palate-complexity">
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.complexity.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Balance</Label>
                  <Select value={formData.palateBalance || ''} onValueChange={(v) => updateField('palateBalance', v)}>
                    <SelectTrigger data-testid="select-palate-balance">
                      <SelectValue placeholder="Select balance" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.balance.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Flavor Descriptors</Label>
                <Textarea
                  placeholder="Describe the flavors you detect on the palate..."
                  value={formData.palateFlavors || ''}
                  onChange={(e) => updateField('palateFlavors', e.target.value)}
                  className="min-h-[80px]"
                  data-testid="textarea-palate-flavors"
                />
              </div>

              <div className="space-y-2">
                <Label>Palate Notes</Label>
                <Textarea
                  placeholder="Additional palate observations..."
                  value={formData.palateNotes || ''}
                  onChange={(e) => updateField('palateNotes', e.target.value)}
                  className="min-h-[80px]"
                  data-testid="textarea-palate-notes"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-serif">
                <Lightbulb className="w-5 h-5 text-gold" />
                Conclusion
              </CardTitle>
              <CardDescription>Quality assessment and your blind guess</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Quality Level</Label>
                  <Select value={formData.conclusionQuality || ''} onValueChange={(v) => updateField('conclusionQuality', v)}>
                    <SelectTrigger data-testid="select-conclusion-quality">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.quality.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Drinking Window</Label>
                  <Select value={formData.conclusionReadiness || ''} onValueChange={(v) => updateField('conclusionReadiness', v)}>
                    <SelectTrigger data-testid="select-conclusion-readiness">
                      <SelectValue placeholder="Select readiness" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.readiness.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.isBlindTasting && (
                <div className="p-4 rounded-lg bg-gold/5 border border-gold/20">
                  <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <Wine className="w-4 h-4 text-gold" />
                    Your Blind Guess
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Grape Variety</Label>
                      <Select value={formData.conclusionGuessGrape || ''} onValueChange={(v) => updateField('conclusionGuessGrape', v)}>
                        <SelectTrigger data-testid="select-guess-grape">
                          <SelectValue placeholder="Your guess" />
                        </SelectTrigger>
                        <SelectContent>
                          {tastingOptions.commonGrapes.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Select value={formData.conclusionGuessCountry || ''} onValueChange={(v) => updateField('conclusionGuessCountry', v)}>
                        <SelectTrigger data-testid="select-guess-country">
                          <SelectValue placeholder="Your guess" />
                        </SelectTrigger>
                        <SelectContent>
                          {tastingOptions.commonCountries.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Region</Label>
                      <Input
                        placeholder="e.g., Burgundy, Napa Valley"
                        value={formData.conclusionGuessRegion || ''}
                        onChange={(e) => updateField('conclusionGuessRegion', e.target.value)}
                        data-testid="input-guess-region"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Vintage</Label>
                      <Input
                        placeholder="e.g., 2019"
                        value={formData.conclusionGuessVintage || ''}
                        onChange={(e) => updateField('conclusionGuessVintage', e.target.value)}
                        data-testid="input-guess-vintage"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Producer (Optional)</Label>
                      <Input
                        placeholder="Your guess"
                        value={formData.conclusionGuessProducer || ''}
                        onChange={(e) => updateField('conclusionGuessProducer', e.target.value)}
                        data-testid="input-guess-producer"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Confidence Level (1-5)</Label>
                      <Select 
                        value={formData.conclusionConfidence?.toString() || ''} 
                        onValueChange={(v) => updateField('conclusionConfidence', parseInt(v))}
                      >
                        <SelectTrigger data-testid="select-confidence">
                          <SelectValue placeholder="How confident?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 - Wild guess</SelectItem>
                          <SelectItem value="2">2 - Low confidence</SelectItem>
                          <SelectItem value="3">3 - Moderate</SelectItem>
                          <SelectItem value="4">4 - Fairly confident</SelectItem>
                          <SelectItem value="5">5 - Very confident</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {currentStep === 4 && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-serif">
                <CheckCircle className="w-5 h-5 text-gold" />
                Reveal & Score
              </CardTitle>
              <CardDescription>Record the actual wine and track your accuracy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Wine Name</Label>
                  <Input
                    placeholder="Full wine name"
                    value={formData.actualWineName || ''}
                    onChange={(e) => updateField('actualWineName', e.target.value)}
                    data-testid="input-actual-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Producer</Label>
                  <Input
                    placeholder="Producer/Winery"
                    value={formData.actualProducer || ''}
                    onChange={(e) => updateField('actualProducer', e.target.value)}
                    data-testid="input-actual-producer"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Grape Variety</Label>
                  <Select value={formData.actualGrape || ''} onValueChange={(v) => updateField('actualGrape', v)}>
                    <SelectTrigger data-testid="select-actual-grape">
                      <SelectValue placeholder="Actual grape" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.commonGrapes.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select value={formData.actualCountry || ''} onValueChange={(v) => updateField('actualCountry', v)}>
                    <SelectTrigger data-testid="select-actual-country">
                      <SelectValue placeholder="Actual country" />
                    </SelectTrigger>
                    <SelectContent>
                      {tastingOptions.commonCountries.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Region</Label>
                  <Input
                    placeholder="e.g., Burgundy, Napa Valley"
                    value={formData.actualRegion || ''}
                    onChange={(e) => updateField('actualRegion', e.target.value)}
                    data-testid="input-actual-region"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Appellation</Label>
                  <Input
                    placeholder="Specific appellation"
                    value={formData.actualAppellation || ''}
                    onChange={(e) => updateField('actualAppellation', e.target.value)}
                    data-testid="input-actual-appellation"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Vintage</Label>
                  <Input
                    placeholder="e.g., 2019"
                    value={formData.actualVintage || ''}
                    onChange={(e) => updateField('actualVintage', e.target.value)}
                    data-testid="input-actual-vintage"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Price (Optional)</Label>
                  <Input
                    placeholder="e.g., $45"
                    value={formData.actualPrice || ''}
                    onChange={(e) => updateField('actualPrice', e.target.value)}
                    data-testid="input-actual-price"
                  />
                </div>
              </div>

              {formData.isBlindTasting && (
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <h4 className="font-medium text-foreground mb-4">Score Your Guesses</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                      <div>
                        <p className="text-sm font-medium">Grape Correct?</p>
                        <p className="text-xs text-muted-foreground">
                          Guessed: {formData.conclusionGuessGrape || 'N/A'} | Actual: {formData.actualGrape || 'N/A'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={formData.grapeCorrect === true ? 'default' : 'outline'}
                          className={formData.grapeCorrect === true ? 'bg-emerald-600' : ''}
                          onClick={() => updateField('grapeCorrect', true)}
                          data-testid="button-grape-correct"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={formData.grapeCorrect === false ? 'default' : 'outline'}
                          className={formData.grapeCorrect === false ? 'bg-destructive' : ''}
                          onClick={() => updateField('grapeCorrect', false)}
                          data-testid="button-grape-incorrect"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                      <div>
                        <p className="text-sm font-medium">Country Correct?</p>
                        <p className="text-xs text-muted-foreground">
                          Guessed: {formData.conclusionGuessCountry || 'N/A'} | Actual: {formData.actualCountry || 'N/A'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={formData.countryCorrect === true ? 'default' : 'outline'}
                          className={formData.countryCorrect === true ? 'bg-emerald-600' : ''}
                          onClick={() => updateField('countryCorrect', true)}
                          data-testid="button-country-correct"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={formData.countryCorrect === false ? 'default' : 'outline'}
                          className={formData.countryCorrect === false ? 'bg-destructive' : ''}
                          onClick={() => updateField('countryCorrect', false)}
                          data-testid="button-country-incorrect"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                      <div>
                        <p className="text-sm font-medium">Region Correct?</p>
                        <p className="text-xs text-muted-foreground">
                          Guessed: {formData.conclusionGuessRegion || 'N/A'} | Actual: {formData.actualRegion || 'N/A'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={formData.regionCorrect === true ? 'default' : 'outline'}
                          className={formData.regionCorrect === true ? 'bg-emerald-600' : ''}
                          onClick={() => updateField('regionCorrect', true)}
                          data-testid="button-region-correct"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={formData.regionCorrect === false ? 'default' : 'outline'}
                          className={formData.regionCorrect === false ? 'bg-destructive' : ''}
                          onClick={() => updateField('regionCorrect', false)}
                          data-testid="button-region-incorrect"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                      <div>
                        <p className="text-sm font-medium">Vintage Correct?</p>
                        <p className="text-xs text-muted-foreground">
                          Guessed: {formData.conclusionGuessVintage || 'N/A'} | Actual: {formData.actualVintage || 'N/A'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={formData.vintageCorrect === true ? 'default' : 'outline'}
                          className={formData.vintageCorrect === true ? 'bg-emerald-600' : ''}
                          onClick={() => updateField('vintageCorrect', true)}
                          data-testid="button-vintage-correct"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={formData.vintageCorrect === false ? 'default' : 'outline'}
                          className={formData.vintageCorrect === false ? 'bg-destructive' : ''}
                          onClick={() => updateField('vintageCorrect', false)}
                          data-testid="button-vintage-incorrect"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea
                  placeholder="Any other observations, learning points, or reminders..."
                  value={formData.additionalNotes || ''}
                  onChange={(e) => updateField('additionalNotes', e.target.value)}
                  className="min-h-[100px]"
                  data-testid="textarea-additional-notes"
                />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            data-testid="button-previous"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext} data-testid="button-next">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={saveMutation.isPending}
              className="bg-gold hover:bg-gold/90 text-navy"
              data-testid="button-save"
            >
              {saveMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Tasting Note
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
