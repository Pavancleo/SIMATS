export type ThreatCategory = 
  | 'phishing'
  | 'spear_phishing'
  | 'bec_ceo_fraud'
  | 'smishing'
  | 'credential_harvesting'
  | 'financial_fraud'
  | 'malware_delivery'
  | 'tech_support_scam'
  | 'safe_legitimate';

export type InputType = 'email' | 'sms' | 'social_dm' | 'url' | 'raw_text';

export interface ThreatInput {
  type: InputType;
  senderName?: string;
  senderEmailOrPhone?: string;
  subject?: string;
  content: string;
  targetUrl?: string;
  headers?: {
    spf?: 'pass' | 'fail' | 'neutral' | 'none';
    dkim?: 'pass' | 'fail' | 'none';
    dmarc?: 'pass' | 'fail' | 'none';
    replyTo?: string;
    returnPath?: string;
  };
  attachments?: string[];
  claimedOrganization?: string;
}

export interface HighlightFlag {
  text: string;
  category: 'urgency' | 'fear' | 'authority' | 'link_deception' | 'credential_lure' | 'inconsistency' | 'financial';
  explanation: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface NlpLayerAnalysis {
  tone: string;
  sentiment: string;
  coerciveLanguageScore: number; // 0-100
  grammaticalAnomalies: string[];
  homoglyphOrEvasiveTricks: string[];
  linguisticMarkers: string[];
}

export interface SocialEngineeringLayerAnalysis {
  primaryTactic: string;
  psychologicalTriggers: {
    name: string; // Urgency, Fear, Authority, Scarcity, Curiosity, Social Proof, Greed
    intensity: number; // 0-100
    description: string;
  }[];
  emotionalManipulationScore: number; // 0-100
}

export interface UrlLayerAnalysis {
  detectedUrls: {
    originalUrl: string;
    isSuspicious: boolean;
    domain: string;
    domainAgeEstimate?: string;
    typosquattingRisk: 'None' | 'Low' | 'High' | 'Critical';
    lookalikeTarget?: string;
    tldRisk: 'Standard' | 'Elevated' | 'High Risk';
    destinationMismatch: boolean;
    ipBasedUrl: boolean;
    findings: string[];
  }[];
  urlRiskScore: number; // 0-100
}

export interface SenderIdentityLayerAnalysis {
  claimedIdentity: string;
  actualSender: string;
  isSpoofed: boolean;
  freeWebmailDiscrepancy: boolean;
  replyToMismatch: boolean;
  domainAlignment: 'Aligned' | 'Mismatched' | 'Suspicious New Domain' | 'Unknown';
  authHealth: {
    spf: string;
    dkim: string;
    dmarc: string;
  };
  identityRiskScore: number; // 0-100
}

export interface BehavioralPatternAnalysis {
  urgencyWindow: string; // e.g. "Immediate (under 15 mins)"
  protocolBypassAttempt: boolean;
  outOfBandCommunicationRequested: boolean;
  sensitiveActionRequested: string; // e.g. "Wire transfer", "Password reset", "Gift card purchase"
  behaviorRiskScore: number; // 0-100
}

export interface ContextConsistencyAnalysis {
  organizationContextMismatch: string;
  channelAppropriateness: 'Normal' | 'Unusual' | 'Highly Deviant';
  historicalBaselineDeviation: string;
  consistencyScore: number; // 0-100
}

export interface AttackDNATechnique {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  mitreRef?: string;
  description: string;
  evidence: string;
}

export interface ManipulationStep {
  stepNumber: number;
  phase: string;
  trigger: string;
  psychologicalMechanism: string;
  victimReaction: string;
  iconName: string;
}

export interface TrustGraphNode {
  id: string;
  label: string;
  type: 'claimed_org' | 'sender_entity' | 'domain' | 'email_address' | 'destination_url' | 'payload';
  isCompromisedOrMalicious: boolean;
  statusText: string;
}

export interface TrustGraphEdge {
  from: string;
  to: string;
  label: string;
  isBrokenTrust: boolean;
  reason: string;
}

export interface TrustGraph {
  nodes: TrustGraphNode[];
  edges: TrustGraphEdge[];
  summary: string;
}

export interface ProjectedImpactStep {
  stage: number;
  action: string;
  systemResponse: string;
  attackerOutcome: string;
  riskLevel: 'medium' | 'high' | 'critical';
}

export interface ProjectedImpact {
  severityLevel: 'Minimal' | 'Moderate' | 'Severe' | 'Catastrophic';
  financialExposureEstimate: string;
  dataCompromiseTypes: string[];
  blastRadius: string;
  timeline: ProjectedImpactStep[];
}

export interface SecurityRecommendation {
  priority: 'Immediate' | 'Secondary' | 'SOC Escalation';
  action: string;
  detail: string;
  iconName: string;
}

export interface FullThreatAnalysisResult {
  scanId: string;
  timestamp: string;
  overallRiskScore: number; // 0-100
  humanManipulationRiskScore: number; // 0-100
  technicalThreatRiskScore: number; // 0-100
  threatLevel: 'Safe' | 'Low Suspicion' | 'Suspicious' | 'Moderate' | 'Moderate Caution' | 'High Risk' | 'Critical Attack' | 'Benign';
  threatCategory: ThreatCategory;
  categoryName: string;
  confidenceScore: number; // 0-100
  executiveVerdict: string;
  
  // 3. Multi-Layer Analysis
  nlpLayer: NlpLayerAnalysis;
  socialEngineeringLayer: SocialEngineeringLayerAnalysis;
  urlLayer: UrlLayerAnalysis;
  senderIdentityLayer: SenderIdentityLayerAnalysis;
  behavioralLayer: BehavioralPatternAnalysis;
  contextConsistencyLayer: ContextConsistencyAnalysis;

  // 6. Attack DNA
  attackDNA: AttackDNATechnique[];

  // 7. Manipulation Chain
  manipulationChain: ManipulationStep[];

  // 8. Trust Graph
  trustGraph: TrustGraph;

  // 9. Projected Impact
  projectedImpact: ProjectedImpact;

  // 10. Explainable Highlights & Recommendations
  highlightedFlags: HighlightFlag[];
  whyDangerousExplanation: string[];
  recommendations: SecurityRecommendation[];
  mitreAttackMappings: string[];
}
