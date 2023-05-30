export type CommentType = {
  id: string;
  content: string;
  channel: string;
  createdAt: Date;
  user: {
    select: {
      id: string;
      image: string;
      username: string;
    };
  };
  childComments: any[];
  likesCount: number | 0;
  replyCount: number | 0;
};
