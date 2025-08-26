# StrongSolo Demo Load Board

A production-ready demonstration load board application built with Next.js 14+ and TypeScript. Designed for easy LLM extraction with extraction-friendly markup and comprehensive JSON-LD structured data.

## Features

- **Clean, Modern UI**: Responsive design with Tailwind CSS
- **Extraction-Friendly**: Explicit labels, semantic markup, and JSON-LD for reliable data extraction
- **Production Ready**: TypeScript, ESLint, Prettier, comprehensive testing
- **SEO Optimized**: Meta tags, OpenGraph, robots.txt, sitemap
- **API Ready**: RESTful API endpoints with validation
- **Accessible**: ARIA labels, keyboard navigation, focus states
- **Fast**: Static generation where possible, optimized for Vercel deployment

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Validation**: Zod schemas
- **Testing**: Playwright e2e tests
- **Deployment**: Vercel optimized
- **Package Manager**: npm

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Type check
npm run typecheck

# Lint code
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### Testing

```bash
# Run e2e tests (requires dev server running)
npm test

# Run tests with UI
npm run test:ui
```

## Project Structure

```
src/app/                 # Next.js App Router pages
├── layout.tsx          # Root layout with header/footer
├── page.tsx            # Landing page
├── board/              # Load board listing
├── load/[id]/          # Load detail pages
├── api/loads/          # API routes
├── healthz/            # Health check endpoint
├── robots.ts           # SEO robots.txt
└── sitemap.ts          # SEO sitemap

components/             # Reusable UI components
├── ui/                 # Base UI components (Button, Input, etc.)
├── LoadCard.tsx        # Load listing card
├── LoadDetails.tsx     # Load detail view with extraction-friendly markup
├── Filters.tsx         # Search and filter controls
└── Pagination.tsx      # Pagination controls

data/
└── loads.ts            # Sample load data (10 realistic loads)

lib/                    # Utility functions
├── format.ts           # Money, weight, date formatting
├── search.ts           # Search and pagination helpers
├── jsonld.ts           # JSON-LD structured data generation
└── utils.ts            # Tailwind class merging utilities

e2e/                    # Playwright tests
├── board.spec.ts       # Load board tests
└── detail.spec.ts      # Load detail tests
```

## API Endpoints

- `GET /api/loads` - List loads with filtering and pagination
- `GET /api/loads/[id]` - Get single load by ID
- `GET /healthz` - Health check endpoint

### API Examples

```bash
# Get all loads
curl http://localhost:3000/api/loads

# Filter by equipment type
curl "http://localhost:3000/api/loads?equipment=Reefer"

# Search with pagination
curl "http://localhost:3000/api/loads?origin=Chicago&page=1&limit=5"

# Get specific load
curl http://localhost:3000/api/loads/LOAD-2025-001
```

## Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/strongsolo-load-board)

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set production domain (optional)
vercel --prod
```

### Environment Variables

Set these in Vercel dashboard:

```env
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

## Data Management

### Adding New Loads

Edit `data/loads.ts` to add new load postings:

```typescript
{
  id: "LOAD-2025-XXX",
  origin: "City, ST",
  destination: "City, ST", 
  pickupDate: "2025-MM-DD",
  deliveryDate: "2025-MM-DD",
  equipment: "Dry Van" | "Reefer" | "Flatbed" | "Step Deck" | "Power Only",
  weightLbs: 30000,
  rateUsd: 2500,
  distanceMiles: 500, // optional
  reference: "REF-123", // optional
  broker: {
    name: "Broker Company",
    phone: "(555) 123-4567", // optional
    email: "contact@broker.com", // optional
    mcNumber: "MC-123456" // optional
  },
  notes: "Special instructions..." // optional
}
```

### URL Generation for Scanner

To generate URLs for the load scanner tool:

```bash
# Update examples/urls.txt with your domain
echo "https://your-domain.vercel.app/board" > examples/urls.txt
echo "https://your-domain.vercel.app/load/LOAD-2025-001" >> examples/urls.txt

# Run scanner (if you have the tool)
uv run python -m load_scanner.run_scanner --source=url --urls examples/urls.txt --out results.json
```

## Extraction-Friendly Features

### Markup Structure

- Each load posting wrapped in `<article class="posting" data-source="dummy">`
- Load details use semantic `<dl>` (definition lists) with explicit `<dt>` labels
- Consistent labels: Origin, Destination, Pickup, Delivery, Equipment, Weight, Rate, Distance, Reference, Broker Name, Broker Phone, Broker Email, MC Number, Notes
- Screen reader friendly with `sr-only` classes where needed

### JSON-LD Structured Data

Every load detail page includes comprehensive JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting", 
  "identifier": "LOAD-2025-001",
  "title": "Dry Van Load: Los Angeles, CA to Phoenix, AZ",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Pacific Logistics",
    "telephone": "(555) 123-4567",
    "email": "dispatch@pacificlogistics.com"
  },
  "baseSalary": {
    "@type": "MonetaryAmount", 
    "currency": "USD",
    "value": 1850
  }
  // ... additional structured data
}
```

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support  
- Focus visible states
- Color contrast compliance
- Screen reader optimized

## Performance

- Static Site Generation (SSG) where possible
- Image optimization with Next.js Image component
- Efficient CSS with Tailwind purging
- API route caching headers
- Minimal JavaScript bundle size

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with tests
4. Run the test suite: `npm test`
5. Submit a pull request

## License

This project is for demonstration purposes. See LICENSE file for details.

---

Built with ❤️ for freight professionals and data extraction teams.
