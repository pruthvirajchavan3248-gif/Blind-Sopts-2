/**
 * BLIND SPOT AI - Decision Engine & Live Gemini API Service
 */

export async function analyzeDecision({ goalInput, domain, availableData, constraints, userApiKey, riskProfile = "Balanced" }) {
  const apiKey = userApiKey || import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 5) {
    try {
      const result = await runGeminiInference(goalInput, domain, availableData, constraints, apiKey);
      if (result) return result;
    } catch (err) {
      console.warn("Gemini API inference notice (using local heuristic engine):", err);
    }
  }

  return runLocalSimpleEngine(goalInput, domain, availableData, constraints, riskProfile);
}

function runLocalSimpleEngine(goal, domain = "Business & Strategy", availableInfoRaw = "", constraintsRaw = "", riskProfile = "Balanced") {
  const availableInfo = availableInfoRaw
    ? availableInfoRaw.split('\n').filter(s => s.trim())
    : [
        "Primary goal described by decision maker",
        "Initial budget and team size provided",
        "Current baseline signal"
      ];

  const constraints = constraintsRaw
    ? constraintsRaw.split('\n').filter(s => s.trim())
    : [
        "Time deadline and key milestones",
        "Budget limits",
        "Key tech or compliance boundary"
      ];

  const keywords = (goal + " " + availableInfoRaw + " " + constraintsRaw).toLowerCase();
  const surfacedBlindspots = [];

  // 1. Missing Information
  if (keywords.includes("ai") || keywords.includes("llm") || keywords.includes("model")) {
    surfacedBlindspots.push({
      category: "Missing Information",
      title: "No Data on Speed & Monthly Cloud Costs",
      description: "You haven't measured how fast the AI responds when 100 people use it at once, or how much cloud bills will cost each month.",
      severity: "Critical",
      mitigation: "Run a test with 50 fake users to check response speed and estimate monthly cloud server costs."
    });
  } else if (keywords.includes("app") || keywords.includes("saas") || keywords.includes("customer")) {
    surfacedBlindspots.push({
      category: "Missing Information",
      title: "Not Knowing How Long Customers Stay",
      description: "Without tracking customer churn, you can't accurately know how much money you can afford to spend on ads.",
      severity: "High",
      mitigation: "Track weekly active users and 30-day retention before spending heavily on marketing."
    });
  } else {
    surfacedBlindspots.push({
      category: "Missing Information",
      title: "Relying on Estimates Instead of Real Numbers",
      description: "Key assumptions rely on optimistic guesses rather than actual tested baseline data.",
      severity: "High",
      mitigation: "Do a 2-week small test to collect real data before committing your full budget."
    });
  }

  // 2. Hidden Assumption
  if (keywords.includes("hire") || keywords.includes("team") || keywords.includes("scale")) {
    surfacedBlindspots.push({
      category: "Hidden Assumption",
      title: "Assuming More People Means Faster Work",
      description: "Assuming hiring 5 new people immediately doubles output, ignoring training time and meeting overhead.",
      severity: "Critical",
      mitigation: "Hire 1 or 2 experienced people first before bringing on a larger group."
    });
  } else {
    surfacedBlindspots.push({
      category: "Hidden Assumption",
      title: "Assuming Everything Runs Without Delays",
      description: "Assuming 100% smooth execution with zero partner delays or unexpected roadblocks.",
      severity: "High",
      mitigation: "Add 30% extra buffer time to your schedule for unexpected delays."
    });
  }

  // 3. Overlooked Risks
  surfacedBlindspots.push({
    category: "Overlooked Risk",
    title: "Relying Too Much on a Single Partner or Tool",
    description: "If a key supplier, external app, or critical team member leaves or changes prices, your project could stall.",
    severity: "Critical",
    mitigation: "Set up a backup plan or secondary supplier so you aren't stuck if one tool fails."
  });

  // 4. Internal Contradictions
  if (keywords.includes("fast") || keywords.includes("cheap") || keywords.includes("quality")) {
    surfacedBlindspots.push({
      category: "Internal Contradiction",
      title: "Trying to Be Fast, Cheap, and Perfect All at Once",
      description: "Trying to finish quickly at low cost while demanding high quality usually leads to burnout or broken work.",
      severity: "High",
      mitigation: "Pick 1 main goal (like Speed) and accept a trade-off in another area (like Scope)."
    });
  } else {
    surfacedBlindspots.push({
      category: "Internal Contradiction",
      title: "Big Goals But Short-Term Daily Focus",
      description: "Ambitious long-term goals are set, but daily team tasks aren't aligned with those big goals.",
      severity: "Moderate",
      mitigation: "Set clear 30-day goals that connect directly to your main objective."
    });
  }

  // 5. Unconsidered Stakeholders
  surfacedBlindspots.push({
    category: "Unconsidered Stakeholders",
    title: "Support & Operations Teams Who Handle Daily Work",
    description: "The people who will maintain this work day-to-day haven't been asked how this change affects them.",
    severity: "Moderate",
    mitigation: "Ask the support or maintenance lead to review the plan before launching."
  });

  const isHighRisk = riskProfile === "Aggressive" || surfacedBlindspots.some(b => b.severity === "Critical");
  const riskScore = isHighRisk ? "High" : (riskProfile === "Conservative" ? "Low" : "Medium");

  return {
    summary: {
      coreGoal: goal,
      primaryRiskScore: riskScore,
      keyBlindspotCount: surfacedBlindspots.length
    },
    contextMapping: {
      goal: goal,
      availableInfo: availableInfo.length ? availableInfo : ["Main goal input provided"],
      constraints: constraints.length ? constraints : ["Standard time and budget constraints apply"]
    },
    blindSpots: surfacedBlindspots,
    decisionTwin: {
      bestCase: {
        scenario: "Everything goes smoothly. Your plan finishes 20% faster than expected with great results.",
        probability: riskProfile === "Aggressive" ? "25%" : "20%"
      },
      realisticCase: {
        scenario: "Minor delays pop up in month 2. The timeline moves back slightly, but you hit your main goal.",
        probability: "60%"
      },
      worstCase: {
        scenario: "Unnoticed risks cause cascading delays, costs rise, and you have to pause and rebuild.",
        probability: riskProfile === "Aggressive" ? "15%" : "20%"
      }
    },
    counterProbes: [
      {
        question: "Inversion Test: If this fails completely in 6 months, what single mistake caused it?",
        rationale: "Forces you to spot the biggest danger spot right now before spending money."
      },
      {
        question: "Assumption Stress Test: What will you do if your main assumption turns out to be completely false?",
        rationale: "Tests if your plan has a solid backup option if things change."
      },
      {
        question: "Falsification Vector: What exact metric or result will make you pause or stop this project?",
        rationale: "Gives you a clear rule so you don't keep throwing money at a failing idea."
      }
    ],
    options: [
      {
        name: "Option A: Balanced Step-by-Step Approach (Recommended)",
        approach: "Proceed with your plan, but add 30-day review checkpoints and small safety buffers.",
        tradeOffs: "Takes a little prep time upfront, but stops major disasters.",
        riskLevel: "Medium"
      },
      {
        name: "Option B: Low-Risk Pilot Test",
        approach: "Test a smaller version of your idea for 30 days first to prove it works before spending big.",
        tradeOffs: "Slower start, but protects your money if the idea needs tweaking.",
        riskLevel: "Low"
      },
      {
        name: "Option C: Fast High-Reward Launch",
        approach: "Go all-in immediately with extra resources to get ahead of competitors quickly.",
        tradeOffs: "Fastest potential payout, but highest risk if things go wrong.",
        riskLevel: "High"
      }
    ],
    learningLoop: {
      metricsToTrack: [
        "Time Taken vs Planned Schedule",
        "Money Spent vs Value Created",
        "How Well You Fixed Identified Risks"
      ],
      reviewMilestone: "60-Day Progress Checkpoint"
    }
  };
}

