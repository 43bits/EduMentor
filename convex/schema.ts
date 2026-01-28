// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  studyPlans: defineTable({
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
  })
    .index("by_user_id", ["userId"])
    .index("by_active", ["isActive"]),
});
