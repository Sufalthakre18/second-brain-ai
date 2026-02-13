"use client";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SB</span>
              </div>
              <span className="text-xl font-bold text-white">Second Brain - Documentation</span>
            </div>
            <a
              href="/"
              className="px-4 py-2 bg-violet-600 rounded-lg text-white hover:bg-violet-700 transition-all"
            >
              ← Back to App
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="prose prose-invert prose-slate max-w-none">
          {/* Introduction */}
          <section className="mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">📚 Architecture Documentation</h1>
            <p className="text-xl text-slate-400">
              Comprehensive guide to the Second Brain AI application's design principles, architecture, and infrastructure.
            </p>
          </section>

          {/* 1. Portable Architecture */}
          <section className="mb-16 p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🔧</span>
              1. Portable Architecture
            </h2>
            <p className="text-lg text-slate-300 mb-6">
              The application is built with clear separation of concerns, making each layer swappable and maintainable.
            </p>

            <div className="space-y-6">
              <div className="p-6 bg-slate-900/50 rounded-xl">
                <h3 className="text-xl font-bold text-violet-400 mb-3">🎨 Presentation Layer (Frontend)</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Framework:</strong> Next.js 16 with React 19 (App Router)</li>
                  <li>• <strong>Styling:</strong> Tailwind CSS 4 for utility-first design</li>
                  <li>• <strong>State Management:</strong> React useState/useEffect hooks</li>
                  <li>• <strong>Swappable with:</strong> Vue.js, Angular, or any SPA framework</li>
                </ul>
              </div>

              <div className="p-6 bg-slate-900/50 rounded-xl">
                <h3 className="text-xl font-bold text-violet-400 mb-3">⚙️ API Layer (Backend)</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Framework:</strong> Next.js API Routes (serverless functions)</li>
                  <li>• <strong>Validation:</strong> Zod schema validation</li>
                  <li>• <strong>Rate Limiting:</strong> In-memory rate limiter (15 req/min)</li>
                  <li>• <strong>Swappable with:</strong> Express.js, FastAPI, or any REST framework</li>
                </ul>
              </div>

              <div className="p-6 bg-slate-900/50 rounded-xl">
                <h3 className="text-xl font-bold text-violet-400 mb-3">🗄️ Data Layer (Database)</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>ORM:</strong> Prisma with PostgreSQL adapter</li>
                  <li>• <strong>Database:</strong> PostgreSQL (local or cloud)</li>
                  <li>• <strong>Vector Storage:</strong> Float[] arrays for embeddings</li>
                  <li>• <strong>Swappable with:</strong> MongoDB, MySQL, or pgvector extension</li>
                </ul>
              </div>

              <div className="p-6 bg-slate-900/50 rounded-xl">
                <h3 className="text-xl font-bold text-violet-400 mb-3">🤖 AI Layer (Intelligence)</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Provider:</strong> Google Gemini (gemini-1.5-flash, embedding-001)</li>
                  <li>• <strong>Features:</strong> Summarization, auto-tagging, RAG queries</li>
                  <li>• <strong>Vector Search:</strong> Cosine similarity in-memory</li>
                  <li>• <strong>Swappable with:</strong> OpenAI, Anthropic Claude, or local models</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-300">
                ✅ <strong>Portability achieved through:</strong> Clean interfaces, dependency injection patterns, and environment-based configuration
              </p>
            </div>
          </section>

          {/* 2. Principles-Based UX */}
          <section className="mb-16 p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🎯</span>
              2. Design Principles
            </h2>
            <p className="text-lg text-slate-300 mb-6">
              Five core principles guide every UX decision in the application.
            </p>

            <div className="space-y-4">
              <div className="p-6 bg-linear-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-2">1. Progressive Disclosure</h3>
                <p className="text-slate-300">
                  Show essential information first, reveal complexity on demand. Cards show summaries by default, full content expands on click.
                </p>
              </div>

              <div className="p-6 bg-linear-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-2">2. Immediate Feedback</h3>
                <p className="text-slate-300">
                  Every action gets instant visual response. Loading states with skeleton loaders, hover effects, and transition animations provide constant feedback.
                </p>
              </div>

              <div className="p-6 bg-linear-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-2">3. AI Transparency</h3>
                <p className="text-slate-300">
                  Users always know when AI is working. Clear labeling of AI-generated content (summaries, tags), similarity scores on search results, and processing indicators.
                </p>
              </div>

              <div className="p-6 bg-linear-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-2">4. Motion with Purpose</h3>
                <p className="text-slate-300">
                  Animations guide attention and provide context. Parallax effects on landing, staggered card animations, and smooth page transitions enhance understanding without distraction.
                </p>
              </div>

              <div className="p-6 bg-linear-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-2">5. Zero-Friction Input</h3>
                <p className="text-slate-300">
                  Minimize barriers to knowledge capture. Single-form entry, auto-generated metadata, keyboard shortcuts (Enter to submit), and smart defaults reduce cognitive load.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Agent Thinking */}
          <section className="mb-16 p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🤖</span>
              3. Agent Thinking & Automation
            </h2>
            <p className="text-lg text-slate-300 mb-6">
              The system includes intelligent automation that enhances itself over time.
            </p>

            <div className="space-y-6">
              <div className="p-6 bg-slate-900/50 rounded-xl">
                <h3 className="text-xl font-bold text-violet-400 mb-3">Current Automation</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">📝</span>
                    <div>
                      <strong>Auto-Summarization:</strong> Every knowledge item automatically gets a 3-sentence summary using Gemini
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🏷️</span>
                    <div>
                      <strong>Auto-Tagging:</strong> AI generates 5 relevant tags for categorization without manual effort
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🔍</span>
                    <div>
                      <strong>Semantic Embeddings:</strong> Content is automatically vectorized for intelligent search
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">🔄</span>
                    <div>
                      <strong>Re-generation:</strong> Users can trigger AI to regenerate summaries/tags if unsatisfied
                    </div>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-slate-900/50 rounded-xl">
                <h3 className="text-xl font-bold text-violet-400 mb-3">Future Automation Opportunities</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Smart Reminders:</strong> Surface forgotten notes based on browsing patterns</li>
                  <li>• <strong>Auto-Linking:</strong> Detect and create connections between related items</li>
                  <li>• <strong>Quality Scoring:</strong> Flag low-quality or duplicate entries</li>
                  <li>• <strong>Scheduled Digests:</strong> Weekly summaries of new insights</li>
                  <li>• <strong>Adaptive Learning:</strong> Improve tag suggestions based on user corrections</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Infrastructure Mindset */}
          <section className="mb-16 p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🏗️</span>
              4. Infrastructure & Public Access
            </h2>
            <p className="text-lg text-slate-300 mb-6">
              Built as infrastructure, not just an app. Knowledge is accessible programmatically and embeddable.
            </p>

            <div className="space-y-6">
              <div className="p-6 bg-slate-900/50 rounded-xl">
                <h3 className="text-xl font-bold text-violet-400 mb-3">🔌 Public REST API</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Endpoint:</strong> <code className="text-green-400">GET /api/public/query?q=...</code></li>
                  <li>• <strong>Purpose:</strong> Query knowledge base from external applications</li>
                  <li>• <strong>Use Cases:</strong> CLI tools, mobile apps, integrations</li>
                  <li>• <strong>Rate Limiting:</strong> Protected by IP-based rate limiter</li>
                </ul>
              </div>

              <div className="p-6 bg-slate-900/50 rounded-xl">
                <h3 className="text-xl font-bold text-violet-400 mb-3">🖼️ Embeddable Widget</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Route:</strong> <code className="text-green-400">/widget</code></li>
                  <li>• <strong>Purpose:</strong> Iframe-embeddable search interface</li>
                  <li>• <strong>Use Cases:</strong> Embed in documentation sites, blogs, portfolios</li>
                  <li>• <strong>Features:</strong> Lightweight, styled, responsive design</li>
                </ul>
              </div>

              <div className="p-6 bg-slate-900/50 rounded-xl">
                <h3 className="text-xl font-bold text-violet-400 mb-3">🚀 Deployment Architecture</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Frontend:</strong> Vercel (recommended) or Netlify</li>
                  <li>• <strong>Database:</strong> Neon, Supabase, or Railway PostgreSQL</li>
                  <li>• <strong>AI Provider:</strong> Google AI Studio (Gemini)</li>
                  <li>• <strong>Environment:</strong> Serverless functions, zero DevOps</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tech Stack Summary */}
          <section className="mb-16 p-8 bg-linear-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">💻 Complete Tech Stack</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Frontend</h3>
                <ul className="space-y-1 text-slate-300">
                  <li>• Next.js 16 (App Router)</li>
                  <li>• React 19</li>
                  <li>• Tailwind CSS 4</li>
                  <li>• TypeScript</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">Backend</h3>
                <ul className="space-y-1 text-slate-300">
                  <li>• Next.js API Routes</li>
                  <li>• Zod validation</li>
                  <li>• Custom rate limiting</li>
                  <li>• RESTful architecture</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">Database</h3>
                <ul className="space-y-1 text-slate-300">
                  <li>• PostgreSQL</li>
                  <li>• Prisma ORM</li>
                  <li>• PrismaPg adapter</li>
                  <li>• Vector embeddings (Float[])</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">AI/ML</h3>
                <ul className="space-y-1 text-slate-300">
                  <li>• Google Gemini 1.5 Flash</li>
                  <li>• embedding-001 model</li>
                  <li>• RAG (Retrieval-Augmented Generation)</li>
                  <li>• Cosine similarity search</li>
                </ul>
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section className="mb-16 p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">📖 API Reference</h2>

            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <code className="text-green-400">GET /api/items</code>
                <p className="text-slate-400 mt-2">Fetch knowledge items with filtering, pagination, and sorting</p>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg">
                <code className="text-green-400">POST /api/items</code>
                <p className="text-slate-400 mt-2">Create new knowledge item with auto AI processing</p>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg">
                <code className="text-green-400">POST /api/items/:id/regenerate</code>
                <p className="text-slate-400 mt-2">Regenerate AI summary and tags for existing item</p>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg">
                <code className="text-green-400">POST /api/query</code>
                <p className="text-slate-400 mt-2">RAG-powered semantic search with similarity scores</p>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg">
                <code className="text-green-400">GET /api/public/query?q=...</code>
                <p className="text-slate-400 mt-2">Public endpoint for external integrations</p>
              </div>
            </div>
          </section>

          {/* Security & Performance */}
          <section className="p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">🔒 Security & Performance</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-violet-400 mb-3">Security</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>✓ Server-side API key storage</li>
                  <li>✓ IP-based rate limiting</li>
                  <li>✓ Zod input validation</li>
                  <li>✓ SQL injection prevention (Prisma)</li>
                  <li>✓ CORS configuration</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-violet-400 mb-3">Performance</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>✓ Serverless functions (auto-scaling)</li>
                  <li>✓ Connection pooling (PostgreSQL)</li>
                  <li>✓ Client-side caching</li>
                  <li>✓ Optimized animations (GPU acceleration)</li>
                  <li>✓ Lazy loading patterns</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}