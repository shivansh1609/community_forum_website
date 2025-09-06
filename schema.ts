import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.id("users"),
    category: v.string(),
    upvotes: v.number(),
    downvotes: v.number(),
    commentCount: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_author", ["authorId"]),

  comments: defineTable({
    postId: v.id("posts"),
    content: v.string(),
    authorId: v.id("users"),
    parentCommentId: v.optional(v.id("comments")),
    upvotes: v.number(),
    downvotes: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_author", ["authorId"])
    .index("by_parent", ["parentCommentId"]),

  votes: defineTable({
    userId: v.id("users"),
    targetId: v.union(v.id("posts"), v.id("comments")),
    targetType: v.union(v.literal("post"), v.literal("comment")),
    voteType: v.union(v.literal("upvote"), v.literal("downvote")),
  })
    .index("by_user_and_target", ["userId", "targetId"])
    .index("by_target", ["targetId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
