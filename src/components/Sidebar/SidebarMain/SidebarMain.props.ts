import { IDBPost } from "@/types/db";
import { WithId } from "mongodb";

export interface ISidebarMainProps {
    posts: WithId<IDBPost>[]

}