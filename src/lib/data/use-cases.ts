export interface UseCase {
  id: string;
  name: string;
  cta: string;
  summary: string; // short — shown on the card, no truncation
  description: string; // long — shown in the modal
  industries: string[];
  hasForm: boolean;
  webhookPath: string;
  source: {
    workspace: string;
    workflow: string;
  };
  status: "READY" | "BUILD" | "PARTIAL";
  isSpeedToLead?: boolean;
}

export const useCases: UseCase[] = [
  {
    id: "speed-to-lead",
    name: "Speed-to-Lead",
    cta: "See Speed-to-Lead in Action",
    summary: "AI calls new leads within seconds, qualifies them on your intake script, and live-transfers to a rep or books an appointment.",
    description: "The moment a lead submits the form, Conduit's AI agent calls them within seconds. The agent introduces itself, qualifies the prospect using your intake script (debt amount, income, payment status, employment), and either live-transfers to an available specialist or books an appointment if no one's free. If the lead doesn't answer, the workflow retries across a 3-day cadence — two calls per day with SMS between attempts — until contact is made or the lead is moved to nurture. Every call is transcribed, logged to CRM, and the contact record is updated with qualification answers automatically.",
    industries: ["Debt Relief", "Lending", "Insurance", "Auto Finance"],
    hasForm: true,
    webhookPath: "/api/webhooks/speed-to-lead",
    source: { workspace: "Debt Blue", workflow: "Speed-to-Lead & Qualification + Call Escalation" },
    status: "READY",
    isSpeedToLead: true,
  },
  {
    id: "nsf-recovery",
    name: "NSF / Payment Recovery",
    cta: "Get an NSF Recovery Call",
    summary: "When a payment draft fails, AI calls the customer within hours to reschedule the payment and sends an SMS confirmation.",
    description: "When a payment draft fails (NSF), Conduit's AI agent calls the customer within hours to recover it. The agent references the failed payment, explains what happened, and offers to reschedule the draft for the next business day. If the customer agrees, the agent confirms the new date and sends an SMS confirmation. If they need to speak with someone, the agent transfers to a live rep. The workflow tracks whether the customer agreed to pay, requested a callback, or needs escalation — and updates the CRM with the outcome automatically.",
    industries: ["Loan Servicing", "Debt Relief", "Collections"],
    hasForm: true,
    webhookPath: "/api/webhooks/nsf-recovery",
    source: { workspace: "Lighthouse Finance", workflow: "Global NSF Webhook Handler + NSF Outbound" },
    status: "READY",
  },
  {
    id: "collections-outbound",
    name: "Collections Outbound",
    cta: "Get a Collections Call",
    summary: "AI calls past-due accounts, offers payment arrangements, captures promise-to-pay commitments, and escalates disputes.",
    description: "When an account goes past due, Conduit's AI agent calls the debtor to discuss their outstanding balance. The agent references the amount owed, offers payment arrangement options (pay in full, set up a payment plan, or reschedule), and captures a promise-to-pay commitment with a specific date. If the debtor has a dispute or needs to negotiate, the agent transfers to a live agent. The workflow runs a multi-attempt cadence for unreached contacts and updates the CRM with the disposition after every call — promise to pay, refused, disputed, or unreachable.",
    industries: ["Collections", "Loan Servicing"],
    hasForm: true,
    webhookPath: "/api/webhooks/collections-outbound",
    source: { workspace: "—", workflow: "—" },
    status: "BUILD",
  },
  {
    id: "settlement-approval",
    name: "Settlement Approval Follow-Up",
    cta: "Get a Settlement Approval Call",
    summary: "When a creditor approves a settlement, AI calls the client immediately with the details and deadline to accept.",
    description: "When a creditor approves a settlement offer, Conduit's AI agent calls the client immediately to let them know. The agent explains which creditor approved, the settlement amount, and the deadline to accept. If the client confirms they want to proceed, the agent logs the verbal approval and transfers to a specialist to finalize. If the client needs time, the agent schedules a follow-up callback before the approval window expires. This closes the 10% of settlements that are typically lost because no one followed up in time.",
    industries: ["Debt Relief"],
    hasForm: true,
    webhookPath: "/api/webhooks/settlement-approval",
    source: { workspace: "—", workflow: "—" },
    status: "BUILD",
  },
  {
    id: "added-funds",
    name: "Added Funds Outreach",
    cta: "Get an Added Funds Call",
    summary: "AI contacts clients who need to deposit funds to unlock a pending settlement, using a multi-day SMS and call sequence.",
    description: "When a client needs to deposit additional funds into their escrow or trust account to unlock a pending settlement, Conduit's AI agent reaches out via SMS and then calls. The agent explains the required deposit amount, why it's needed, and the deadline. If the client has questions, the agent answers from the knowledge base or transfers to a specialist. The workflow runs a multi-day sequence — SMS first, then call, then follow-up SMS — with wait windows between touches to avoid over-contacting.",
    industries: ["Debt Relief"],
    hasForm: true,
    webhookPath: "/api/webhooks/added-funds",
    source: { workspace: "Level Debts", workflow: "Balance Reduction" },
    status: "PARTIAL",
  },
  {
    id: "compliance-qa",
    name: "Compliance / QA",
    cta: "Get a Compliance Call",
    summary: "Every AI call is transcribed, scored for compliance, and synced to your CRM. 100% call review, zero manual effort.",
    description: "After every AI call, Conduit automatically transcribes the conversation, extracts key data points (customer responses, compliance-sensitive language, script adherence), and syncs the full transcript and metadata to your CRM. Every interaction gets reviewed — not just a 5% sample. The system flags potential compliance breaches, tracks script deviations, and maintains a complete audit trail with call recordings, transcripts, and extracted fields. Your compliance team gets eyes on 100% of interactions without listening to a single call.",
    industries: ["Debt Relief", "Collections", "Lending", "Insurance"],
    hasForm: true,
    webhookPath: "/api/webhooks/compliance-qa",
    source: { workspace: "Level Debts + Debt Blue", workflow: "Compliance Call Completed + Call Completed Flow: Sending Transcript For Every Call" },
    status: "READY",
  },
  {
    id: "refinance",
    name: "Refinance Outbound + Inbound",
    cta: "Get a Refinance Call",
    summary: "AI calls borrowers about refinance opportunities, qualifies interest, and routes them to a loan officer or books a consultation.",
    description: "Conduit's AI agent calls existing borrowers to discuss refinance opportunities. The agent references their current loan, asks if they've considered refinancing given current rates, and qualifies their interest. If the borrower is interested, the agent either live-transfers to a loan officer or books a consultation appointment. If they don't answer, the agent leaves a voicemail and sends a follow-up SMS. When a borrower calls back, the inbound handler picks up, recognizes the context, handles intake, and routes them to the right person.",
    industries: ["Lending", "Auto Finance"],
    hasForm: true,
    webhookPath: "/api/webhooks/refinance",
    source: { workspace: "Conduit for Lending", workflow: "Refinance Outbound + Refinance Inbound Handler" },
    status: "READY",
  },
  {
    id: "lead-reactivation",
    name: "Lead Reactivation / Rehash",
    cta: "Get a Lead Reactivation Call",
    summary: "AI re-engages dropped leads with a multi-day call and SMS sequence, checking if their situation has changed.",
    description: "For leads that dropped off — didn't show to an appointment, stopped responding, or were previously rejected — Conduit's AI agent re-engages them with a multi-day SMS and call sequence. The agent references their original inquiry, checks if their situation has changed, and offers to reconnect them with a specialist. The workflow checks at each stage whether the lead has already re-engaged before firing the next touch, preventing over-contact. Separate nurture tracks handle leads that aren't ready yet with a longer-term drip over weeks.",
    industries: ["Debt Relief", "Lending", "Insurance", "Auto Finance"],
    hasForm: true,
    webhookPath: "/api/webhooks/lead-reactivation",
    source: { workspace: "Level Debts", workflow: "Rehash + Nurture" },
    status: "READY",
  },
];
