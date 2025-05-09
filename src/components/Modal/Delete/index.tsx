import { useTranslations } from "next-intl";
import { DeleteProps } from "./Delete.props";

export default function Delete({ closeFunc, deleteFunc }: DeleteProps) {
    const t = useTranslations('modal.post.delete');
    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-3 bg-[#F7F7F7]">


            <h2 className="text-lg font-bold text-black text-center">
                {t("title")}
            </h2>

            <p className="text-sm text-black text-center">
                {t("desc")}
            </p>


            <div className="flex gap-2 w-full">
                <button
                    className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 rounded-full focus:outline-none font-bold text-base bg-red-600 hover:bg-red-700 uppercase"
                    onClick={deleteFunc}>
                    {t("text")}
                </button>
                <button
                    onClick={closeFunc}
                    className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 rounded-full focus:outline-none font-bold text-base bg-[#ADADAE] hover:bg-[#4A90E2]">
                    {t("option_none")}
                </button>
            </div>

        </div>

    )
}