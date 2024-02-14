import { create } from "zustand";

const useActiveMenu = create(set => ({
    activeMenu: false,
    setActiveMenu: parameter => set(() => ({ activeMenu: parameter }))
}));

export default useActiveMenu;