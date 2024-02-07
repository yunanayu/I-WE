import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"


const useRecordStore = create(
  persist(
    (set) => ({
      
    }),
    {
      name: "member",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useRecordStore