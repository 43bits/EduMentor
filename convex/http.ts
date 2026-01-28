import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
const http = httpRouter();



http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("No svix headers found", {
        status: 400,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occurred", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, first_name, last_name, image_url, email_addresses } = evt.data;

      const email = email_addresses[0].email_address;

      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.syncUser, {
          email,
          name,
          image: image_url,
          clerkId: id,
        });
      } catch (error) {
        console.log("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    if (eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.updateUser, {
          clerkId: id,
          email,
          name,
          image: image_url,
        });
      } catch (error) {
        console.log("Error updating user:", error);
        return new Response("Error updating user", { status: 500 });
      }
    }

    return new Response("Webhooks processed successfully", { status: 200 });
  }),
});

/* ---------------- VALIDATION ---------------- */

function validateStudyPlan(plan: any) {
  return {
    schedule: plan.schedule,
    subjects: plan.subjects.map((s: any) => ({
      day: s.day,
      routines: s.routines.map((r: any) => ({
        subName: r.subName,
        completionTarget: r.completionTarget ?? null,
        priority: ["High", "Medium", "Low"].includes(r.priority)
          ? r.priority
          : "Medium",
        duration: r.duration ?? null,
        description: r.description ?? null,
        subTopics: Array.isArray(r.subTopics) ? r.subTopics : null,
      })),
    })),
  };
}


function buildMonthlyFocus(
  subjects: any[],
  fallback?: string
) {
  const map = new Map<string, string>();

  for (const day of subjects) {
    for (const r of day.routines ?? []) {
      if (!map.has(r.subName)) {
        map.set(
          r.subName,
          ["High", "Medium", "Low"].includes(r.priority)
            ? r.priority
            : fallback ?? "Medium"
        );
      }
    }
  }

  return Array.from(map.entries()).map(([subName, focus]) => ({
    subName,
    focus,
  }));
}

/* ---------------- MAIN ROUTE ---------------- */

http.route({
  path: "/vapi/generate-program",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const payload = await request.json();

      const {
        user_id,
        education_level,
        study_days,
        daily_study_hours,
        primary_goal,
        subjects,
        difficulty_level,
        monthly_focus,
      } = payload;

      /* ---------------- PROMPT ---------------- */

//       const prompt = `
// You are an expert academic planner.

// Student name: ${full_name}
// Education level: ${education_level}
// Study days: ${study_days}
// Daily study hours: ${daily_study_hours}
// Primary goal: ${primary_goal}
// Subjects: ${subjects}
// Difficulty level: ${difficulty_level}
// Monthly focus areas: ${monthly_focus}

// STRICT RULES:
// - Output ONLY valid JSON
// - NO markdown
// - NO explanation
// - Days capitalized
// - Priority = High | Medium | Low
// - Use null if unknown

// RETURN EXACT JSON:
// {
//   "schedule": ["Monday", "Tuesday"],
//   "subjects": [
//     {
//       "day": "Monday",
//       "routines": [
//         {
//           "subName": "Math",
//           "completionTarget": "Finish Chapter 1",
//           "priority": "High",
//           "duration": "2 hours",
//           "description": "Practice problems",
//           "subTopics": ["Algebra"]
//         }
//       ]
//     }
//   ]
// }
// `;
// Student name: ${full_name}

const prompt = `
You are an expert academic planner.

Education level: ${education_level}
first aske number of sujects then ask for the subjects with their subject name and difficulty level (easy, medium, hard) one by one. 
Subjects (JSON array, DO NOT MODIFY):
${subjects}

Study days per week: ${study_days}
Daily study hours: ${daily_study_hours}
Primary goal: ${primary_goal}


Monthly focus areas: ${monthly_focus}

STRICT RULES:
- Output ONLY valid JSON
- NO markdown
- NO explanations
- NO extra keys
- Days MUST be capitalized (Monday, Tuesday, etc.)
- Priority MUST be one of: High | Medium | Low
- Use null if information is missing
- Every subject MUST appear in the schedule at least once
- Respect each subject's difficulty when assigning priority and duration
- Total daily study time MUST NOT exceed daily_study_hours
- Spread subjects across available study days logically

RETURN EXACT JSON FORMAT:
{
  "schedule": ["Monday", "Tuesday"],
  "subjects": [
    {
      "day": "Monday",
      "routines": [
        {
          "subName": "Math",
          "completionTarget": "Finish Chapter 1",
          "priority": "High",
          "duration": "2 hours",
          "description": "Practice problems",
          "subTopics": ["Algebra"]
        }
      ]
    }
  ]
}
`;


      /* ---------------- PERPLEXITY CALL ---------------- */

      const aiResponse = await fetch(
        "https://api.perplexity.ai/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "sonar-pro",
            temperature: 0.2,
            messages: [
              {
                role: "system",
                content:
                  "You are a strict JSON generator. Respond ONLY with valid JSON.",
              },
              { role: "user", content: prompt },
            ],
          }),
        }
      );

      if (!aiResponse.ok) {
        const err = await aiResponse.text();
        throw new Error(`Perplexity API error: ${err}`);
      }

      const aiJson = await aiResponse.json();
      console.log("Perplexity raw response:", JSON.stringify(aiJson, null, 2));

      /* ---------------- SAFE EXTRACTION ---------------- */

      if (
        !aiJson ||
        !Array.isArray(aiJson.choices) ||
        aiJson.choices.length === 0 ||
        !aiJson.choices[0].message?.content
      ) {
        throw new Error("Invalid AI response structure from Perplexity");
      }

      const rawText = aiJson.choices[0].message.content.trim();

      let studyPlan;
      try {
        studyPlan = validateStudyPlan(JSON.parse(rawText));
      } catch (e) {
        console.error("JSON parse failed. Raw AI output:", rawText);
        throw new Error("AI returned invalid JSON");
      }

      /* ---------------- SAVE TO CONVEX ---------------- */

      const planId = await ctx.runMutation(api.plans.createStudyPlan, {
  userId: user_id,
  name: `${primary_goal} Study Plan`,
  studyPlan,
  monthlyFocus: buildMonthlyFocus(
    studyPlan.subjects,
    difficulty_level
  ),
  studyTips: [
    "Review daily",
    "Use active recall",
    "Revise weekly",
  ],
  isActive: true,
});


      return new Response(
        
        JSON.stringify({
          success: true,
          data: { planId, studyPlan },
        }),
        { status: 200 }
        
      );
    } catch (error) {
      console.error("Study plan generation error:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }),
        { status: 500 }
      );
    }
  }),
});

export default http;
