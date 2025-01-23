import { IDBPosts } from "@/types/db";
import { WithId } from "mongodb";

export interface ISidebarMainProps {
    posts: WithId<IDBPosts>[]

}