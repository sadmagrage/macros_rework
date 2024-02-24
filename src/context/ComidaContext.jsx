import { create } from "zustand";

const useComida = create(set => ({
    comidaFetch: [],
    setComidaFetch: param => set(() => ({ comidaFetch: param })),
    alreadyFetched: false,
    setAlreadyFetched: () => set(state => ({ alreadyFetched: !state.alreadyFetched })),
}));

export default useComida;