import { JSX } from "react";
import { DeleteModalProps } from "./DeleteModal.props";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function DeleteModal({ deleteFunc, setIsModalOpened }: DeleteModalProps): JSX.Element {
    return (

        <div className="absolute top-0 left-0 w-full h-full bg-black/35 rounded-sm z-50 grid grid-cols-[300px,1fr]">
            <div />
            <div className="flex items-center justify-center">
                <div className="p-3 w-[400px] bg-[#F7F7F7] rounded-lg flex justify-between flex-col">
                    <div className="flex justify-end">
                        <button onClick={() => setIsModalOpened(false)}>
                            <FontAwesomeIcon icon={faClose} color="black" />
                        </button>
                    </div>

                    <div className="flex flex-col flex-1 justify-center items-center gap-3 bg-[#F7F7F7]">
                        <>
                            <div className="my-2">
                                <p className="text-lg text-black">
                                    Are you sure you want to delete this post?
                                </p>
                            </div>

                            <div className="flex gap-2 w-full">
                                <button
                                    className="btn w-full p-2 bg-red-600 flex-auto"
                                    onClick={deleteFunc}>
                                    DELETE
                                </button>
                                <button
                                    onClick={() => setIsModalOpened(false)}
                                    className="btn w-full bg-slate-400 p-2 flex-auto">NONE</button>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </div>

    )
}