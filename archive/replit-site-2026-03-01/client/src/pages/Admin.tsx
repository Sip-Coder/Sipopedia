import { useState } from 'react';
import { Link } from 'wouter';
import { 
  Upload, FileText, Sparkles, ChevronRight, Plus, Edit3, Trash2, 
  Image, Video, Save, Eye, Clock, CheckCircle, AlertCircle, 
  ArrowUpDown, Filter, Search, MoreVertical, BookOpen, Loader2,
  Newspaper, Users, Settings, Link as LinkIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const existingTerms = [
  { id: 1, term: 'Tannins', category: 'Wine', status: 'published', lastUpdated: '2 days ago', hasMedia: true },
  { id: 2, term: 'Mash Bill', category: 'Spirits', status: 'published', lastUpdated: '1 week ago', hasMedia: false },
  { id: 3, term: 'IBU', category: 'Beer', status: 'draft', lastUpdated: '3 days ago', hasMedia: true },
  { id: 4, term: 'Cold Brew', category: 'Coffee', status: 'review', lastUpdated: '1 day ago', hasMedia: false },
  { id: 5, term: 'Terroir', category: 'Wine', status: 'published', lastUpdated: '5 days ago', hasMedia: true },
  { id: 6, term: 'Fermentation', category: 'General', status: 'published', lastUpdated: '1 week ago', hasMedia: true },
];

const bulkUploadPreview = [
  { term: 'Cuvée', category: 'Wine', confidence: 98 },
  { term: 'Angel\'s Share', category: 'Spirits', confidence: 95 },
  { term: 'Lacing', category: 'Beer', confidence: 92 },
  { term: 'Crema', category: 'Coffee', confidence: 97 },
  { term: 'Nose', category: 'Wine', confidence: 88 },
];

export default function Admin() {
  const [bulkText, setBulkText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<typeof existingTerms[0] | null>(null);
  const [editorContent, setEditorContent] = useState('');

  const handleBulkProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowPreview(true);
    }, 2000);
  };

  const statusColors = {
    published: 'bg-secondary text-secondary-foreground',
    draft: 'bg-muted text-muted-foreground',
    review: 'bg-gold/20 text-gold',
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Site Manager</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Site Manager</h1>
              <p className="text-muted-foreground">Manage terminology, articles, RSS feeds, and user access</p>
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2" data-testid="button-manage-users">
                    <Users className="w-4 h-4" />
                    Manage Users
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-xl">User Access Management</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="flex gap-2">
                      <Input placeholder="Enter email to invite..." className="flex-1" />
                      <Button className="bg-primary">Add User</Button>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: 'James Admin', email: 'james@sipstudies.com', role: 'Super Admin', manager: true },
                        { name: 'Sarah Editor', email: 'sarah@sipstudies.com', role: 'Editor', manager: true },
                        { name: 'Michael Contributor', email: 'mike@sipstudies.com', role: 'Contributor', manager: false },
                      ].map((u, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                          <div>
                            <p className="font-medium text-sm">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Label className="text-xs whitespace-nowrap">Site Manager Access</Label>
                              <Switch defaultChecked={u.manager} />
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gold hover:bg-gold/90 text-navy gap-2" data-testid="button-new-term">
                    <Plus className="w-4 h-4" />
                    New Term
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-xl">Create New Term</DialogTitle>
                  </DialogHeader>
                  <TermEditor />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="bulk" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="bulk" className="gap-2" data-testid="tab-bulk-upload">
              <Upload className="w-4 h-4" />
              Bulk Terminology
            </TabsTrigger>
            <TabsTrigger value="manage" className="gap-2" data-testid="tab-manage">
              <BookOpen className="w-4 h-4" />
              Manage Terms
            </TabsTrigger>
            <TabsTrigger value="articles" className="gap-2" data-testid="tab-articles">
              <FileText className="w-4 h-4" />
              Manage Articles
            </TabsTrigger>
            <TabsTrigger value="books" className="gap-2" data-testid="tab-books">
              <BookOpen className="w-4 h-4" />
              Manage Books
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bulk" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    Bulk Terminology Upload
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Paste your terminology list and let AI sort and categorize each term
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="bulk-input" className="text-sm font-medium mb-2 block">
                      Paste terminology (one per line, or comma-separated)
                    </Label>
                    <Textarea
                      id="bulk-input"
                      placeholder="Example:
Tannins - Polyphenolic compounds in wine
Mash Bill - Recipe of grains in whiskey
IBU - International Bitterness Units for beer
..."
                      className="min-h-[200px] font-mono text-sm"
                      value={bulkText}
                      onChange={(e) => setBulkText(e.target.value)}
                      data-testid="textarea-bulk-input"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold" />
                      <span className="text-sm font-medium">AI Auto-Categorization</span>
                    </div>
                    <Switch defaultChecked data-testid="switch-ai-categorization" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Default Category:</Label>
                    <Select defaultValue="auto">
                      <SelectTrigger className="w-40" data-testid="select-default-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-detect</SelectItem>
                        <SelectItem value="wine">Wine</SelectItem>
                        <SelectItem value="spirits">Spirits</SelectItem>
                        <SelectItem value="beer">Beer</SelectItem>
                        <SelectItem value="coffee">Coffee & Tea</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Or drag & drop a file</p>
                    <p className="text-xs text-muted-foreground">CSV, TXT, or Excel files supported</p>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 gap-2" 
                    onClick={handleBulkProcess}
                    disabled={isProcessing || !bulkText.trim()}
                    data-testid="button-process-bulk"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing with AI...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Process & Preview
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Eye className="w-5 h-5 text-secondary" />
                    AI Sorting Preview
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Review AI suggestions before publishing
                  </p>
                </CardHeader>
                <CardContent>
                  {!showPreview ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <FileText className="w-12 h-12 text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground">Paste terminology and click Process to see AI suggestions</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bulkUploadPreview.map((item, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 transition-colors"
                          data-testid={`preview-term-${index}`}
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-secondary" />
                            <div>
                              <p className="font-medium text-foreground">{item.term}</p>
                              <Badge variant="secondary" className="text-xs mt-1">{item.category}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{item.confidence}% confidence</span>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-2 pt-4">
                        <Button className="flex-1 bg-secondary hover:bg-secondary/90" data-testid="button-publish-all">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Publish All ({bulkUploadPreview.length})
                        </Button>
                        <Button variant="outline" data-testid="button-save-drafts">
                          Save as Drafts
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">All Terms ({existingTerms.length})</h3>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search terms..." 
                        className="pl-9 w-64" 
                        data-testid="input-search-terms"
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32" data-testid="select-filter-category">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="wine">Wine</SelectItem>
                        <SelectItem value="spirits">Spirits</SelectItem>
                        <SelectItem value="beer">Beer</SelectItem>
                        <SelectItem value="coffee">Coffee</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" data-testid="button-sort">
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {existingTerms.map((term) => (
                    <Dialog key={term.id}>
                      <div 
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer group"
                        data-testid={`term-row-${term.id}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground">{term.term}</p>
                              {term.hasMedia && (
                                <Badge variant="outline" className="text-xs gap-1">
                                  <Image className="w-3 h-3" />
                                  Media
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">{term.category}</Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {term.lastUpdated}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={`${statusColors[term.status as keyof typeof statusColors]} text-xs`}>
                            {term.status.charAt(0).toUpperCase() + term.status.slice(1)}
                          </Badge>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid={`button-edit-${term.id}`}>
                                <Edit3 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Publish
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="font-serif text-xl">Edit: {term.term}</DialogTitle>
                        </DialogHeader>
                        <TermEditor term={term} />
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="articles" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Sipopedia Articles</h3>
                      <Button className="bg-primary gap-2" data-testid="button-new-article">
                        <Plus className="w-4 h-4" />
                        New Article
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-8 border-2 border-dashed border-border rounded-xl text-center">
                        <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <h4 className="text-lg font-serif font-bold text-foreground mb-2">Drag & Drop Article Editor</h4>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          Create beautiful, Squarespace-style articles for Sipopedia. Drag photos and videos anywhere in the text with advanced styling options.
                        </p>
                        <div className="flex justify-center gap-3">
                          <Button variant="outline" className="gap-2">
                            <Image className="w-4 h-4" />
                            Add Media
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <Video className="w-4 h-4" />
                            Add Video
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Newspaper className="w-5 h-5 text-gold" />
                        Industry RSS Feeds
                      </h3>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add RSS Feed</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div>
                              <Label>Feed Name</Label>
                              <Input placeholder="e.g. Wine Spectator Latest" />
                            </div>
                            <div>
                              <Label>RSS URL</Label>
                              <Input placeholder="https://source.com/rss" />
                            </div>
                            <Button className="w-full bg-primary">Link Feed</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="text-xs text-muted-foreground">Automatically pull in industry news</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: 'Wine Spectator', url: 'winespectator.com/rss', active: true },
                        { name: 'Whisky Advocate', url: 'whiskyadvocate.com/rss', active: true },
                        { name: 'Daily Coffee News', url: 'dailycoffeenews.com/feed', active: false },
                      ].map((feed, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                          <div className="flex-1 min-w-0 mr-2">
                            <p className="text-sm font-medium text-foreground truncate">{feed.name}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{feed.url}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch defaultChecked={feed.active} />
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="books" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-gold" />
                    Bulk Book Upload
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Paste your reading list and let AI organize it by guild
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Paste Book List (Title, Author, Year)</Label>
                    <Textarea
                      placeholder="The World Atlas of Wine, Hugh Johnson, 2019..."
                      className="min-h-[150px] font-mono text-sm"
                    />
                  </div>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-gold/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Or drag & drop a file (CSV/Excel)</p>
                  </div>
                  <Button className="w-full bg-gold text-navy hover:bg-gold/90 gap-2">
                    <Sparkles className="w-4 h-4" />
                    Process Book List
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-foreground">Active Reading Lists</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Wine Guild', 'Spirits Guild', 'Beer Guild'].map((guild) => (
                      <div key={guild} className="p-4 rounded-lg border border-border bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gold">{guild}</h4>
                          <Button variant="ghost" size="sm" className="h-8">Edit List</Button>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          5 books listed • Last updated today
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="books" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-gold" />
                    Bulk Book Upload
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Paste your reading list and let AI organize it by guild
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Paste Book List (Title, Author, Year)</Label>
                    <Textarea
                      placeholder="The World Atlas of Wine, Hugh Johnson, 2019..."
                      className="min-h-[150px] font-mono text-sm"
                    />
                  </div>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-gold/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Or drag & drop a file (CSV/Excel)</p>
                  </div>
                  <Button className="w-full bg-gold text-navy hover:bg-gold/90 gap-2">
                    <Sparkles className="w-4 h-4" />
                    Process Book List
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-foreground">Active Reading Lists</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Wine Guild', 'Spirits Guild', 'Beer Guild'].map((guild) => (
                      <div key={guild} className="p-4 rounded-lg border border-border bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gold">{guild}</h4>
                          <Button variant="ghost" size="sm" className="h-8">Edit List</Button>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          5 books listed • Last updated today
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function TermEditor({ term }: { term?: typeof existingTerms[0] }) {
  const [content, setContent] = useState(term ? `# ${term.term}\n\nAdd detailed explanation here...` : '');
  
  return (
    <div className="space-y-6 pt-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="term-name" className="text-sm font-medium mb-2 block">Term Name</Label>
          <Input 
            id="term-name" 
            defaultValue={term?.term || ''} 
            placeholder="Enter term name"
            data-testid="input-term-name"
          />
        </div>
        <div>
          <Label htmlFor="term-category" className="text-sm font-medium mb-2 block">Category</Label>
          <Select defaultValue={term?.category.toLowerCase() || 'general'}>
            <SelectTrigger data-testid="select-term-category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wine">Wine</SelectItem>
              <SelectItem value="spirits">Spirits</SelectItem>
              <SelectItem value="beer">Beer</SelectItem>
              <SelectItem value="coffee">Coffee & Tea</SelectItem>
              <SelectItem value="cocktails">Cocktails</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="term-summary" className="text-sm font-medium mb-2 block">Short Summary</Label>
        <Textarea 
          id="term-summary"
          placeholder="A brief 1-2 sentence definition that appears in search results..."
          className="min-h-[80px]"
          data-testid="textarea-term-summary"
        />
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Full Content (Rich Editor)</Label>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30">
            <Button variant="ghost" size="sm" className="h-8 px-2 font-bold">B</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 italic">I</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 underline">U</Button>
            <div className="w-px h-4 bg-border mx-1" />
            <Button variant="ghost" size="sm" className="h-8 px-2">H1</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">H2</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">H3</Button>
            <div className="w-px h-4 bg-border mx-1" />
            <Button variant="ghost" size="sm" className="h-8 px-2">• List</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">1. List</Button>
            <div className="w-px h-4 bg-border mx-1" />
            <Button variant="ghost" size="sm" className="h-8 px-2">Link</Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">Quote</Button>
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your detailed explanation here. You can use formatting tools above..."
            className="min-h-[200px] border-0 rounded-none focus-visible:ring-0"
            data-testid="textarea-term-content"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Media Attachments</Label>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Image className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-foreground mb-1">Add Images</p>
            <p className="text-xs text-muted-foreground">Diagrams, photos, infographics</p>
            <Button variant="outline" size="sm" className="mt-3" data-testid="button-upload-images">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Video className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-foreground mb-1">Add Videos</p>
            <p className="text-xs text-muted-foreground">Tutorials, demonstrations</p>
            <Button variant="outline" size="sm" className="mt-3" data-testid="button-upload-videos">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="status" className="text-sm">Status:</Label>
            <Select defaultValue={term?.status || 'draft'}>
              <SelectTrigger className="w-32" data-testid="select-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="community-notes" />
            <Label htmlFor="community-notes" className="text-sm">Allow Community Notes</Label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <Button variant="outline" data-testid="button-preview">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button variant="outline" data-testid="button-save-draft">
          Save Draft
        </Button>
        <Button className="bg-secondary hover:bg-secondary/90" data-testid="button-publish">
          <CheckCircle className="w-4 h-4 mr-2" />
          Publish
        </Button>
      </div>
    </div>
  );
}
