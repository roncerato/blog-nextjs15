"use client"
import { JSX } from "react";
import { ModalProps } from "./Modal.props";
import { createPortal } from "react-dom";
import Delete from "./Delete";
import Share from "./Share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export default function Modal({ id, closeFunc, modalType, deleteFunc, isPostShared }: ModalProps): JSX.Element {
    const ref = useOutsideClick(() => closeFunc());
    return createPortal(
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center z-50 ">
            <div className="flex items-center justify-center" ref={ref}>
                <div className="p-3 w-[400px] bg-[#F7F7F7] rounded-lg flex justify-between flex-col shadow-lg shadow-black/25">
                    <div className="flex justify-end">
                        <button onClick={closeFunc}>
                            <FontAwesomeIcon icon={faClose} color="black" />
                        </button>
                    </div>
                    {
                        modalType === "delete" && <Delete closeFunc={closeFunc} deleteFunc={deleteFunc} />
                    }
                    {
                        modalType === "share" && <Share id={id} closeFunc={closeFunc} isPostShared={isPostShared} />
                    }
                </div>
            </div>
        </div>, document.body
    )
}

