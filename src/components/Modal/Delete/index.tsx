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
                        className="btn w-full p-2 bg-red-600 flex-auto"
                        onClick={deleteFunc}>
                        DELETE
                    </button>
                    <button
                        onClick={closeFunc}
                        className="btn w-full bg-slate-400 p-2 flex-auto">NONE</button>
                </div>
            </>
        </div>

    )
}