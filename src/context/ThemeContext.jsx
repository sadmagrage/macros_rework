import { create } from "zustand";

const useTheme = create(set => ({
    darkMode: localStorage.getItem("theme") === "dark",
    toggleTheme: () => set(state => ({ darkMode: !state.darkMode })),
    saveTheme: () => set( state => {
        localStorage.setItem("theme", state.darkMode ? "dark" : "light");
        return { darkMode: state.darkMode };
    })
}));

export default useTheme;