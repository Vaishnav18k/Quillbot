import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    savedCollection: defineTable({
        original: v.string(),
        paraphrased: v.string(),
        style: v.string(),
        timestamp: v.number(),
    }).index("by_timestamp", ["timestamp"])
})