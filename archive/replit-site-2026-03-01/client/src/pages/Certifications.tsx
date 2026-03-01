import { useState } from 'react';
import { Link } from 'wouter';
import { 
  ChevronRight, Plus, Trash2, GraduationCap, 
  Upload, FileText, CheckCircle, ExternalLink, Calendar,
  Award, Globe, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const mockCertifications = [
  { 
    id: 1, 
    name: 'WSET Level 3 Award in Wines', 
    issuer: 'Wine & Spirit Education Trust', 
    date: 'Dec 2024',
    verified: true,
    file: 'wset_l3_cert.pdf'
  },
  { 
    id: 2, 
    name: 'Certified Sommelier', 
    issuer: 'Court of Master Sommeliers', 
    date: 'Aug 2023',
    verified: true,
    file: 'cms_certified.pdf'
  },
];

export default function Certifications() {
  const [certs, setCerts] = useState(mockCertifications);

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-navy py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-gold/60 mb-6">
            <Link href="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">Certifications</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                Certifications
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl font-light">
                Document your expertise. Upload your certifications to build your professional beverage profile and showcase your credentials.
              </p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gold hover:bg-gold/90 text-navy h-12 px-8 text-lg font-medium gap-2">
                  <Plus className="w-5 h-5" />
                  Upload Achievement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">Add New Achievement</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="cert-name">Achievement Name</Label>
                    <Input id="cert-name" placeholder="e.g. WSET Level 3 Award in Wines" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issuer">Issuing Organization</Label>
                    <Input id="issuer" placeholder="e.g. Court of Master Sommeliers" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date Earned</Label>
                      <Input id="date" type="month" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="verify-id">Verification ID (Optional)</Label>
                      <Input id="verify-id" placeholder="ID-12345" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Certification Document</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-gold/50 transition-colors cursor-pointer group bg-muted/30">
                      <Upload className="w-10 h-10 mx-auto text-muted-foreground group-hover:text-gold transition-colors mb-4" />
                      <p className="text-sm font-medium text-foreground">Upload PDF or Image</p>
                      <p className="text-xs text-muted-foreground mt-1">Maximum file size: 10MB</p>
                    </div>
                  </div>
                  <Button className="w-full bg-navy hover:bg-navy/90 text-white h-12 text-lg">
                    Add to Profile
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-foreground flex items-center gap-2">
                <Award className="w-6 h-6 text-gold" />
                Your Verified Credentials
              </h2>
              
              <div className="grid gap-4">
                {certs.map((cert) => (
                  <Card key={cert.id} className="group hover:border-gold/30 transition-all duration-300 overflow-hidden border-border/50">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row sm:items-center p-6 gap-6">
                        <div className="w-16 h-16 rounded-xl bg-gold/5 flex items-center justify-center shrink-0 border border-gold/10">
                          <GraduationCap className="w-8 h-8 text-gold" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-serif font-bold text-foreground group-hover:text-gold transition-colors truncate">
                                {cert.name}
                              </h3>
                              <p className="text-muted-foreground font-medium">{cert.issuer}</p>
                            </div>
                            {cert.verified && (
                              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 hover:bg-emerald-100 shrink-0">
                                <ShieldCheck className="w-3 h-3" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              Earned {cert.date}
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <FileText className="w-4 h-4" />
                              {cert.file}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 pt-4 sm:pt-0 border-t sm:border-t-0 border-border">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-navy border-gold/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4">
                  <Globe className="w-24 h-24 text-gold/5 -rotate-12 translate-x-8 -translate-y-8" />
                </div>
                <CardHeader>
                  <h3 className="text-xl font-serif font-bold text-white">Public Resume</h3>
                  <p className="text-sm text-gray-400">Your profile is currently public and discoverable by employers.</p>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Public Link:</span>
                      <Button variant="link" className="text-gold p-0 h-auto text-xs">Copy URL</Button>
                    </div>
                    <code className="text-[10px] text-gold block break-all bg-navy/50 p-2 rounded">
                      sipstudies.com/p/james_somm_92
                    </code>
                  </div>
                  <Button className="w-full bg-gold text-navy hover:bg-gold/90">
                    Share Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <h3 className="font-serif font-bold text-lg">Quick Tips</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">Verified credentials receive 3x more views from industry scouts.</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">Keep your digital resume updated to maintain your rank in search.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
