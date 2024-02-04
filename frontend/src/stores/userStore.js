import { create } from "zustand";

const useMemberStore = create((set) => ({
  userNum : 0,
  userName : '',
  setUserNum : (num) => set({ userNum: num}),
  setUserName : (name) => set({ userName: name}),
}))

export default useMemberStore