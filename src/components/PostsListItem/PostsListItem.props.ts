import { IDBPost } from "@/types/db";
import { WithId } from "mongodb";

export interface IPostsListItemProps {
    postId: string | null;
    post: WithId<IDBPost>;
}