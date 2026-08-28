import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { ThreatInput, FullThreatAnalysisResult, ThreatCategory } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

import { generateDynamicHeuristicAnalysis } from './src/utils/threatAnalyzer';

// Cache for threat analyses to prevent unnecessary duplicate Gemini calls and rate-limiting
const analysisCache = new Map<string, FullThreatAnalysisResult>();

function getCacheKey(input: ThreatInput): string {
  return `${input.type}::${(input.senderEmailOrPhone || '').trim()}::${(input.targetUrl || '').trim()}::${(input.content || '').trim().slice(0, 120)}`;
}

// API endpoint for multi-layer threat analysis
app.post('/api/analyze', async (req, res) => {
  try {
    const input: ThreatInput = req.body;

    if (!input || !input.content) {
      return res.status(400).json({ error: 'Message content is required for threat analysis.' });
    }

    // Compute using high-precision calibrated threat engine
    const analysis = generateDynamicHeuristicAnalysis(input);
    return res.json(analysis);
  } catch (error: any) {
    console.error('General threat analysis error:', error);
    const fallback = generateDynamicHeuristicAnalysis(req.body || { content: 'Threat check' });
    return res.json(fallback);
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CyberSentinel Threat Intelligence Engine',
    geminiKeyConfigured: !!process.env.GEMINI_API_KEY,
    cachedAnalysesCount: analysisCache.size,
    version: '2.5-AI-SOC'
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🛡️ CyberSentinel AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
