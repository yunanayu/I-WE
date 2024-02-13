import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"
import { getUserInfo, getUserNumType } from "../api/UserApi";



const useMemberStore = create(
  persist(
    (set) => ({
  userNum : 0,  // 엄마 num
  parentType : null,
  setUserNum : (num) => set({ userNum: num}),
  setParentType : (type) => set({parentType : type}),
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
      token : '',
      setPermission : (type) => set({permission:type}),
      setToken : (token) => set({token:token})
    }),
    {
      name: "push",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export const useBabyStore = create(
  persist(
    (set) => ({
      bornbabyList :[],
      setBornBabyList : () => set((state) => ({ bornbabyList: state.babyList.filter((baby) => baby.birth !== null) })),
    }),
    {
      name: "baby",
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
  useMemberStore.getState().setParentType(userInfo.parentType)
  useMemberStore.getState().setBabyList(...babyInfo)
}

