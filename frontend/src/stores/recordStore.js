import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"


const useRecordStore = create(
  persist(
    (set) => ({
      momRecord : [],
      babyRecord : [],
      setMomRecord : (record) => set( {momRecord:record}),
      setBabyRecord : (record) => set( {babyRecord:record})
    }),
    {
      name: "record",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useRecordStore