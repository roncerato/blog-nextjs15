import { IDBPost } from "@/types/db";
import { WithId } from "mongodb";

export interface IPostClientProps {
    post: WithId<IDBPost>
}