async function runGeminiInference(goal, domain, availableData, constraints, apiKey) {
  const promptText = `
You are "Blind Spot AI", a Decision Assistant. Use simple, clear, plain-English language.
Analyze this decision input:
Goal: ${goal}
Domain: ${domain}
Available Data: ${availableData}
Constraints: ${constraints}

Output valid JSON matching this exact structure:
{
  "summary": {
    "coreGoal": "string",
    "primaryRiskScore": "High | Medium | Low",
    "keyBlindspotCount": 5
  },
  "contextMapping": {
    "goal": "string",
    "availableInfo": ["string"],
    "constraints": ["string"]
  },
  "blindSpots": [
    {
      "category": "Missing Information | Hidden Assumption | Overlooked Risk | Contradiction | Unconsidered Stakeholders",
      "title": "string",
      "description": "string",
      "severity": "Critical | High | Moderate",
      "mitigation": "string"
    }
  ],
  "decisionTwin": {
    "bestCase": { "scenario": "string", "probability": "string" },
    "realisticCase": { "scenario": "string", "probability": "string" },
    "worstCase": { "scenario": "string", "probability": "string" }
  },
  "counterProbes": [
    {
      "question": "string",
      "rationale": "string"
    }
  ],
  "options": [
    {
      "name": "string",
      "approach": "string",
      "tradeOffs": "string",
      "riskLevel": "Low | Medium | High"
    }
  ],
  "learningLoop": {
    "metricsToTrack": ["string"],
    "reviewMilestone": "string"
  }
}
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }]
    })
  });

  if (!response.ok) throw new Error(`Gemini API HTTP Error ${response.status}`);
  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const cleanedText = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleanedText);
}
