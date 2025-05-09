"use client";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";


interface MenuContextType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isMobileOpen: boolean;
    setIsMobileOpen: Dispatch<SetStateAction<boolean>>;
}


const MenuContext = createContext<MenuContextType | undefined>(undefined);


export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpenState] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("sidebar-open");
        if (stored !== null) {
            setIsOpenState(stored === "true");
        }
        setHydrated(true);
    }, []);

    const setIsOpen = (value: SetStateAction<boolean>) => {
        setIsOpenState((prev) => {
            const next = typeof value === "function" ? value(prev) : value;
            localStorage.setItem("sidebar-open", next.toString());
            return next;
        });
    };

    return (
        <MenuContext.Provider value={{ isOpen, setIsOpen, isMobileOpen, setIsMobileOpen }}>
            {hydrated ? children : null}
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
