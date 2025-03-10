import { ObjectId } from "mongodb";
import { Dispatch, SetStateAction } from "react";

export interface ShareModalProps { 
    id?: string | ObjectId, 
    setIsModalOpened: Dispatch<SetStateAction<false | "share" | "delete">> }
