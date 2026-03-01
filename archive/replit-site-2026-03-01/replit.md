# Sip Studies - Beverage Encyclopedia Platform

## Overview

Sip Studies is a comprehensive beverage education platform featuring an encyclopedia ("Sipopedia"), AI-powered chat assistant ("Sippy AI"), certification tracking, and community features. The application is built as a full-stack TypeScript project with a React frontend and Express backend, designed for beverage enthusiasts and industry professionals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React Context for auth state
- **Styling**: Tailwind CSS v4 with custom design tokens (navy, gold, burgundy theme colors)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Build Tool**: Vite with custom plugins for meta images and Replit integration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: Node.js with HTTP server for potential WebSocket support
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Storage**: Abstracted storage interface (`IStorage`) with in-memory implementation (`MemStorage`), designed for easy database swap

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Defined in `shared/schema.ts` with Zod validation via `drizzle-zod`
- **Migrations**: Managed via `drizzle-kit` with output to `./migrations`

### Build System
- **Client**: Vite builds to `dist/public`
- **Server**: esbuild bundles server code to `dist/index.cjs`
- **Bundling Strategy**: Server dependencies are selectively bundled via allowlist to optimize cold start times

### Authentication
- **Provider**: Replit Auth via OpenID Connect (OIDC)
- **Session Storage**: PostgreSQL-backed sessions using `connect-pg-simple`
- **Auth Module**: Located in `server/replit_integrations/auth/`
- **Key Routes**:
  - `GET /api/login` - Initiates OIDC login flow
  - `GET /api/logout` - Logs out user and ends OIDC session
  - `GET /api/callback` - OIDC callback handler
  - `GET /api/auth/user` - Returns authenticated user profile
  - `GET /api/me` - Debug endpoint (returns user id, claims, and profile)
- **Middleware**: `isAuthenticated` middleware protects all `/api/*` routes
- **Helper**: `getCurrentUser(req)` returns authenticated user id
- **User Claims**: sub, email, first_name, last_name, profile_image_url
- **Frontend Hooks**: `useAuth()` hook provides user state, login/logout functions, and role checks

### Key Design Decisions
1. **Monorepo Structure**: Client, server, and shared code in single repository with path aliases (`@/`, `@shared/`)
2. **Type Sharing**: Schema types shared between frontend and backend via `shared/` directory
3. **Component Architecture**: Atomic design with reusable UI components in `client/src/components/ui/`
4. **API Client**: Centralized fetch wrapper in `queryClient.ts` with error handling and credentials

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **Drizzle ORM**: Database operations and migrations

### UI/Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Google Fonts**: Cormorant Garamond and Source Serif 4

### Potential Integrations (dependencies present)
- **OpenAI/Google Generative AI**: For Sippy AI chat functionality
- **Stripe**: Payment processing for premium subscriptions
- **Nodemailer**: Email functionality
- **Passport**: Authentication middleware
- **Multer**: File upload handling