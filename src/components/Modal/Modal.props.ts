import { ObjectId } from "mongodb";

export interface ModalProps {
    id: string | ObjectId;
    closeFunc: () => void;
    modalType: "delete" | "share" | undefined;
    deleteFunc: () => void;
    isPostShared?: boolean;
}