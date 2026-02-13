# 🧠 Second Brain - AI-Powered Knowledge Management System

> Built with Next.js 16, React 19, Groq AI, and PostgreSQL for the Altibbe/Hedamo Full-Stack Engineering Internship

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Groq](https://img.shields.io/badge/Groq-Llama_3.3-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwind-css)

## 🚀 Live Demo

**Deployed Application:** [Your Vercel URL Here]

**Key Features:**
- 🤖 AI-powered summarization and tagging
- 🔍 Semantic search with RAG (Retrieval-Augmented Generation)
- 💨 Lightning-fast responses with Groq (Llama 3.3 70B)
- 📊 Beautiful, responsive UI with smooth animations
- 🔌 Public REST API for external integrations
- 🖼️ Embeddable widget for any website

---

## 📸 Screenshots

### Landing Page
*Beautiful hero section with parallax effects and smooth animations*

### Knowledge Dashboard
*Manage and organize your knowledge base with powerful search and filters*

### AI Query Interface
*Ask questions and get intelligent answers from your knowledge base*

### Documentation
*Complete architecture documentation at `/docs`*

---

## ✨ Features

### Core Functionality
- ✅ **Knowledge Capture** - Store notes, links, and insights with rich metadata
- ✅ **AI Summarization** - Automatic 3-sentence summaries using Groq
- ✅ **Smart Auto-Tagging** - AI generates 5 relevant tags automatically
- ✅ **Semantic Search** - Find items based on meaning, not just keywords
- ✅ **RAG-Powered Queries** - Ask questions answered by your knowledge base
- ✅ **Public API** - REST endpoint for external integrations
- ✅ **Embeddable Widget** - Iframe widget for any website

### Technical Features
- ✅ **Vector Embeddings** - 384-dimensional semantic vectors
- ✅ **Cosine Similarity** - Accurate relevance scoring
- ✅ **Rate Limiting** - IP-based protection (15 requests/min)
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **Input Validation** - Zod schemas for all inputs
- ✅ **Error Handling** - Graceful error recovery

### UI/UX Excellence
- ✅ **Parallax Effects** - Smooth scroll animations on landing
- ✅ **Micro-interactions** - Purposeful hover states and transitions
- ✅ **Skeleton Loaders** - Professional loading states
- ✅ **Visual Hierarchy** - Clean spacing and typography
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Dark Theme** - Beautiful gradient backgrounds

---

## 🏗️ Architecture

### Portable Design
Every layer is swappable and maintainable:

**Frontend Layer:**
- Framework: Next.js 16 (App Router) with React 19
- Styling: Tailwind CSS 4
- State: React hooks (useState, useEffect)
- *Swappable with:* Vue.js, Angular, or any SPA framework

**API Layer:**
- Framework: Next.js API Routes (serverless)
- Validation: Zod schemas
- Rate Limiting: In-memory (15 req/min)
- *Swappable with:* Express, FastAPI, or any REST framework

**Database Layer:**
- ORM: Prisma with PostgreSQL adapter
- Database: PostgreSQL
- Vector Storage: Float[] arrays
- *Swappable with:* MongoDB, MySQL, or pgvector

**AI Layer:**
- Provider: Groq (Llama 3.3 70B)
- Models: llama-3.3-70b-versatile
- Embeddings: Custom implementation
- *Swappable with:* OpenAI, Anthropic, Gemini, or local models

### Design Principles

1. **Progressive Disclosure** - Show essentials first, details on demand
2. **Immediate Feedback** - Every action gets instant visual response
3. **AI Transparency** - Clear labeling of AI-generated content
4. **Motion with Purpose** - Animations guide attention
5. **Zero-Friction Input** - Minimize barriers to knowledge capture

### Agent Thinking

**Current Automation:**
- Auto-summarization on every item creation
- Smart tag generation without manual effort
- Automatic vector embeddings for search
- Re-generation capability for unsatisfied results

**Future Opportunities:**
- Smart reminders for forgotten notes
- Auto-linking between related items
- Quality scoring for content
- Weekly insight digests

### Infrastructure Mindset

**Public Access:**
- REST API: `GET /api/public/query?q=your+question`
- Embeddable Widget: `/widget` page in iframe
- Clean, documented endpoints
- Rate limiting for stability

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ ([Download](https://nodejs.org/))
- PostgreSQL database (local or cloud)
- Groq API key ([Get free key](https://console.groq.com/keys))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/second-brain-ai.git
cd second-brain-ai
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database (PostgreSQL connection string)
DATABASE_URL="postgresql://username:password@localhost:5432/second_brain"

# AI Provider (Groq - FREE!)
GROQ_API_KEY="gsk_your_groq_api_key_here"

# Node Environment
NODE_ENV="development"
```

4. **Set up the database**

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
second-brain-ai/
├── app/
│   ├── api/
│   │   ├── items/              # CRUD operations
│   │   │   ├── route.ts        # GET, POST /api/items
│   │   │   └── [id]/
│   │   │       ├── route.ts    # DELETE /api/items/:id
│   │   │       └── regenerate/
│   │   │           └── route.ts
│   │   ├── query/
│   │   │   └── route.ts        # POST /api/query (RAG)
│   │   └── public/
│   │       └── query/
│   │           └── route.ts    # GET /api/public/query
│   ├── docs/
│   │   └── page.tsx            # Architecture documentation
│   ├── widget/
│   │   └── page.tsx            # Embeddable widget
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main application
│   └── globals.css             # Global styles + animations
├── components/
│   ├── LandingSection.tsx      # Hero with parallax
│   ├── Dashboard.tsx           # Main dashboard
│   ├── CreateItemForm.tsx      # Item creation
│   ├── KnowledgeCard.tsx       # Individual cards
│   ├── AIQuery.tsx             # RAG search interface
│   ├── PublicWidget.tsx        # API documentation
│   └── SkeletonLoader.tsx      # Loading states
├── lib/
│   ├── ai.ts                   # Groq AI functions
│   ├── prisma.ts               # Prisma client
│   ├── rate-limit.ts           # Rate limiting
│   └── vector.ts               # Cosine similarity
├── prisma/
│   └── schema.prisma           # Database schema
├── .env                        # Environment variables
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## 💻 Usage

### Creating Knowledge Items

1. Click **"+ New Item"** in the Dashboard
2. Fill in the form:
   - **Title** (minimum 3 characters)
   - **Type** (Note, Link, or Insight)
   - **Content** (minimum 10 characters)
3. Click **"Create Item"**
4. AI automatically generates summary and tags! ⚡

### Searching Your Knowledge

**Dashboard Filters:**
- **Text Search** - Search across titles and content
- **Type Filter** - Filter by note/link/insight
- **Tag Filter** - Filter by specific tags
- **Sort Order** - Newest first or oldest first
- **Pagination** - Navigate through pages

**AI-Powered Queries:**
1. Go to **"AI Query"** tab
2. Ask natural language questions
3. Get intelligent answers with source attribution
4. See similarity scores for transparency

### Using the Public API

**Endpoint:** `GET /api/public/query?q=your+question`

**Example using cURL:**
```bash
curl "https://your-app.vercel.app/api/public/query?q=What%20are%20my%20notes%20about%20AI"
```

**Response:**
```json
{
  "success": true,
  "answer": "Based on your knowledge base, you have several notes about AI..."
}
```

### Embedding the Widget

Add this HTML to any website:

```html
<iframe 
  src="https://your-app.vercel.app/widget" 
  width="100%" 
  height="600" 
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy on Vercel**

- Visit [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables:
  - `DATABASE_URL`
  - `GROQ_API_KEY`
- Click **Deploy**

3. **Set up Database**

**Recommended: Neon PostgreSQL (Free)**

- Sign up at [neon.tech](https://neon.tech)
- Create a new project
- Copy connection string
- Add to Vercel environment variables
- Run migrations: `npx prisma migrate deploy`

**Alternative: Supabase**

- Sign up at [supabase.com](https://supabase.com)
- Create new project
- Get connection string from Settings → Database
- Add to Vercel environment variables

---

## 📊 API Reference

### POST /api/items
Create a new knowledge item with AI processing

**Request:**
```json
{
  "title": "My Note Title",
  "content": "The content of my note...",
  "type": "note"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "title": "My Note Title",
    "summary": "AI-generated summary...",
    "tags": ["ai", "generated", "tags"],
    "createdAt": "2026-02-13T..."
  }
}
```

### GET /api/items
Fetch knowledge items with filtering and pagination

**Query Parameters:**
- `search` - Text search across title and content
- `type` - Filter by type (note/link/insight)
- `tag` - Filter by specific tag
- `sort` - Sort order (asc/desc)
- `page` - Page number
- `limit` - Items per page

### POST /api/query
Semantic search using RAG

**Request:**
```json
{
  "question": "What are my notes about productivity?"
}
```

**Response:**
```json
{
  "success": true,
  "answer": "Based on your knowledge base...",
  "sources": [
    {
      "id": "clx...",
      "title": "Productivity Tips",
      "similarityScore": 0.89
    }
  ]
}
```

### GET /api/public/query
Public endpoint for external integrations

**Query Parameter:**
- `q` - The question to ask

**Example:**
```
GET /api/public/query?q=your+question+here
```

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Frontend** | Next.js 16 | React framework with App Router |
| | React 19 | UI library with latest features |
| | TypeScript | Type safety and developer experience |
| | Tailwind CSS 4 | Utility-first CSS framework |
| **Backend** | Next.js API Routes | Serverless API functions |
| | Prisma | Type-safe ORM |
| | Zod | Schema validation |
| **Database** | PostgreSQL | Relational database |
| | Prisma Client | Database client |
| **AI/ML** | Groq | LLM inference (Llama 3.3 70B) |
| | Custom Embeddings | 384-dimensional vectors |
| | Cosine Similarity | Relevance scoring |
| **DevOps** | Vercel | Frontend & API hosting |
| | Neon/Supabase | Managed PostgreSQL |
| | Git/GitHub | Version control |

---

## 🔒 Security & Performance

### Security Features
- ✅ Server-side API key storage (never exposed to client)
- ✅ IP-based rate limiting (15 requests/minute)
- ✅ Zod schema validation for all inputs
- ✅ SQL injection prevention via Prisma ORM
- ✅ CORS configuration for API endpoints

### Performance Optimizations
- ✅ Serverless functions (auto-scaling)
- ✅ PostgreSQL connection pooling
- ✅ Client-side caching
- ✅ Optimized animations (GPU acceleration)
- ✅ Lazy loading patterns
- ✅ Token usage optimization

### Rate Limits
- API endpoints: 15 requests per minute per IP
- Groq free tier: 14,400 requests per day
- More than sufficient for demo and testing!

---

## 🧪 Testing

### Manual Testing Checklist

**Landing Page:**
- [ ] Page loads with animations
- [ ] Parallax effects work on scroll
- [ ] Navigation buttons work
- [ ] "Get Started" goes to dashboard

**Dashboard:**
- [ ] Can create new items
- [ ] AI summary generates
- [ ] AI tags generate
- [ ] Search works
- [ ] Filters work (type, tag, sort)
- [ ] Pagination works

**AI Query:**
- [ ] Can ask questions
- [ ] Gets intelligent answers
- [ ] Shows sources with similarity scores
- [ ] Example questions work

**Public API:**
- [ ] Documentation displays
- [ ] Code snippets copy correctly
- [ ] Live tester works
- [ ] Widget page loads

**Documentation:**
- [ ] `/docs` page loads
- [ ] All 4 sections display correctly
- [ ] Navigation works

---

## 📝 Environment Variables

Required environment variables (add to `.env`):

```env
# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://username:password@host:port/database"

# AI Provider (Groq - FREE!)
# Get your key: https://console.groq.com/keys
GROQ_API_KEY="gsk_your_groq_api_key_here"

# Optional: HuggingFace for better embeddings
# Get your key: https://huggingface.co/settings/tokens
# HUGGINGFACE_API_KEY="hf_your_token_here"

# Node Environment
NODE_ENV="development"
```

---

## 🐛 Troubleshooting

### Database connection fails
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL format
# Ensure database exists
npx prisma db push
```

### AI features not working
```bash
# Verify GROQ_API_KEY is set
cat .env | grep GROQ
# Check Groq dashboard for quota
```

### Build errors
```bash
# Clean install
rm -rf node_modules .next package-lock.json
npm install
npm run build
```

### Rate limiting issues
```bash
# Check IP-based rate limiting
# Wait 1 minute and try again
# 15 requests per minute limit
```

---

## 📚 Documentation

**Architecture Documentation:** Visit `/docs` in the application

Covers:
1. **Portable Architecture** - Swappable components at every layer
2. **Design Principles** - 5 core UX principles
3. **Agent Thinking** - AI automation and future opportunities
4. **Infrastructure Mindset** - Public API and embeddable widget

---

## 🎯 Assignment Compliance

This project fulfills all requirements for the Altibbe/Hedamo Full-Stack Engineering Internship assignment:

### Task 1: Second Brain App ✅

**Core Functionality:**
- ✅ Knowledge capture (notes, links, insights)
- ✅ Intelligent dashboard with search/filter
- ✅ AI processing (summarization, tagging, RAG)
- ✅ Public infrastructure (API + widget)

**UI/UX Excellence:**
- ✅ Parallax effects and smooth scroll
- ✅ Micro-interactions and transitions
- ✅ Skeleton loaders during data fetching
- ✅ Visual hierarchy and responsive design

**Architecture Requirements:**
- ✅ Portable architecture (documented)
- ✅ Principles-based UX (documented)
- ✅ Agent thinking (documented)
- ✅ Infrastructure mindset (implemented)

### Technical Stack ✅
- ✅ Frontend: Next.js + React + Tailwind
- ✅ Backend: Next.js API routes
- ✅ Database: PostgreSQL + Prisma
- ✅ AI: Groq (Llama 3.3 70B)
- ✅ Deployment: Vercel + Neon

---

## 👨‍💻 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Database commands
npx prisma studio      # Open database GUI
npx prisma migrate dev # Create migration
npx prisma generate    # Generate client
npx prisma db push     # Push schema changes
```

---

## 🙏 Acknowledgments

Built for the **Altibbe/Hedamo Full-Stack Engineering Internship** technical assessment.

**Technologies used:**
- [Next.js](https://nextjs.org/) - React framework
- [Groq](https://groq.com/) - LLM inference
- [Prisma](https://prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Neon](https://neon.tech/) - PostgreSQL hosting

---

## 📧 Contact

**Your Name**  
Email: your.email@example.com  
GitHub: [@your-username](https://github.com/your-username)  
LinkedIn: [Your Name](https://linkedin.com/in/your-profile)

---

## 📄 License

This project was created for the Altibbe/Hedamo internship assignment.

---

**Built with ❤️ using Next.js, React, Groq AI, and PostgreSQL**

---

## 🔗 Links

- **Live Demo:** [Your Vercel URL]
- **GitHub:** [Your Repository]
- **Documentation:** [Your App URL]/docs
- **Widget Demo:** [Your App URL]/widget
- **Video Walkthrough:** [Your Video URL]
- **Hedamo Analysis:** [Your Analysis Video URL]