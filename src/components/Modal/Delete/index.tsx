import { DeleteProps } from "./Delete.props";

export default function Delete({ closeFunc, deleteFunc }: DeleteProps) {
    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-3 bg-[#F7F7F7]">
            <>
                <div className="my-2">
                    <p className="text-lg text-black">
                        Are you sure you want to delete this post?
                    </p>
                </div>

                <div className="flex gap-2 w-full">
                    <button
                        className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 rounded-full focus:outline-none font-bold text-base bg-red-600 hover:bg-red-700"
                        onClick={deleteFunc}>
                        DELETE
                    </button>
                    <button
                        onClick={closeFunc}
                        className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 rounded-full focus:outline-none font-bold text-base bg-[#ADADAE] hover:bg-[#4A90E2]">
                            NONE
                        </button>
                </div>
            </>
        </div>

    )
}