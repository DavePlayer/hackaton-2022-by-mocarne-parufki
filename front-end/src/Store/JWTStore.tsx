import create from "zustand"

interface JWTStore {
    jwt: string,
    setJWT: (newtoken: string) => void
    removeJWT: () => void
}
const useJWTStore = create<JWTStore>((set) => ({
  jwt: "",
  setJWT: (newToken: string) => set((state) => ({ jwt: newToken })),
  removeJWT: () => set(() => ({ jwt: ""}))
}))

export default useJWTStore