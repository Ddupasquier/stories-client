export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      elements: {
        Row: {
          color: string | null
          elementName: string
          flip: boolean
          id: number
          pageId: number
          rotate: number | null
          size: number
          text: string | null
          type: string
          x: number
          y: number
          zIndex: number
        }
        Insert: {
          color?: string | null
          elementName: string
          flip?: boolean
          id?: number
          pageId: number
          rotate?: number | null
          size: number
          text?: string | null
          type: string
          x: number
          y: number
          zIndex: number
        }
        Update: {
          color?: string | null
          elementName?: string
          flip?: boolean
          id?: number
          pageId?: number
          rotate?: number | null
          size?: number
          text?: string | null
          type?: string
          x?: number
          y?: number
          zIndex?: number
        }
      }
      likes: {
        Row: {
          created_at: string | null
          id: number
          profileId: string
          storyId: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          profileId: string
          storyId: number
        }
        Update: {
          created_at?: string | null
          id?: number
          profileId?: string
          storyId?: number
        }
      }
      pages: {
        Row: {
          background: string
          createdAt: string
          id: number
          pageNumber: number
          screenshot: string | null
          storyId: number
          updatedAt: string | null
        }
        Insert: {
          background: string
          createdAt?: string
          id?: number
          pageNumber: number
          screenshot?: string | null
          storyId: number
          updatedAt?: string | null
        }
        Update: {
          background?: string
          createdAt?: string
          id?: number
          pageNumber?: number
          screenshot?: string | null
          storyId?: number
          updatedAt?: string | null
        }
      }
      profiles: {
        Row: {
          avatarUrl: string | null
          createdAt: string
          fullName: string | null
          id: string
          updatedAt: string
          username: string | null
        }
        Insert: {
          avatarUrl?: string | null
          createdAt?: string
          fullName?: string | null
          id?: string
          updatedAt: string
          username?: string | null
        }
        Update: {
          avatarUrl?: string | null
          createdAt?: string
          fullName?: string | null
          id?: string
          updatedAt?: string
          username?: string | null
        }
      }
      stories: {
        Row: {
          author: string
          createdAt: string
          id: number
          isPublic: boolean
          likes: number
          profileId: string
          title: string
          updatedAt: string
        }
        Insert: {
          author: string
          createdAt?: string
          id?: number
          isPublic?: boolean
          likes?: number
          profileId: string
          title: string
          updatedAt: string
        }
        Update: {
          author?: string
          createdAt?: string
          id?: number
          isPublic?: boolean
          likes?: number
          profileId?: string
          title?: string
          updatedAt?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
