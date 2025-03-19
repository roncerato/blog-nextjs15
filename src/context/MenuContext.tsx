"use client";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";


interface MenuContextType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}


const MenuContext = createContext<MenuContextType | undefined>(undefined);


export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <MenuContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu должен быть использован внутри MenuProvider");
    }
    return context;
};
