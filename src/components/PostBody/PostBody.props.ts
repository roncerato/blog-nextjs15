import { IDBPost } from "@/types/db";
import { WithId } from "mongodb";

export interface PostBodyProps {
    post: WithId<IDBPost>
    showDownloadBtn?: boolean
}