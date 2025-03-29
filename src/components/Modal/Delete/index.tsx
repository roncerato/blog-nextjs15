import { DeleteProps } from "./Delete.props";

export default function Delete({ closeFunc, deleteFunc }: DeleteProps) {
    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-3 bg-[#F7F7F7]">


            <h2 className="text-lg font-bold text-black text-center">
                Are you sure?
            </h2>

            <p className="text-sm text-black text-center">
                This action is irreversible. Once deleted, you will not be able to recover this post.
            </p>


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

        </div>

    )
}