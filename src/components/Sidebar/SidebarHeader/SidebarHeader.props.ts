import { Dispatch, SetStateAction } from "react";
export interface SidebarHeaderProps {
    isMenuOpened: boolean;
    setIsMenuOpened: Dispatch<SetStateAction<boolean>>
    device?: 'mobile' | 'desktop'
}