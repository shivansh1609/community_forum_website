import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const listByPost = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .order("asc")
      .collect();
    
    // Get author information for each comment
    const commentsWithAuthors = await Promise.all(
      comments.map(async (comment) => {
        const author = await ctx.db.get(comment.authorId);
        return {
          ...comment,
          author: author ? { name: author.name, email: author.email } : null,
        };
      })
    );
    
    return commentsWithAuthors;
  },
});

export const create = mutation({
  args: {
    postId: v.id("posts"),
    content: v.string(),
    parentCommentId: v.optional(v.id("comments")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to comment");
    }
    
    const commentId = await ctx.db.insert("comments", {
      postId: args.postId,
      content: args.content,
      authorId: userId,
      parentCommentId: args.parentCommentId,
      upvotes: 0,
      downvotes: 0,
    });
    
    // Update post comment count
    const post = await ctx.db.get(args.postId);
    if (post) {
      await ctx.db.patch(args.postId, { 
        commentCount: post.commentCount + 1 
      });
    }
    
    return commentId;
  },
});

export const vote = mutation({
  args: {
    commentId: v.id("comments"),
    voteType: v.union(v.literal("upvote"), v.literal("downvote")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to vote");
    }
    
    // Check if user already voted on this comment
    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_user_and_target", (q) => 
        q.eq("userId", userId).eq("targetId", args.commentId)
      )
      .first();
    
    const comment = await ctx.db.get(args.commentId);
    if (!comment) throw new Error("Comment not found");
    
    if (existingVote) {
      // Remove existing vote
      await ctx.db.delete(existingVote._id);
      
      // Update comment vote counts
      if (existingVote.voteType === "upvote") {
        await ctx.db.patch(args.commentId, { upvotes: comment.upvotes - 1 });
      } else {
        await ctx.db.patch(args.commentId, { downvotes: comment.downvotes - 1 });
      }
      
      // If same vote type, just remove it
      if (existingVote.voteType === args.voteType) {
        return;
      }
    }
    
    // Add new vote
    await ctx.db.insert("votes", {
      userId,
      targetId: args.commentId,
      targetType: "comment",
      voteType: args.voteType,
    });
    
    // Update comment vote counts
    const updatedComment = await ctx.db.get(args.commentId);
    if (!updatedComment) return;
    
    if (args.voteType === "upvote") {
      await ctx.db.patch(args.commentId, { upvotes: updatedComment.upvotes + 1 });
    } else {
      await ctx.db.patch(args.commentId, { downvotes: updatedComment.downvotes + 1 });
    }
  },
});
