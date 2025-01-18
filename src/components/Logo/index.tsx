import { faBrain } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Logo = () => {
    return (
        <div className="text-3xl text-center py-4 flex justify-center gap-2 items-center">
            <h1 className="font-heading ">
                BlogStandart
            </h1>
            <FontAwesomeIcon icon={faBrain} width={30} className="text-2xl text-slate-400" />
        </div>
    )
}