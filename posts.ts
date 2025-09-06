import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let posts;
    
    if (args.category) {
      posts = await ctx.db
        .query("posts")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .order("desc")
        .take(50);
    } else {
      posts = await ctx.db
        .query("posts")
        .order("desc")
        .take(50);
    }
    
    // Get author information for each post
    const postsWithAuthors = await Promise.all(
      posts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        return {
          ...post,
          author: author ? { name: author.name, email: author.email } : null,
        };
      })
    );
    
    return postsWithAuthors;
  },
});

export const get = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (!post) return null;
    
    const author = await ctx.db.get(post.authorId);
    return {
      ...post,
      author: author ? { name: author.name, email: author.email } : null,
    };
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to create a post");
    }
    
    return await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      category: args.category,
      authorId: userId,
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
    });
  },
});

export const vote = mutation({
  args: {
    postId: v.id("posts"),
    voteType: v.union(v.literal("upvote"), v.literal("downvote")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to vote");
    }
    
    // Check if user already voted on this post
    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_user_and_target", (q) => 
        q.eq("userId", userId).eq("targetId", args.postId)
      )
      .first();
    
    const post = await ctx.db.get(args.postId);
    if (!post) throw new Error("Post not found");
    
    if (existingVote) {
      // Remove existing vote
      await ctx.db.delete(existingVote._id);
      
      // Update post vote counts
      if (existingVote.voteType === "upvote") {
        await ctx.db.patch(args.postId, { upvotes: post.upvotes - 1 });
      } else {
        await ctx.db.patch(args.postId, { downvotes: post.downvotes - 1 });
      }
      
      // If same vote type, just remove it
      if (existingVote.voteType === args.voteType) {
        return;
      }
    }
    
    // Add new vote
    await ctx.db.insert("votes", {
      userId,
      targetId: args.postId,
      targetType: "post",
      voteType: args.voteType,
    });
    
    // Update post vote counts
    const updatedPost = await ctx.db.get(args.postId);
    if (!updatedPost) return;
    
    if (args.voteType === "upvote") {
      await ctx.db.patch(args.postId, { upvotes: updatedPost.upvotes + 1 });
    } else {
      await ctx.db.patch(args.postId, { downvotes: updatedPost.downvotes + 1 });
    }
  },
});

export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    const categories = [...new Set(posts.map(post => post.category))];
    return categories.sort();
  },
});
