import { IDBPost } from "@/types/db";
import { WithId } from "mongodb";

export interface IPostsListItemProps {
    selectedPostId: string | null;
    sharedPostId: string | null;
    post: WithId<IDBPost>;
    device: "mobile" | "desktop";
}