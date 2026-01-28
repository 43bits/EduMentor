// convex/plans.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createStudyPlan = mutation({
  args: {
    userId: v.string(),
    name: v.string(),

    studyPlan: v.object({
      schedule: v.array(v.string()),
      subjects: v.array(
        v.object({
          day: v.string(),
          routines: v.array(
            v.object({
              subName: v.string(),
              completionTarget: v.optional(v.string()),
              priority: v.optional(v.string()),
              duration: v.optional(v.string()),
              description: v.optional(v.string()),
              subTopics: v.optional(v.array(v.string())),
            })
          ),
        })
      ),
    }),

    monthlyFocus: v.array(
      v.object({
        subName: v.string(),
        focus: v.string(),
      })
    ),

    studyTips: v.array(v.string()),
    isActive: v.boolean(),
  },

  handler: async (ctx, args) => {
    const activePlans = await ctx.db
      .query("studyPlans")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    for (const plan of activePlans) {
      await ctx.db.patch(plan._id, { isActive: false });
    }

    const planId = await ctx.db.insert("studyPlans", args);
    return planId;
  },
});


export const getUserStudyPlans = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    console.log("Fetching plans for user:", args.userId);
    const plans = await ctx.db
      .query("studyPlans")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
    console.log("Plans found:", plans.length);
    return plans;
  },
});


/* ---------------- GET ACTIVE STUDY PLAN ---------------- */
// export const getActiveStudyPlan = query({
//   args: {
//     userId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     // Return the active plan for the user (if any)
//     const activePlan = await ctx.db
//       .query("studyPlans")
//       .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
//       .filter((q) => q.eq(q.field("isActive"), true))
//       .first();

//     return activePlan || null;
//   },
// });
