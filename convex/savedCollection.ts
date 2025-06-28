import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save a paraphrased collection item
export const saveCollection = mutation({
  args: {
    original: v.string(),
    paraphrased: v.string(),
    style: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("savedCollection", {
      original: args.original,
      paraphrased: args.paraphrased,
      style: args.style,
      timestamp: args.timestamp,
    });
  },
});

// Delete all saved paraphrases
export const deleteAll = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("savedCollection").collect();
    for (const item of all) {
      await ctx.db.delete(item._id);
    }
  },
});

// Delete most recent (LIFO)
export const deleteLIFO = mutation({
  args: {},
  handler: async (ctx) => {
    const last = await ctx.db
      .query("savedCollection")
      .withIndex("by_timestamp")
      .order("desc")
      .first();
    if (last) await ctx.db.delete(last._id);
  },
});

// Delete any saved collection by id
export const deleteById = mutation({
  args: { id: v.id("savedCollection") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Get all saved collections, optionally filtered by style
export const getAll = query({
  args: {
    style: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("savedCollection");
    if (args.style) {
      q = q.filter(q => q.eq(q.field("style"), args.style));
    }
    return await q.collect();
  },
});

