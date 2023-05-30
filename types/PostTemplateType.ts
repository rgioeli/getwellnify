import { Post, User } from "@prisma/client";

export interface PostTemplateType {
  post: Post & { user: User };
}
