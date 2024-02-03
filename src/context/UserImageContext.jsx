import { create } from "zustand";

const useUserImage = create(set => ({
    userImage: "",
    setUserImage: newImage => set({ userImage: newImage })
}));

export default useUserImage;