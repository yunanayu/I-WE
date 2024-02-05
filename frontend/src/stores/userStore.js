import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"


const useMemberStore = create(
  persist(
    (set) => ({
  userNum : 0,  // 엄마 num
  setUserNum : (num) => set({ userNum: num}),
  babyList : [],
  setBabyList : (babyinfo) => 
    set((prev) => ({
    babyList: [...prev.babyList,babyinfo]
      }))
    }),
    {
      name: "member",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useMemberStore