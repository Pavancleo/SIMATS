import { ThreatInput } from '../types';

export interface SampleThreatItem {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  threatLevelExpected: 'Critical' | 'High' | 'Suspicious' | 'Moderate' | 'Low' | 'Benign' | 'Safe';
  input: ThreatInput;
}

export const SAMPLE_THREATS: SampleThreatItem[] = [
  {
    id: 'mode-1-critical',
    name: 'Mode 1: Microsoft 365 2FA Account Lockout (Critical — 94%)',
    category: 'Credential Phishing & SSO Theft',
    badge: 'Critical (94%)',
    threatLevelExpected: 'Critical',
    description: 'Deceptive high-urgency alert demanding immediate 2FA re-verification on typosquatted portal within 15 minutes before account suspension.',
    input: {
      type: 'email',
      senderName: 'Microsoft Security Operations',
      senderEmailOrPhone: 'security-alert@micros0ft-portal-auth.xyz',
      subject: 'URGENT: 3 Unauthorized Logins Detected - Verify 2FA in 15 Minutes',
      claimedOrganization: 'Microsoft Cloud & Office 365',
      targetUrl: 'https://login.micros0ft-portal-auth.xyz/verify-token?user=victim@corp.com',
      headers: {
        spf: 'fail',
        dkim: 'none',
        dmarc: 'fail',
        replyTo: 'credential-relay@protonmail.com',
        returnPath: 'bounce@micros0ft-portal-auth.xyz'
      },
      attachments: ['Security_Incident_CRITICAL.pdf'],
      content: `Attention User,

Our Global Threat Monitoring Center detected 3 unauthorized login attempts originating from St. Petersburg, Russia on your Microsoft 365 enterprise account.

Your corporate session will be permanently SUSPENDED within 15 minutes unless you confirm your multi-factor authentication (2FA) credential.

Failure to verify immediately will result in complete lockout from Outlook, Teams, and OneDrive, and your supervisor will be notified of a policy non-compliance violation.

👉 CLICK HERE TO VERIFY 2FA & SECURE YOUR ACCOUNT:
https://login.micros0ft-portal-auth.xyz/verify-token?user=victim@corp.com

Do NOT disregard this alert. This is an automated security protocol enforced by Corporate IT Compliance.

Best regards,
Microsoft Tier-3 Threat Response Unit`
    }
  },
  {
    id: 'mode-2-high',
    name: 'Mode 2: LinkedIn Recruiter Malware Drop (High Threat — 78%)',
    category: 'Targeted Malware Staging & Social Eng',
    badge: 'High Threat (78%)',
    threatLevelExpected: 'High',
    description: 'Spearphishing social engineering lure exploiting high compensation to deliver an encrypted password-protected info-stealer payload.',
    input: {
      type: 'social_dm',
      senderName: 'Elena Rostova — Lead Talent Partner',
      senderEmailOrPhone: '@elena_talent_ai (LinkedIn)',
      claimedOrganization: 'Global AI Research Labs',
      targetUrl: 'https://careers-confidential-download.s3-accelerate.amazonaws.com/Senior_AI_Architect_Brief.zip',
      attachments: ['Senior_AI_Architect_Brief.zip.exe'],
      content: `Hi Alex!

I came across your profile and was genuinely impressed by your security architecture background. We are scouting a Lead AI Security Architect for our confidential generative agent team ($280k - $340k + equity, 100% remote).

Because the project is unreleased, the full job specification and compensation benchmark are in our encrypted recruiter package.

Please download and review the requirements document from our secure AWS repository:
https://careers-confidential-download.s3-accelerate.amazonaws.com/Senior_AI_Architect_Brief.zip

Password to extract: 2026
Can you review this today and let me know when you're open for a brief 15-minute chat with our VP?`
    }
  },
  {
    id: 'mode-3-suspicious',
    name: 'Mode 3: DHL Express Package Redelivery Scam (Suspicious — 58%)',
    category: 'Logistics Payment & Smishing Scam',
    badge: 'Suspicious (58%)',
    threatLevelExpected: 'Suspicious',
    description: 'Impersonates package delivery demanding a nominal $2.95 fee within 24 hours to capture credit card and personal identity details.',
    input: {
      type: 'email',
      senderName: 'DHL Express Dispatch Hub',
      senderEmailOrPhone: 'tracking@dhl-parcel-resolution.info',
      subject: 'Shipment #US-98214: Address Incomplete - Action Required',
      claimedOrganization: 'DHL Express International',
      targetUrl: 'https://dhl-address-update-fee.info/pay?id=US-98214',
      headers: {
        spf: 'fail',
        dkim: 'fail',
        dmarc: 'none'
      },
      content: `Dear Customer,

Your incoming shipment (Tracking: #US-98214) could not be delivered on August 27, 2026 due to an incorrect postal address.

Your parcel is currently held at our regional distribution hub. To reschedule redelivery and update your address, a processing fee of $2.95 USD must be paid within 24 hours.

Failure to pay will result in the package being marked as abandoned and returned to the international sender at your expense.

👉 Update Address & Pay Redelivery Fee:
https://dhl-address-update-fee.info/pay?id=US-98214

Thank you for choosing DHL Express.`
    }
  },
  {
    id: 'mode-4-moderate',
    name: 'Mode 4: DocuSign Unverified Vendor Contract (Moderate — 38%)',
    category: 'External Document Relay / Moderate Caution',
    badge: 'Moderate (38%)',
    threatLevelExpected: 'Moderate',
    description: 'External cloud document signature request from an unverified vendor relay with neutral SPF and unconfirmed sender identity.',
    input: {
      type: 'email',
      senderName: 'DocuSign Document Cloud',
      senderEmailOrPhone: 'dse@docusign-contracts-share.net',
      subject: 'Please DocuSign: 2026 Vendor Master Services Agreement (MSA)',
      claimedOrganization: 'DocuSign Cloud Services',
      targetUrl: 'https://app.docusign-contracts-share.net/signing/doc-89412',
      headers: {
        spf: 'neutral',
        dkim: 'none',
        dmarc: 'none',
        replyTo: 'legal-contracts@thirdparty-vendor.com'
      },
      attachments: ['Vendor_Services_Agreement_2026.pdf'],
      content: `Hello Alex,

Apex Digital Solutions has sent you a document to review and sign via DocuSign Cloud.

Document: 2026 Vendor Master Services Agreement (MSA)
Pages: 14 pages
Review Window: 7 business days

Please review and electronically sign this document at your earliest convenience:
https://app.docusign-contracts-share.net/signing/doc-89412

If you are not the intended signer, please notify the sender immediately.`
    }
  },
  {
    id: 'mode-5-low',
    name: 'Mode 5: LinkedIn Job Alerts & Network Digest (Low Risk — 20%)',
    category: 'Verified Platform Notification',
    badge: 'Low Risk (20%)',
    threatLevelExpected: 'Low',
    description: 'Authentic weekly LinkedIn job matches and network connection digest with cryptographically verified SPF/DKIM and official TLS endpoints.',
    input: {
      type: 'email',
      senderName: 'LinkedIn Job Alerts',
      senderEmailOrPhone: 'jobalerts-noreply@linkedin.com',
      subject: 'Alex, 4 new Cloud Security Engineer jobs match your profile',
      claimedOrganization: 'LinkedIn Corporation',
      targetUrl: 'https://www.linkedin.com/comm/jobs/view/4091823',
      headers: {
        spf: 'pass',
        dkim: 'pass',
        dmarc: 'pass',
        replyTo: 'donotreply@linkedin.com',
        returnPath: 'bounce-tracker@linkedin.com'
      },
      content: `Hi Alex,

Here are this week's top job recommendations tailored to your profile "Senior Security Analyst":

1. Microsoft — Cloud & Identity Security Engineer (Seattle, WA)
2. Datadog — Staff Detection & Response Specialist
3. CrowdStrike — Threat Intelligence Researcher

Also, 3 members viewed your profile this week.

View Full Recommendations on LinkedIn:
https://www.linkedin.com/comm/jobs/view/4091823

You are receiving Job Alert emails based on your LinkedIn settings.
Manage notification settings: https://www.linkedin.com/e/settings/notifications`
    }
  },
  {
    id: 'mode-6-benign',
    name: 'Mode 6: Corporate IT Planned Maintenance Notice (Benign — 7%)',
    category: 'Verified Internal Enterprise Notice',
    badge: 'Benign (7%)',
    threatLevelExpected: 'Benign',
    description: 'Authentic internal IT infrastructure maintenance bulletin with verified SPF/DKIM/DMARC and explicit zero-action / zero-credential clauses.',
    input: {
      type: 'email',
      senderName: 'Corporate IT Operations',
      senderEmailOrPhone: 'it-announcements@enterprise-corp.com',
      subject: 'Scheduled Maintenance Notice: VPN & Cloud Gateway (Saturday 2 AM - 4 AM EST)',
      claimedOrganization: 'Enterprise Corp Global IT',
      targetUrl: 'https://wiki.enterprise-corp.com/it/maintenance-calendar-aug2026',
      headers: {
        spf: 'pass',
        dkim: 'pass',
        dmarc: 'pass',
        replyTo: 'it-helpdesk@enterprise-corp.com'
      },
      content: `Hello Team,

Please be advised that Corporate IT will be performing scheduled network gateway upgrades this Saturday, August 30th, between 2:00 AM and 4:00 AM EST.

What you should expect:
• VPN connectivity and internal intranet tools may experience intermittent 5-minute outages.
• No action is required on your part.
• Corporate IT will NEVER ask you to share your password, 2FA tokens, or credit card information.

For the full maintenance roadmap and helpdesk support tickets, please visit our internal wiki:
https://wiki.enterprise-corp.com/it/maintenance-calendar-aug2026

If you experience issues following the maintenance window, please reach out to the IT Helpdesk via ServiceNow or internal extension #4357.

Thank you,
Corporate IT Operations Team`
    }
  }
];
