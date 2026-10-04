export const PRESET_SCENARIOS = [
  {
    id: "monolith-to-microservices",
    title: "Upgrading an Old 10-Year-Old Software System",
    domain: "Software & Technology",
    description: "Breaking down a large, legacy software system into 12 smaller connected programs so updates are easier and don't cause crashes for 800,000 daily users.",
    inputContext: {
      goal: "Break down our old 10-year-old software system into 12 smaller programs over 9 months without causing any site crashes.",
      availableInfo: [
        "The software serves 800,000 daily users with 99.8% reliability.",
        "Releasing updates takes 2 weeks of manual checking.",
        "The team has 18 software developers and 3 IT managers."
      ],
      constraints: [
        "The website must stay online 24 hours a day without downtime.",
        "The total budget can only increase by 25% maximum.",
        "A strict 9-month deadline was set by leadership."
      ]
    },
    evaluation: {
      summary: {
        coreGoal: "Break down old 10-year-old software into 12 smaller programs within 9 months without crashes.",
        primaryRiskScore: "High",
        keyBlindspotCount: 5
      },
      contextMapping: {
        goal: "Break down old 10-year-old software into 12 smaller programs within 9 months without crashes.",
        availableInfo: [
          "Serves 800,000 daily users with 99.8% reliability",
          "Releasing updates takes 2 weeks of manual checking",
          "Team of 18 software developers and 3 IT managers"
        ],
        constraints: [
          "Must stay online 24/7 without crashing",
          "Maximum 25% extra budget allowed",
          "Strict 9-month completion deadline"
        ]
      },
      blindSpots: [
        {
          category: "Hidden Assumption",
          title: "Assuming Code Parts Are Easy to Separate",
          description: "Believing that different parts of your software (like Accounts and Billing) can be cleanly unplugged from each other without finding hidden links that break things.",
          severity: "Critical",
          mitigation: "Check all code connections carefully before trying to separate the first part."
        },
        {
          category: "Missing Information",
          title: "No Setup to Measure Where Delays Happen",
          description: "There is no speed tracking system set up yet to tell you why things are slow when the 12 smaller programs talk to each other.",
          severity: "High",
          mitigation: "Install speed tracking software before splitting off the new programs."
        },
        {
          category: "Overlooked Risk",
          title: "Information Getting Out of Sync Across Programs",
          description: "If an update saves in one program but fails in another, customer records (like payment history) could become incorrect.",
          severity: "Critical",
          mitigation: "Use safe message queuing tools instead of updating multiple databases directly."
        },
        {
          category: "Internal Contradiction",
          title: "Expecting 3 Managers to Handle 12 Programs",
          description: "Expecting a small 3-person team to manage 12 separate programs, servers, and databases without hiring extra help.",
          severity: "High",
          mitigation: "Use automated cloud services so your small team doesn't have to manage servers manually."
        },
        {
          category: "Unconsidered Stakeholders",
          title: "Customer Support Staff Lookups",
          description: "Your customer support team currently searches for customer records in one place. Splitting data across 12 programs will break their lookup tools.",
          severity: "Moderate",
          mitigation: "Build a single, easy search tool for support staff before making changes to the database."
        }
      ],
      decisionTwin: {
        bestCase: {
          scenario: "All 12 programs are separated smoothly in 8 months. Software updates take minutes instead of weeks, and the site runs 40% faster.",
          probability: "20%"
        },
        realisticCase: {
          scenario: "The first 4 programs are separated by month 9. Data sync issues cause delays, pushing full completion to 14 months with extra costs.",
          probability: "60%"
        },
        worstCase: {
          scenario: "Connection delays cause a 6-hour website outage during peak hours, damaging customer trust and forcing a rollback to the old system.",
          probability: "20%"
        }
      },
      counterProbes: [
        {
          question: "If this project fails in 6 months, what single mistake caused it?",
          rationale: "Helps you spot the single biggest danger before spending money."
        },
        {
          question: "What if splitting the software actually makes your team work slower because testing becomes harder?",
          rationale: "Checks if your plan actually saves time or creates extra work."
        },
        {
          question: "What exact error rate or delay metric would make you stop and pause this project?",
          rationale: "Sets a clear safety boundary so you know when to pause before things break."
        }
      ],
      options: [
        {
          name: "Option A: Step-by-Step Approach (Recommended)",
          approach: "Clean up the code inside the main system first, then move features out one by one (starting with low-risk parts like Search).",
          tradeOffs: "Takes a little longer, but keeps the site safe and prevents team burnout.",
          riskLevel: "Low"
        },
        {
          name: "Option B: Rebuild Everything at Once",
          approach: "Build all 12 new programs at the same time and switch everything over on a single day.",
          tradeOffs: "Fastest if everything goes right, but very high risk of data errors and site crashes.",
          riskLevel: "High"
        },
        {
          name: "Option C: Keep the Old System, Add New Features Separately",
          approach: "Leave the old working system untouched for main features, and only build brand new features as separate programs.",
          tradeOffs: "Fixes immediate overload without risking core user data.",
          riskLevel: "Medium"
        }
      ],
      learningLoop: {
        metricsToTrack: [
          "Website Loading Speed (Target: Under 2 seconds)",
          "How Often Software Updates Are Released Safely",
          "Time Taken to Fix Any Site Outages"
        ],
        reviewMilestone: "90-Day Progress Review Meeting"
      }
    }
  },

  {
    id: "b2c-to-enterprise-b2b",
    title: "Switching from Selling to Individuals to Selling to Companies",
    domain: "Business & Sales",
    description: "Shifting from a $14/month consumer app to selling $50,000/year corporate wellness plans directly to company HR departments.",
    inputContext: {
      goal: "Switch from selling to individual customers to selling annual corporate plans to reach $5 Million in annual revenue within 18 months.",
      availableInfo: [
        "The consumer app currently has 45,000 monthly subscribers.",
        "Monthly customer drop-off is 7.2%, making individual ads expensive.",
        "The founder manually closed 3 company contracts worth $120,000 total."
      ],
      constraints: [
        "14 months of cash savings remaining in the bank ($1.8M).",
        "The current team is 100% focused on consumer marketing and design.",
        "No dedicated corporate sales reps or official security approvals yet."
      ]
    },
    evaluation: {
      summary: {
        coreGoal: "Switch to selling annual corporate plans to reach $5M annual revenue in 18 months.",
        primaryRiskScore: "High",
        keyBlindspotCount: 5
      },
      contextMapping: {
        goal: "Switch to selling annual corporate plans to reach $5M annual revenue in 18 months.",
        availableInfo: [
          "45,000 active individual app users",
          "7.2% monthly customer drop-off rate",
          "3 corporate pilot contracts signed by the founder worth $120,000 total"
        ],
        constraints: [
          "14 months of bank savings left",
          "Team skills are currently 100% consumer-focused",
          "No corporate sales reps or official security approvals yet"
        ]
      },
      blindSpots: [
        {
          category: "Hidden Assumption",
          title: "Expecting New Sales Reps to Close Deals as Fast as the Founder",
          description: "Assuming newly hired sales reps can sell big corporate deals with the same passion and speed as the company founder.",
          severity: "Critical",
          mitigation: "Hire 1 experienced corporate sales rep first to test the sales pitch before hiring a full team."
        },
        {
          category: "Missing Information",
          title: "Not Knowing If Employees Will Actually Use the App",
          description: "Companies buy plans for employees, but if employees don't use it, the company won't renew next year.",
          severity: "Critical",
          mitigation: "Track weekly active user rates in your 3 pilot companies before setting annual contract prices."
        },
        {
          category: "Overlooked Risk",
          title: "Companies Take 6 to 9 Months to Approve Purchases",
          description: "Big company approval processes take 6-9 months, leaving very little safety buffer when you have 14 months of cash left.",
          severity: "Critical",
          mitigation: "Target mid-sized companies (100 to 500 employees) first because they make decisions in 30 days."
        },
        {
          category: "Internal Contradiction",
          title: "Stopping Consumer Ads Too Early Kills Cash Flow",
          description: "Stopping consumer advertising right away cuts off cash before corporate sales contracts pay out.",
          severity: "High",
          mitigation: "Keep the consumer app running automatically to generate cash while building corporate sales."
        },
        {
          category: "Unconsidered Stakeholders",
          title: "Company IT & Security Managers",
          description: "HR managers might love your app, but IT security managers will block it if it lacks single sign-on or security badges.",
          severity: "High",
          mitigation: "Build single sign-on (SSO) login integration and start security compliance checks right away."
        }
      ],
      decisionTwin: {
        bestCase: {
          scenario: "Mid-sized company sales take off. You close 25 company accounts in 12 months, hitting $3.2M revenue and breaking even.",
          probability: "20%"
        },
        realisticCase: {
          scenario: "Deals take 7 months to close. You sign 8 companies ($650,000 revenue) and need a loan at month 11 due to slow payments.",
          probability: "60%"
        },
        worstCase: {
          scenario: "Consumer app revenue drops fast, company buyers delay purchases due to security requirements, and cash runs out at month 13.",
          probability: "20%"
        }
      },
      counterProbes: [
        {
          question: "If this pivot fails in 6 months, did you run out of money waiting for company approvals?",
          rationale: "Highlights the risk of long sales timelines eating up your bank savings."
        },
        {
          question: "What if companies treat employee wellness apps as extra expenses they cut during hard economic times?",
          rationale: "Checks if your product is a must-have or just a nice-to-have."
        },
        {
          question: "What minimum monthly sales pipeline number would prove this shift isn't working by month 5?",
          rationale: "Sets a clear checkpoint to evaluate if the pivot is succeeding."
        }
      ],
      options: [
        {
          name: "Option A: Target Mid-Sized Companies First (Recommended)",
          approach: "Sell to 100-500 employee firms with fast 30-day approval cycles while keeping your consumer app running automatically.",
          tradeOffs: "Slightly smaller deal sizes ($20k-$40k/yr), but much faster decisions and safer cash flow.",
          riskLevel: "Medium"
        },
        {
          name: "Option B: All-In Big Enterprise Pivot",
          approach: "Rebrand completely, stop consumer updates, hire 3 enterprise sales reps, and target Fortune 500 accounts.",
          tradeOffs: "Potential for huge $200k/yr deals, but high risk of running out of money if deals stall.",
          riskLevel: "High"
        },
        {
          name: "Option C: Partner with Existing HR Platforms",
          approach: "List your app inside existing HR software marketplaces (like Gusto or Rippling) to reach companies without a sales team.",
          tradeOffs: "Lower profit margins due to partner revenue splits, but zero sales overhead.",
          riskLevel: "Low"
        }
      ],
      learningLoop: {
        metricsToTrack: [
          "Number of Sales Demos Converted to Signed Deals",
          "Percentage of Company Employees Actively Using the App",
          "Time Taken to Recover Sales Costs"
        ],
        reviewMilestone: "120-Day Sales & Cash Health Check"
      }
    }
  },

  {
    id: "seed-vc-vs-bootstrap",
    title: "Taking $2.5M Investor Money vs Self-Funding Your Project",
    domain: "Financing & Savings",
    description: "Deciding whether to accept $2.5M from investor funding (giving up 25% ownership and a board seat) or stay self-funded with $18,000 monthly income.",
    inputContext: {
      goal: "Decide whether to take $2.5M investor money to hire faster or stay self-funded and grow steadily.",
      availableInfo: [
        "Product currently brings in $18,000 per month with 25% organic monthly growth.",
        "2 co-founders taking modest $4,000/month salaries.",
        "Offer letter: $2.5M investment for 25% company ownership and 1 board seat."
      ],
      constraints: [
        "Competitors raising $5M+ to build larger teams.",
        "Founders want to keep control of product direction.",
        "Offer letter expires in 14 days."
      ]
    },
    evaluation: {
      summary: {
        coreGoal: "Decide whether to take $2.5M investor funding vs stay self-funded with $18k monthly income.",
        primaryRiskScore: "Medium",
        keyBlindspotCount: 4
      },
      contextMapping: {
        goal: "Decide whether to take $2.5M investor funding vs stay self-funded with $18k monthly income.",
        availableInfo: [
          "$18,000 monthly income with 25% organic monthly growth",
          "2 co-founders taking modest salaries",
          "Term sheet for $2.5M for 25% ownership and 1 board seat"
        ],
        constraints: [
          "Competitors raising larger funding rounds",
          "Founders value freedom and decision control",
          "14-day offer expiration window"
        ]
      },
      blindSpots: [
        {
          category: "Hidden Assumption",
          title: "Thinking More Money Automatically Means Faster Work",
          description: "Assuming hiring 5 new people immediately doubles output, ignoring training time, meeting overhead, and management drag.",
          severity: "High",
          mitigation: "Hire just 2 senior developers first for 90 days before expanding further."
        },
        {
          category: "Overlooked Risk",
          title: "Investor Expectations Push You Into Extreme Growth Mode",
          description: "Taking $2.5M forces you into a high-stakes path where selling the business for $30M is considered a failure by investors.",
          severity: "Critical",
          mitigation: "Make sure both founders agree on whether they want a profitable stable business or a high-stakes moonshot before signing."
        },
        {
          category: "Missing Information",
          title: "Not Knowing How Investors Behave During Hard Times",
          description: "You haven't talked to other founders who worked with this investor when sales missed quarterly goals.",
          severity: "High",
          mitigation: "Talk confidentially to 3 founders who previously took money from this specific investor."
        },
        {
          category: "Internal Contradiction",
          title: "Wanting Full Control While Giving Away Board Voting Rights",
          description: "Wanting to keep 100% control over product choices while creating a 3-person board (2 founders, 1 investor) where the investor can block key choices.",
          severity: "Moderate",
          mitigation: "Negotiate board rules so decisions require founder agreement."
        }
      ],
      decisionTwin: {
        bestCase: {
          scenario: "Investor money speeds up development. Monthly revenue grows from $18,000 to $230,000 in 18 months.",
          probability: "25%"
        },
        realisticCase: {
          scenario: "Hiring takes 5 months longer than planned. Monthly revenue hits $90,000, expenses rise, and you need a funding extension.",
          probability: "50%"
        },
        worstCase: {
          scenario: "Board disagreement forces a change in product focus, core users lose interest, and cash runs out in 18 months.",
          probability: "25%"
        }
      },
      counterProbes: [
        {
          question: "If taking this investment causes your business to fail in 2 years, how did having extra money cause it?",
          rationale: "Looks at the danger of spending money too fast before the market is fully ready."
        },
        {
          question: "What if you can grow steadily to $100,000 monthly income without taking any outside investor money?",
          rationale: "Evaluates how strong your self-funded growth path really is."
        },
        {
          question: "What exact term in the offer letter would make you walk away immediately?",
          rationale: "Sets clear boundaries so you don't accept bad governance rules."
        }
      ],
      options: [
        {
          name: "Option A: Accept Funding with Protected Control Rules (Recommended)",
          approach: "Take the $2.5M funding but request changes to board voting rules so founders retain decision control.",
          tradeOffs: "Gives up 25% ownership, but unlocks fast hiring while protecting your control.",
          riskLevel: "Medium"
        },
        {
          name: "Option B: Raise $500,000 from Small Angel Investors",
          approach: "Decline the big investor offer and raise a smaller $500k pool from individual advisors to hire 1 core engineer.",
          tradeOffs: "Slower team growth, but you keep over 90% ownership and total strategic freedom.",
          riskLevel: "Low"
        },
        {
          name: "Option C: Stay 100% Self-Funded",
          approach: "Re-invest 100% of profits, increase founder salaries gradually, and re-evaluate investor offers in 6 months.",
          tradeOffs: "Delays big team expansion, but keeps 100% ownership and maximum flexibility.",
          riskLevel: "Low"
        }
      ],
      learningLoop: {
        metricsToTrack: [
          "Monthly Cash Spending vs New Revenue Generated",
          "Organic User Signups & App Retention Rate",
          "Months of Money Remaining in Bank"
        ],
        reviewMilestone: "6-Month Financial & Growth Check"
      }
    }
  }
];
