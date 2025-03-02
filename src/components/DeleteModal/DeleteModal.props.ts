import { Dispatch, SetStateAction } from "react";

export interface DeleteModalProps {
    deleteFunc: () => void,
    setIsModalOpened: Dispatch<SetStateAction<false | "share" | "delete">>
}