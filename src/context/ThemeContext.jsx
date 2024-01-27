import { create } from "zustand";

const useTheme = create(set => ({
    darkMode: false,
    toggleTheme: () => set(state => ({ darkMode: !state.darkMode }))
}));

export default useTheme;