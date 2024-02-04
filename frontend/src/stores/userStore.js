import { create } from "zustand";
import {persist} from "zustand/middleware"


const useMemberStore = create(
  persist(
    (set) => ({
  userNum : 0,
  userName : '',
  setUserNum : (num) => set({ userNum: num}),
  setUserName : (name) => set({ userName: name}),
  babyList : [],
  setBabyList : (babyinfo) => 
    set((prev) => ({
    babyList: [...prev.babyList,babyinfo]
      }))
    }),
    {
      name: "member-store",
      getStorage: () => sessionStorage
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