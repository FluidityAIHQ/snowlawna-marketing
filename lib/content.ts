// Editable marketing copy. Product claims here are grounded in the product's own docs
// (README, QUOTATIONS.md, THEME.md) — keep them in sync as the product changes.

/**
 * Social proof stubs. These are NOT real customer quotes: while `isPlaceholder` is true the section
 * says so on the page. Swap in approved, attributable quotes and set it to false before launch.
 */
export const testimonials = {
  isPlaceholder: true,
  items: [
    {
      quote:
        "Storm nights used to run on a whiteboard and three group chats. Now the whole crew works off one board, and the office can see who's behind before the phones start ringing.",
      role: "Operations manager",
      company: "Residential snow contractor · 9 trucks",
      tone: "ice",
    },
    {
      quote:
        "Measuring from satellite means I can price a property before I've driven out to it. The customer gets a clean quote the same day they call.",
      role: "Owner-operator",
      company: "Lawn & snow · 3 trucks",
      tone: "spruce",
    },
    {
      quote:
        "Our sign-in page and customer quotes carry our own name and colors. Clients never see anyone else's brand.",
      role: "General manager",
      company: "Property services company",
      tone: "ice",
    },
  ],
} as const;

export const plans = [
  {
    name: "1 truck",
    monthly: 128,
    audience: "One workspace and one truck/driver license.",
    features: [
      "Contracts, clients and quotations",
      "Measure-to-quote with share links",
      "Dispatch board and live map",
      "CSV and text exports",
    ],
  },
  {
    name: "3 trucks",
    monthly: 186,
    audience: "One workspace and three truck/driver licenses.",
    featured: true,
    features: [
      "Contracts, clients and quotations",
      "Measure-to-quote with share links",
      "Dispatch board and live map",
      "Your company branding",
    ],
  },
  {
    name: "10 trucks",
    monthly: 389,
    audience: "One workspace and ten truck/driver licenses.",
    features: [
      "Contracts, clients and quotations",
      "Measure-to-quote with share links",
      "Dispatch board and live map",
      "Your company branding",
    ],
  },
] as const;

export const faqs = [
  {
    question: "Is Snowlawna for snow, lawn or both?",
    answer:
      "Both. Contracts can be Snow, Lawn or Snow & lawn, and the same client list, maps and dispatch board carry through the whole year, so you aren't running winter and summer out of different tools.",
  },
  {
    question: "How does measure-to-quote work?",
    answer:
      "Search the address and the map flies to the property on satellite imagery. Trace lawn areas and snow surfaces, draw driveways and walkways, then pick Snow, Lawn or Snow & lawn. The estimate updates as you draw, and you send the customer a share link with the traced property, line items and seasonal total.",
  },
  {
    question: "How accurate are satellite measurements?",
    answer:
      "Accurate enough to quote with confidence, but it's an estimate, not a survey. Areas are calculated geodesically and every point is stored to about a centimetre, but imagery can be dated or slightly offset, so the quote says so and you can adjust shapes before you send it.",
  },
  {
    question: "What happens when a customer accepts a quote?",
    answer:
      "After your business completes Stripe onboarding, customers can pay a shared quote through Stripe. Snowlawna confirms the payment before creating the client and active contract. Funds go to your own Stripe account. You can also record a payment collected outside Snowlawna when no online payment is pending.",
  },
  {
    question: "Can Snowlawna carry our own branding?",
    answer:
      "Yes. Each company gets its own logo, colors and tagline, applied across the workspace, the sign-in page, maps and the quotes your customers open.",
  },
  {
    question: "Can I try it before booking a demo?",
    answer: "Create a company workspace for a 14-day trial with your own data, or book a guided demo. The subscription is C$99 per workspace plus C$29 per enrolled truck/driver each month, before tax, with no setup fee. Sign in with an email code or passkey.",
  },
  {
    question: "Does it work on a phone?",
    answer:
      "The workspace works in mobile browsers for checking routes and jobs on the go. Ask us about the current availability of the companion mobile apps.",
  },
  {
    question: "How is Snowlawna priced?",
    answer:
      "Per season, based on the size of your operation: routes, crews and device licenses. Tell us about your fleet and we'll send you a quote.",
  },
] as const;
