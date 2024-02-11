import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"
import { getUserInfo, getUserNumType } from "../api/UserApi";



const useMemberStore = create(
  persist(
    (set) => ({
  userNum : 0,  // 엄마 num
  parentType : null,
  userName : null,
  profileImage : null,
  setUserNum : (num) => set({ userNum: num}),
  setUserName : (name) => set({ userName: name}),
  setParentType : (type) => set({parentType : type}),
  setProfileImage : (img) => set({profileImage : img}),

  babyList : [],
  setBabyList : (babyinfo) => 
    set((prev) => ({
    babyList: [...prev.babyList,babyinfo]
      })),
  familyNum : 0, // 가족 code
  setFamilyNum : (code) => set({ familyNum: code}),
    }),
    {
      name: "member",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)


export const useFcmStore = create(
  persist(
    (set) => ({
      permission : false,
      setPermission : (type) => set({permission:type})
    }),
    {
      name: "push",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useMemberStore


// 유저 정보 저장 함수 
export const setMember = async () => {
  const userInfo = await getUserNumType()
  const babyInfo = await getUserInfo()
  useMemberStore.getState().setUserNum(userInfo.num)
  useMemberStore.getState().setUserName(userInfo.name)
  useMemberStore.getState().setParentType(userInfo.parentType)
  useMemberStore.getState().setProfileImage(userInfo.profileImage)
  useMemberStore.getState().setBabyList(...babyInfo)
}