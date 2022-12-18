import { supabase } from "$lib/supabase"

export const addPage = async (storyId: number, background: string) => {
      const { data, error } = await supabase
            .from("pages")
            .insert([{ storyId, background }])

      if (error) {
            throw new Error(error.message)
      } else {
            return data
      }
}