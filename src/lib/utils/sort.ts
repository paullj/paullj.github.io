interface PostSort {
  viewCount: number;
  reactions: number;
  comments: number;
  publishedAt: number;
}

type SortFunction = (a: PostSort, b: PostSort) => number;

export const byViews: SortFunction = (a, b) => b.viewCount - a.viewCount;
export const byReaction: SortFunction = (a, b) => b.reactions - a.reactions;
export const byComments: SortFunction = (a, b) => b.comments - a.comments;
export const byOldest: SortFunction = (a, b) => a.publishedAt - b.publishedAt;
export const byNewest: SortFunction = (a, b) => b.publishedAt - a.publishedAt;
