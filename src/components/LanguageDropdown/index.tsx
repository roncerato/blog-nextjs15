import { useLocale } from "next-intl";
import { useState, useTransition } from "react";
import { routing } from "@/i18n/routing";
import { Icons } from "@/assets/Icons";
import { usePathname } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export default function LanguageDropdown({ }) {
    const { locales } = routing;
    const locale = useLocale()
    const [language, setLanguage] = useState(locale);
    const [isOpened, setIsOpened] = useState(false);
    const pathname = usePathname()
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const ref = useOutsideClick(() => setIsOpened(false));
    const changeLng = (item: string) => {
        setIsOpened(false)
        setLanguage(item)
        startTransition(() => {
            router.replace(`/${item}/${pathname}`)
        })
    }
    return (
        <>
            <div className="col-start-1 col-end-3 row-start-1 row-end-2 justify-self-end" >
                <div ref={ref} className="relative" >
                    {isPending ? <Loading /> :
                        <button className={`flex items-center cursor-pointer px-2 py-1 rounded-md`} onClick={() => setIsOpened(prev => !prev)}>
                            <span className="uppercase font-bold">
                                {language === "ru" ? "ру" : language}
                            </span>
                            <Icons.ChevronDown width={10} className={`self-center ml-2 ${isOpened ? "rotate-180" : "rotate-0"}`} />
                        </button>}
                    <ul>
                        {
                            isOpened && (
                                <div className=" bg-[#F7F7F7] w-full rounded-md border-[1px] border-[#e5e7eb] mt-1 overflow-hidden absolute">
                                    {
                                        locales.map((item) => (
                                            <li key={item} className="hover:bg-gray-100 cursor-pointer text-center uppercase  w-full">
                                                <button
                                                    disabled={item === language}
                                                    className={`uppercase p-1 font-medium w-full disabled:bg-[#4A90E2] disabled:text-white disabled:cursor-not-allowed`}
                                                    onClick={() => changeLng(item)}>
                                                    {item === 'ru' ? 'ру' : item}
                                                </button>
                                            </li>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </ul>
                </div>

            </div>

        </>

    )
}