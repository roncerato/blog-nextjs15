import { ObjectId } from "mongodb";

export interface ShareProps {
    id: string | ObjectId;
    closeFunc: () => void;
    isPostShared?: boolean;
} 