import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"


const useMemberStore = create(
  persist(
    (set) => ({
  userNum : 0,  // 엄마 num
  // userName : '',
  setUserNum : (num) => set({ userNum: num}),
  // setUserName : (name) => set({ userName: name}),
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

const babyInfoStore = create((set) => ({
  babyList : [ ],
  setBabyList : (babyinfo) => 
    set((prev) => ({
    babyList: [...prev.babyList,babyinfo]
  }))
}))

// const useMemberStore = create(
//   persist
//   (set) => ({
//   userNum : 0,
//   userName : '',
//   setUserNum : (num) => set({ userNum: num}),
//   setUserName : (name) => set({ userName: name}),
//   babyList : [],
//   setBabyList : (babyinfo) => 
//     set((prev) => ({
//     babyList: [...prev.babyList,babyinfo]
//   }))
// }))
export default useMemberStore