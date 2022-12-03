import create from "zustand"

interface JWTStore {
    userId: string,
    setuserId: (newtoken: string) => void
    removeUserId: () => void
}
const userIdStore = create<JWTStore>((set) => ({
  userId: "",
  setuserId: (newToken: string) => set((state) => ({ userId: newToken })),
  removeUserId: () => set(() => ({ userId: ""}))
}))

export default userIdStore