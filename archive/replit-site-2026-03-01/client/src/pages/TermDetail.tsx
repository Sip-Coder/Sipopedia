import { useRoute, Link } from 'wouter';
import { ChevronRight, BookOpen, BookMarked, ArrowLeft, Users, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const books = [
  { id: 'wine-atlas', title: 'The World Atlas of Wine', author: 'Hugh Johnson & Jancis Robinson', year: '2019', guild: 'Wine', coverColor: 'bg-wine' },
  { id: 'wine-folly', title: 'Wine Folly: Magnum Edition', author: 'Madeline Puckette', year: '2018', guild: 'Wine', coverColor: 'bg-rose-700' },
  { id: 'whisky-atlas', title: 'The World Atlas of Whisky', author: 'Dave Broom', year: '2014', guild: 'Spirits', coverColor: 'bg-amber-700' },
  { id: 'imbibe', title: 'Imbibe!', author: 'David Wondrich', year: '2007', guild: 'Spirits', coverColor: 'bg-orange-800' },
  { id: 'oxford-beer', title: 'The Oxford Companion to Beer', author: 'Garrett Oliver', year: '2011', guild: 'Beer', coverColor: 'bg-amber-600' },
  { id: 'tasting-beer', title: 'Tasting Beer', author: 'Randy Mosher', year: '2017', guild: 'Beer', coverColor: 'bg-yellow-700' },
  { id: 'coffee-atlas', title: 'The World Atlas of Coffee', author: 'James Hoffmann', year: '2018', guild: 'Coffee', coverColor: 'bg-stone-700' },
];

const terminology = [
  { 
    id: 'tannins', 
    term: 'Tannins', 
    category: 'Wine', 
    definition: 'Polyphenolic compounds found in grape skins, seeds, and stems that contribute to wine\'s structure and mouthfeel.',
    extendedDefinition: 'Tannins are a class of astringent, polyphenolic biomolecules that bind to and precipitate proteins and various other organic compounds including amino acids and alkaloids. In winemaking, tannins are extracted primarily from grape skins, seeds, and stems during the maceration process. They play a crucial role in determining a wine\'s structure, aging potential, and overall mouthfeel. Tannins create the dry, puckering sensation often described in red wines. The level and quality of tannins can vary significantly based on grape variety, terroir, and winemaking techniques.',
    bookIds: ['wine-atlas', 'wine-folly'],
    relatedTerms: ['Maceration', 'Polyphenols', 'Mouthfeel', 'Structure'],
    contributors: 45,
    lastUpdated: '2 days ago'
  },
  { 
    id: 'abv', 
    term: 'ABV', 
    category: 'General', 
    definition: 'Alcohol by Volume - a standard measure of how much alcohol is contained in a beverage.',
    extendedDefinition: 'Alcohol by Volume (ABV) is the international standard of measurement for the amount of alcohol (ethanol) contained in a given volume of an alcoholic beverage. It is defined as the number of milliliters of pure ethanol present in 100 ml of solution at 20°C. ABV is universally used on labels and in regulations. For example, a wine with 13% ABV contains 13 ml of pure alcohol per 100 ml of wine. The ABV measurement helps consumers understand the strength of different beverages and is essential for calculating standard drink servings.',
    bookIds: ['wine-atlas', 'whisky-atlas', 'oxford-beer', 'tasting-beer'],
    relatedTerms: ['Proof', 'Ethanol', 'Fermentation', 'Distillation'],
    contributors: 78,
    lastUpdated: '1 week ago'
  },
  { 
    id: 'mash-bill', 
    term: 'Mash Bill', 
    category: 'Spirits', 
    definition: 'The recipe of grains used in whiskey production, typically including corn, rye, wheat, and barley.',
    extendedDefinition: 'A mash bill is the specific recipe of grains used in the production of whiskey. It defines the proportions of different grains that make up the fermentable base of the spirit. In American bourbon, for example, the mash bill must contain at least 51% corn by law, with the remainder typically consisting of malted barley and either rye or wheat. The mash bill significantly influences the flavor profile of the final whiskey: corn adds sweetness, rye contributes spiciness, wheat provides a softer character, and malted barley aids in fermentation and adds nutty flavors.',
    bookIds: ['whisky-atlas', 'imbibe'],
    relatedTerms: ['Bourbon', 'Rye Whiskey', 'Fermentation', 'Distillation'],
    contributors: 32,
    lastUpdated: '5 days ago'
  },
  { 
    id: 'cold-brew', 
    term: 'Cold Brew', 
    category: 'Coffee', 
    definition: 'A coffee brewing method using cold water over an extended period, typically 12-24 hours.',
    extendedDefinition: 'Cold brew coffee is a method of coffee extraction that uses cold or room-temperature water over an extended steep time, typically 12 to 24 hours. Unlike iced coffee, which is hot-brewed coffee served over ice, cold brew is never exposed to heat during the extraction process. This results in a distinctly different flavor profile: cold brew tends to be smoother, less acidic, and often sweeter than its hot-brewed counterpart. The slow extraction pulls different compounds from the coffee grounds, reducing bitterness while emphasizing chocolate, nutty, and caramel notes.',
    bookIds: ['coffee-atlas'],
    relatedTerms: ['Extraction', 'Acidity', 'Brew Ratio', 'Immersion Brewing'],
    contributors: 56,
    lastUpdated: '3 days ago'
  },
  { 
    id: 'ibu', 
    term: 'IBU', 
    category: 'Beer', 
    definition: 'International Bitterness Units - a scale measuring the bitterness of beer from hop acids.',
    extendedDefinition: 'International Bitterness Units (IBU) is a chemical/instrumental measurement of the bittering compounds in beer—specifically isomerized and oxidized alpha acids, polyphenols, and a few other select bittering chemicals. The IBU scale typically ranges from 0 to over 100, though most beers fall between 5 and 80 IBU. Light lagers may have 5-10 IBU, while IPAs often range from 40-70 IBU, and some extreme hop-forward beers exceed 100 IBU. However, perceived bitterness is influenced by malt sweetness, so a sweet stout at 50 IBU may taste less bitter than a dry pale ale at the same level.',
    bookIds: ['oxford-beer', 'tasting-beer'],
    relatedTerms: ['Alpha Acids', 'Hops', 'IPA', 'Bittering'],
    contributors: 41,
    lastUpdated: '1 day ago'
  },
  { 
    id: 'cuvee', 
    term: 'Cuvée', 
    category: 'Wine', 
    definition: 'A blend or batch of wine, often referring to the best selection from a producer.',
    extendedDefinition: 'Cuvée is a French term that literally means "vat" or "tank" and in winemaking refers to a specific blend or batch of wine. The term has several uses: in Champagne, "cuvée" refers to the first and finest juice from pressed grapes; more broadly, it can indicate a particular blend or the flagship wine of a producer. Many wineries use "cuvée" on labels to suggest a special or superior selection. The term also applies to the practice of blending different grape varieties, vineyard sites, or vintages to create a harmonious final wine that represents the winemaker\'s vision.',
    bookIds: ['wine-atlas', 'wine-folly'],
    relatedTerms: ['Blend', 'Assemblage', 'Champagne', 'Prestige Cuvée'],
    contributors: 28,
    lastUpdated: '4 days ago'
  },
  { 
    id: 'proof', 
    term: 'Proof', 
    category: 'Spirits', 
    definition: 'A measurement of alcohol content, typically double the ABV percentage in the US system.',
    extendedDefinition: 'Proof is a measure of the alcohol content in spirits. In the United States, proof is exactly twice the alcohol by volume (ABV) percentage. For example, a spirit that is 40% ABV is 80 proof. The term originated in 18th-century England when spirits were "proved" by mixing with gunpowder—if it could still ignite, it was "proof" that the alcohol content was sufficient. Today, different countries use different proof systems, but the US system remains most common in international spirits trade.',
    bookIds: ['whisky-atlas', 'imbibe'],
    relatedTerms: ['ABV', 'Ethanol', 'Distillation'],
    contributors: 34,
    lastUpdated: '1 week ago'
  },
  { 
    id: 'ethanol', 
    term: 'Ethanol', 
    category: 'General', 
    definition: 'The type of alcohol found in alcoholic beverages, produced through fermentation of sugars.',
    extendedDefinition: 'Ethanol (ethyl alcohol, C2H5OH) is the intoxicating agent in alcoholic beverages. It is produced when yeasts ferment sugars in grains, fruits, or other carbohydrate sources. Ethanol is colorless, volatile, and flammable with a characteristic odor. In beverages, it contributes to the warming sensation, mouthfeel, and can carry and enhance aromatic compounds. The concentration of ethanol determines the strength of the beverage and affects its preservation, flavor integration, and aging potential.',
    bookIds: ['whisky-atlas', 'wine-atlas', 'oxford-beer'],
    relatedTerms: ['ABV', 'Proof', 'Fermentation'],
    contributors: 62,
    lastUpdated: '5 days ago'
  },
  { 
    id: 'fermentation', 
    term: 'Fermentation', 
    category: 'General', 
    definition: 'The metabolic process where yeast converts sugars into alcohol and carbon dioxide.',
    extendedDefinition: 'Fermentation is the biochemical process central to all alcoholic beverage production. During fermentation, yeast consumes sugars (glucose, fructose, maltose) and converts them into ethanol and carbon dioxide. This anaerobic process also produces hundreds of flavor compounds including esters, aldehydes, and organic acids. Temperature, yeast strain, sugar concentration, and oxygen levels all influence the fermentation outcome. Primary fermentation typically lasts days to weeks, while secondary fermentation (as in champagne) creates carbonation.',
    bookIds: ['wine-atlas', 'whisky-atlas', 'oxford-beer', 'tasting-beer'],
    relatedTerms: ['Yeast', 'Ethanol', 'ABV', 'Mash Bill'],
    contributors: 89,
    lastUpdated: '3 days ago'
  },
  { 
    id: 'distillation', 
    term: 'Distillation', 
    category: 'Spirits', 
    definition: 'The process of heating a fermented liquid to separate and concentrate alcohol through evaporation and condensation.',
    extendedDefinition: 'Distillation is the process that transforms fermented beverages into spirits. By heating a fermented liquid, alcohol (which boils at 78.3°C) vaporizes before water (100°C). These vapors are then condensed back into liquid form, resulting in a higher concentration of alcohol. Different types of stills (pot stills, column stills) and multiple distillation runs affect the final spirit\'s character. The art of distillation involves making precise cuts—separating the desirable "heart" from the harsher "heads" and "tails."',
    bookIds: ['whisky-atlas', 'imbibe'],
    relatedTerms: ['Proof', 'ABV', 'Mash Bill', 'Ethanol'],
    contributors: 54,
    lastUpdated: '1 week ago'
  },
  { 
    id: 'maceration', 
    term: 'Maceration', 
    category: 'Wine', 
    definition: 'The process of soaking grape skins, seeds, and stems in juice to extract color, tannins, and flavor.',
    extendedDefinition: 'Maceration is the winemaking process where grape skins, seeds, and sometimes stems are left in contact with the juice. This contact extracts phenolic compounds including anthocyanins (color pigments), tannins, and flavor molecules. The duration of maceration varies from a few hours for rosé wines to several weeks for robust reds. Cold maceration before fermentation extracts color without harsh tannins, while extended maceration after fermentation builds structure. This process is fundamental to creating complex red wines.',
    bookIds: ['wine-atlas', 'wine-folly'],
    relatedTerms: ['Tannins', 'Polyphenols', 'Structure'],
    contributors: 38,
    lastUpdated: '4 days ago'
  },
  { 
    id: 'polyphenols', 
    term: 'Polyphenols', 
    category: 'Wine', 
    definition: 'A class of organic compounds including tannins and anthocyanins that affect wine color, flavor, and health properties.',
    extendedDefinition: 'Polyphenols are a large family of naturally occurring organic compounds found in grapes and other plants. In wine, they include tannins (astringency), anthocyanins (red/purple color), flavonols (yellow pigments), and resveratrol (associated with health benefits). These compounds contribute to wine\'s structure, color stability, aging potential, and antioxidant properties. Polyphenol extraction depends on grape variety, growing conditions, and winemaking techniques including maceration time and temperature.',
    bookIds: ['wine-atlas', 'wine-folly'],
    relatedTerms: ['Tannins', 'Maceration', 'Structure'],
    contributors: 29,
    lastUpdated: '6 days ago'
  },
  { 
    id: 'hops', 
    term: 'Hops', 
    category: 'Beer', 
    definition: 'The flowers of the hop plant used to add bitterness, flavor, and aroma to beer.',
    extendedDefinition: 'Hops (Humulus lupulus) are the flowering cones of a climbing plant used in beer brewing since the 9th century. They serve multiple purposes: providing bitterness to balance malt sweetness, contributing flavors ranging from floral to citrus to piney, adding aroma, and acting as a natural preservative. Different hop varieties have distinct characteristics—noble hops offer subtle elegance while American hops tend toward bold citrus and tropical notes. Hops can be added at various stages of brewing for different effects.',
    bookIds: ['oxford-beer', 'tasting-beer'],
    relatedTerms: ['IBU', 'Alpha Acids', 'IPA', 'Bittering'],
    contributors: 67,
    lastUpdated: '2 days ago'
  },
  { 
    id: 'ipa', 
    term: 'IPA', 
    category: 'Beer', 
    definition: 'India Pale Ale - a hoppy beer style originally brewed with extra hops for preservation during shipping to India.',
    extendedDefinition: 'India Pale Ale (IPA) originated in 18th-century England as a heavily hopped beer designed to survive the long sea voyage to British colonies in India. The additional hops acted as a preservative. Today, IPA has evolved into one of craft beer\'s most popular and diverse styles. Sub-styles include West Coast IPA (bitter, piney), New England/Hazy IPA (juicy, tropical, cloudy), Double/Imperial IPA (stronger, hoppier), and Session IPA (lower alcohol). IPAs typically range from 40-70+ IBU and 5-10% ABV.',
    bookIds: ['oxford-beer', 'tasting-beer'],
    relatedTerms: ['Hops', 'IBU', 'Alpha Acids'],
    contributors: 73,
    lastUpdated: '1 day ago'
  },
  { 
    id: 'bourbon', 
    term: 'Bourbon', 
    category: 'Spirits', 
    definition: 'An American whiskey made primarily from corn and aged in new charred oak barrels.',
    extendedDefinition: 'Bourbon is a distinctly American whiskey with strict legal requirements: it must be made in the USA, contain at least 51% corn in the mash bill, be aged in new charred oak containers, distilled to no more than 160 proof, entered into the barrel at 125 proof or less, and bottled at minimum 80 proof. While bourbon can be made anywhere in the US, Kentucky produces about 95% of the world\'s supply. The new charred oak aging gives bourbon its characteristic vanilla, caramel, and oak flavors.',
    bookIds: ['whisky-atlas', 'imbibe'],
    relatedTerms: ['Mash Bill', 'Distillation', 'Rye Whiskey'],
    contributors: 61,
    lastUpdated: '3 days ago'
  },
  { 
    id: 'extraction', 
    term: 'Extraction', 
    category: 'Coffee', 
    definition: 'The process of dissolving soluble compounds from coffee grounds into water during brewing.',
    extendedDefinition: 'Extraction is the fundamental process in coffee brewing where hot water dissolves and carries away soluble flavor compounds from roasted coffee grounds. Ideal extraction yields 18-22% of the coffee\'s mass. Under-extraction produces sour, weak coffee while over-extraction results in bitter, harsh flavors. Variables affecting extraction include grind size, water temperature, brew time, agitation, and water-to-coffee ratio. Different brewing methods (espresso, pour-over, immersion) manipulate these variables to achieve desired flavor profiles.',
    bookIds: ['coffee-atlas'],
    relatedTerms: ['Cold Brew', 'Acidity', 'Brew Ratio'],
    contributors: 48,
    lastUpdated: '2 days ago'
  },
  { 
    id: 'acidity', 
    term: 'Acidity', 
    category: 'Coffee', 
    definition: 'The bright, tangy quality in coffee that adds liveliness and complexity to the cup.',
    extendedDefinition: 'In coffee, acidity refers not to pH but to the bright, sharp, lively quality that is prized in specialty coffees. It provides the "sparkle" that distinguishes a vibrant cup from a flat one. Acidity varies by origin—African coffees often have wine-like or citrus acidity, while Brazilian coffees tend toward nutty, low-acid profiles. Roast level affects perceived acidity: lighter roasts retain more origin acidity while darker roasts mute it. Cold brew typically has lower perceived acidity due to its extraction method.',
    bookIds: ['coffee-atlas'],
    relatedTerms: ['Extraction', 'Cold Brew', 'Brew Ratio'],
    contributors: 44,
    lastUpdated: '4 days ago'
  },
  { 
    id: 'champagne', 
    term: 'Champagne', 
    category: 'Wine', 
    definition: 'A sparkling wine produced in the Champagne region of France using the traditional method.',
    extendedDefinition: 'Champagne is both a region and a sparkling wine that can only legally bear the name if produced in the Champagne appellation of northeastern France using specific methods. The traditional method (méthode champenoise) involves a secondary fermentation in the bottle, creating fine bubbles. Permitted grape varieties are primarily Chardonnay, Pinot Noir, and Pinot Meunier. Champagne houses blend wines from multiple vineyards and vintages to maintain consistent house styles, though vintage and single-vineyard champagnes showcase specific years and terroirs.',
    bookIds: ['wine-atlas', 'wine-folly'],
    relatedTerms: ['Cuvée', 'Blend', 'Assemblage'],
    contributors: 52,
    lastUpdated: '1 week ago'
  },
  { 
    id: 'blend', 
    term: 'Blend', 
    category: 'Wine', 
    definition: 'A wine made by combining different grape varieties, vineyards, or vintages.',
    extendedDefinition: 'Blending is the art of combining different wines to create a final product greater than the sum of its parts. Winemakers blend for various reasons: to achieve complexity, balance, consistency, or to express a particular style. Classic blends include Bordeaux (Cabernet Sauvignon, Merlot, and others), Rhône (Grenache, Syrah, Mourvèdre), and Champagne (Chardonnay, Pinot Noir, Pinot Meunier). The term also applies to blending across vintages (non-vintage wines) or vineyard sites. Skillful blending requires extensive tasting and understanding of how components interact.',
    bookIds: ['wine-atlas', 'wine-folly'],
    relatedTerms: ['Cuvée', 'Assemblage', 'Champagne'],
    contributors: 36,
    lastUpdated: '5 days ago'
  },
];

export default function TermDetail() {
  const [match, params] = useRoute('/encyclopedia/term/:termId');
  
  if (!match || !params?.termId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Term not found</h2>
          <Link href="/encyclopedia">
            <Button variant="outline">Back to Sipopedia</Button>
          </Link>
        </div>
      </div>
    );
  }

  const term = terminology.find(t => t.id === params.termId);

  if (!term) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Term not found</h2>
          <p className="text-muted-foreground mb-4">The term "{params.termId}" doesn't exist in our database.</p>
          <Link href="/encyclopedia">
            <Button variant="outline">Back to Sipopedia</Button>
          </Link>
        </div>
      </div>
    );
  }

  const referencedBooks = books.filter(book => term.bookIds.includes(book.id));

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-navy py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.2),transparent_70%)]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-gold/60 mb-6">
            <Link href="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/encyclopedia" className="hover:text-gold">Sipopedia</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">{term.term}</span>
          </div>
          
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge variant="outline" className="mb-4 border-gold/30 text-gold">
                {term.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                {term.term}
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl font-light">
                {term.definition}
              </p>
              <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {term.contributors} contributors
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Updated {term.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-border/50">
              <CardHeader>
                <h2 className="text-xl font-serif font-bold text-foreground">Full Definition</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {term.extendedDefinition}
                </p>
              </CardContent>
            </Card>

            {referencedBooks.length > 0 && (
              <Card className="border-gold/20 bg-gradient-to-br from-gold/5 to-transparent">
                <CardHeader>
                  <h2 className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
                    <BookMarked className="w-5 h-5 text-gold" />
                    Referenced In
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    This term appears in {referencedBooks.length} book{referencedBooks.length > 1 ? 's' : ''} from our Reading List
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {referencedBooks.map((book) => (
                      <div 
                        key={book.id} 
                        className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border/50 hover:border-gold/30 transition-colors group"
                        data-testid={`book-reference-${book.id}`}
                      >
                        <div className={`w-12 h-16 rounded ${book.coverColor} flex items-center justify-center shrink-0`}>
                          <BookOpen className="w-6 h-6 text-white/80" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground group-hover:text-gold transition-colors">
                            {book.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {book.author} • {book.year}
                          </p>
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {book.guild} Guild
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-gold shrink-0">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {term.relatedTerms.length > 0 && (
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-foreground">Related Terms</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {term.relatedTerms.map((relatedTerm, index) => {
                      const relatedTermData = terminology.find(t => t.term.toLowerCase() === relatedTerm.toLowerCase());
                      if (relatedTermData) {
                        return (
                          <Link key={index} href={`/encyclopedia/term/${relatedTermData.id}`}>
                            <Badge 
                              variant="outline" 
                              className="cursor-pointer hover:bg-muted hover:text-gold hover:border-gold/30 transition-colors"
                            >
                              {relatedTerm}
                            </Badge>
                          </Link>
                        );
                      }
                      return (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="opacity-50"
                        >
                          {relatedTerm}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-border/50">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3">Community Notes</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Help improve this definition by contributing your knowledge.
                </p>
                <Button variant="outline" size="sm" className="w-full" data-testid="button-add-note">
                  Add a Note
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3">Track This Term</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add "{term.term}" to your tracked terms to monitor your learning progress.
                </p>
                <Button className="w-full bg-gold hover:bg-gold/90 text-navy" data-testid="button-track-term">
                  <BookMarked className="w-4 h-4 mr-2" />
                  Track Term
                </Button>
              </CardContent>
            </Card>

            <Link href="/encyclopedia">
              <Button variant="ghost" className="w-full gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Sipopedia
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
