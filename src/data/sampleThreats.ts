import { ThreatInput } from '../types';

export interface SampleThreatItem {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  threatLevelExpected: 'Critical' | 'High' | 'Suspicious' | 'Safe';
  input: ThreatInput;
}

export const SAMPLE_THREATS: SampleThreatItem[] = [
  {
    id: 'm365-urgent-2fa',
    name: 'Microsoft 365 Security Alert (Credential Harvester)',
    category: 'Credential Phishing',
    badge: 'High Frequency Attack',
    threatLevelExpected: 'Critical',
    description: 'Impersonates IT Security demanding immediate 2FA re-authentication within 15 minutes before account termination.',
    input: {
      type: 'email',
      senderName: 'Microsoft Security Desk',
      senderEmailOrPhone: 'notifications@sec-microsoft-verify-auth.xyz',
      subject: 'URGENT: Suspicious Login Detected - Action Required in 15 Minutes',
      claimedOrganization: 'Microsoft Cloud & Office 365',
      targetUrl: 'https://login.micros0ft-portal-auth.xyz/verify-token?user=victim@corp.com',
      headers: {
        spf: 'fail',
        dkim: 'none',
        dmarc: 'fail',
        replyTo: 'harvester-relay@protonmail.com',
        returnPath: 'bounce-tracker@sec-microsoft-verify-auth.xyz'
      },
      attachments: ['Security_Incident_Log_CRITICAL.pdf'],
      content: `Attention User,

Our Global Cybersecurity Monitoring Center has detected 3 unauthorized login attempts originating from St. Petersburg, Russia on your Microsoft 365 corporate account.

Your session will be permanently SUSPENDED within 15 minutes unless you verify your identity and confirm your multi-factor authentication (2FA) credential.

Failure to verify immediately will result in complete lockout from corporate Outlook, Teams, and OneDrive, and your supervisor will be notified of a policy non-compliance violation.

👉 CLICK HERE TO VERIFY 2FA & SECURE YOUR ACCOUNT:
https://login.micros0ft-portal-auth.xyz/verify-token?user=victim@corp.com

Do NOT disregard this alert. This is an automated security protocol enforced by Corporate IT Compliance.

Best regards,
Microsoft Tier-3 Threat Response Unit`
    }
  },
  {
    id: 'bec-ceo-wire-fraud',
    name: 'Executive Impersonation (CEO Wire Fraud / BEC)',
    category: 'Business Email Compromise (BEC)',
    badge: 'Targeted Spearphishing',
    threatLevelExpected: 'Critical',
    description: 'A spoofed CEO email to the VP of Finance demanding an urgent confidential acquisition wire transfer bypassing standard review.',
    input: {
      type: 'email',
      senderName: 'David Sterling (CEO)',
      senderEmailOrPhone: 'david.sterling.executive.corp@gmail.com',
      subject: 'Strictly Confidential: Urgent Acquisition Deposit required today',
      claimedOrganization: 'Apex Global Enterprises',
      headers: {
        spf: 'neutral',
        dkim: 'none',
        dmarc: 'fail',
        replyTo: 'd.sterling.private.acquisitions@consultant.com'
      },
      attachments: ['Confidential_M&A_Wire_Instructions.pdf'],
      content: `Hi Sarah,

I am currently in an all-day board meeting with our legal counsel finalizing the Project Titan acquisition. As discussed in our executive roadmap, this is strictly confidential.

I need you to process an immediate wire transfer of $84,500 for the legal retainer before the close of business today (4:00 PM EST). 

Because of the extreme sensitivity of this transaction, please do NOT discuss this with anyone in accounting or over Slack. I cannot take phone calls right now due to the NDA session.

Please confirm you received this and I will send the bank wire coordinates. Time is of the essence.

Sent from my iPad
David Sterling
Chief Executive Officer`
    }
  },
  {
    id: 'irs-tax-refund-sms',
    name: 'IRS Tax Refund Smishing (SMS Phishing)',
    category: 'Smishing & Identity Theft',
    badge: 'Mobile SMS Attack',
    threatLevelExpected: 'High',
    description: 'SMS message claiming the taxpayer is owed an uncollected $1,420.50 refund with a shortened link requesting SSN and bank details.',
    input: {
      type: 'sms',
      senderName: '+1 (833) 492-0193',
      senderEmailOrPhone: '+1 (833) 492-0193',
      claimedOrganization: 'Internal Revenue Service (IRS)',
      targetUrl: 'https://irs-direct-refund-portal2026.link/claim-now',
      content: `[IRS-GOV ALERT]: Our automated system shows an outstanding federal tax refund of $1,420.50 for your record. You must confirm your direct deposit and SSN before 11:59 PM today to avoid forfeiture: https://irs-direct-refund-portal2026.link/claim-now. Reply STOP to cancel.`
    }
  },
  {
    id: 'linkedin-hunter-fake-job',
    name: 'LinkedIn Recruiter Malware Lure (Social Engineering)',
    category: 'Social Engineering & Malware',
    badge: 'Social Media Infiltration',
    threatLevelExpected: 'High',
    description: 'Fake high-paying remote job opportunity delivering a malicious archive containing an info-stealer disguised as job specs.',
    input: {
      type: 'social_dm',
      senderName: 'Elena Rostova - Senior Talent Partner',
      senderEmailOrPhone: '@elena_tech_talent (LinkedIn)',
      claimedOrganization: 'Google DeepMind Talent Acquisitions',
      targetUrl: 'https://deepmind-careers-download.s3-accelerate.amazonaws.com/Senior_AI_Architect_Brief.zip',
      attachments: ['Senior_AI_Architect_Brief.zip.exe'],
      content: `Hi Alex! 

I came across your profile and was genuinely impressed by your background. We are quietly scouting a Lead AI Security Architect for our confidential generative agent team ($280k - $340k + equity, 100% remote).

Because the project is unreleased, the full job specification and compensation benchmark are in our encrypted recruiter package. 

Please download and review the requirements document from our secure AWS repository:
https://deepmind-careers-download.s3-accelerate.amazonaws.com/Senior_AI_Architect_Brief.zip

Password to extract: 2026
Can you review this today and let me know when you're open for a brief 15-minute chat with our VP?`
    }
  },
  {
    id: 'dhl-package-quishing',
    name: 'DHL / USPS Undelivered Package Fee Scam',
    category: 'Delivery Fraud',
    badge: 'Consumer Scam',
    threatLevelExpected: 'High',
    description: 'Fake package delivery notification demanding a $2.95 redelivery fee to capture credit card and personal address details.',
    input: {
      type: 'email',
      senderName: 'DHL Express Dispatch',
      senderEmailOrPhone: 'tracking-update@dhl-parcel-resolution-center.info',
      subject: 'Package ID #US-98214-G: Address Incomplete - Action Required',
      claimedOrganization: 'DHL Express International',
      targetUrl: 'https://dhl-address-update-fee.info/pay?id=US-98214-G',
      headers: {
        spf: 'fail',
        dkim: 'fail',
        dmarc: 'none'
      },
      content: `Dear Customer,

Your incoming shipment (Tracking: #US-98214-G) could not be delivered on August 27, 2026 due to an incorrect postal address.

Your parcel is currently held at our regional distribution hub. To reschedule redelivery and update your address, a processing fee of $2.95 USD must be paid within 24 hours.

Failure to pay will result in the package being marked as abandoned and returned to the international sender at your expense.

👉 Update Address & Pay Redelivery Fee:
https://dhl-address-update-fee.info/pay?id=US-98214-G

Thank you for choosing DHL Express.`
    }
  },
  {
    id: 'legitimate-it-maintenance',
    name: 'Legitimate Corporate IT Planned Maintenance Notice',
    category: 'Legitimate Communication',
    badge: 'Safe Baseline',
    threatLevelExpected: 'Safe',
    description: 'Authentic scheduled maintenance notice from internal IT department with verified SPF/DKIM and no coercive credential requests.',
    input: {
      type: 'email',
      senderName: 'Corporate IT Operations',
      senderEmailOrPhone: 'it-announcements@enterprise-corp.com',
      subject: 'Scheduled Maintenance Notice: VPN & Cloud Services (Saturday 2 AM - 4 AM EST)',
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
