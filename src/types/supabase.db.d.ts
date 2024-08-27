export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      buyers: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: number
          name: string
          phone: string | null
          thumb_hash: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name: string
          phone?: string | null
          thumb_hash?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string
          phone?: string | null
          thumb_hash?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      draws: {
        Row: {
          created_at: string | null
          drawn_at: string | null
          id: number
          lottery_id: number
          name: string
          updated_at: string | null
          winning_number: string | null
        }
        Insert: {
          created_at?: string | null
          drawn_at?: string | null
          id?: number
          lottery_id: number
          name: string
          updated_at?: string | null
          winning_number?: string | null
        }
        Update: {
          created_at?: string | null
          drawn_at?: string | null
          id?: number
          lottery_id?: number
          name?: string
          updated_at?: string | null
          winning_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "draws_lottery_id_fkey"
            columns: ["lottery_id"]
            isOneToOne: false
            referencedRelation: "lotteries"
            referencedColumns: ["id"]
          },
        ]
      }
      lotteries: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          image_path: string | null
          name: string
          thumb_hash: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          image_path?: string | null
          name: string
          thumb_hash?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          image_path?: string | null
          name?: string
          thumb_hash?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      prizes: {
        Row: {
          created_at: string | null
          id: number
          image_path: string | null
          name: string
          prize_value: number | null
          raffle_id: number
          thumb_hash: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          image_path?: string | null
          name: string
          prize_value?: number | null
          raffle_id: number
          thumb_hash?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          image_path?: string | null
          name?: string
          prize_value?: number | null
          raffle_id?: number
          thumb_hash?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prizes_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffle_stats"
            referencedColumns: ["raffle_id"]
          },
          {
            foreignKeyName: "prizes_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prizes_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "sellers_with_tickets_count_by_raffle"
            referencedColumns: ["raffle_id"]
          },
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          image_path: string | null
          last_name: string | null
          thumb_hash: string | null
        }
        Insert: {
          first_name?: string | null
          id: string
          image_path?: string | null
          last_name?: string | null
          thumb_hash?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          image_path?: string | null
          last_name?: string | null
          thumb_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      raffles: {
        Row: {
          created_at: string | null
          description: string | null
          draw_id: number
          id: number
          image_path: string | null
          name: string
          thumb_hash: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          draw_id: number
          id?: number
          image_path?: string | null
          name: string
          thumb_hash?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          draw_id?: number
          id?: number
          image_path?: string | null
          name?: string
          thumb_hash?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raffles_draw_id_fkey"
            columns: ["draw_id"]
            isOneToOne: false
            referencedRelation: "draws"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raffles_draw_id_fkey"
            columns: ["draw_id"]
            isOneToOne: false
            referencedRelation: "raffle_stats"
            referencedColumns: ["draw_id"]
          },
        ]
      }
      raffles_sellers: {
        Row: {
          created_at: string | null
          id: number
          raffle_id: number
          seller_id: number
          ticket_price: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          raffle_id: number
          seller_id: number
          ticket_price?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          raffle_id?: number
          seller_id?: number
          ticket_price?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raffles_sellers_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffle_stats"
            referencedColumns: ["raffle_id"]
          },
          {
            foreignKeyName: "raffles_sellers_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raffles_sellers_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "sellers_with_tickets_count_by_raffle"
            referencedColumns: ["raffle_id"]
          },
          {
            foreignKeyName: "raffles_sellers_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raffles_sellers_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers_by_raffle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raffles_sellers_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers_with_tickets_count"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raffles_sellers_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers_with_tickets_count_by_raffle"
            referencedColumns: ["id"]
          },
        ]
      }
      sellers: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: number
          name: string
          phone: string | null
          thumb_hash: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name: string
          phone?: string | null
          thumb_hash?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string
          phone?: string | null
          thumb_hash?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          buyer_id: number | null
          created_at: string | null
          id: number
          number: string
          price: number | null
          pull_id: number | null
          raffle_id: number
          seller_id: number | null
          updated_at: string | null
        }
        Insert: {
          buyer_id?: number | null
          created_at?: string | null
          id?: number
          number: string
          price?: number | null
          pull_id?: number | null
          raffle_id: number
          seller_id?: number | null
          updated_at?: string | null
        }
        Update: {
          buyer_id?: number | null
          created_at?: string | null
          id?: number
          number?: string
          price?: number | null
          pull_id?: number | null
          raffle_id?: number
          seller_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "buyers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_pull_id_fkey"
            columns: ["pull_id"]
            isOneToOne: false
            referencedRelation: "tickets_pulls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffle_stats"
            referencedColumns: ["raffle_id"]
          },
          {
            foreignKeyName: "tickets_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "sellers_with_tickets_count_by_raffle"
            referencedColumns: ["raffle_id"]
          },
          {
            foreignKeyName: "tickets_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers_by_raffle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers_with_tickets_count"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers_with_tickets_count_by_raffle"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets_pulls: {
        Row: {
          buyer_id: number | null
          created_at: string | null
          id: number
          name: string
          raffle_id: number
          updated_at: string | null
        }
        Insert: {
          buyer_id?: number | null
          created_at?: string | null
          id?: number
          name: string
          raffle_id: number
          updated_at?: string | null
        }
        Update: {
          buyer_id?: number | null
          created_at?: string | null
          id?: number
          name?: string
          raffle_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_pulls_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "buyers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_pulls_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffle_stats"
            referencedColumns: ["raffle_id"]
          },
          {
            foreignKeyName: "tickets_pulls_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_pulls_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "sellers_with_tickets_count_by_raffle"
            referencedColumns: ["raffle_id"]
          },
        ]
      }
    }
    Views: {
      raffle_stats: {
        Row: {
          available_tickets: number | null
          description: string | null
          draw_drawn_at: string | null
          draw_id: number | null
          draw_name: string | null
          image_path: string | null
          lottery_image_path: string | null
          lottery_name: string | null
          lottery_thumb_hash: string | null
          raffle_created_at: string | null
          raffle_id: number | null
          raffle_name: string | null
          raffle_updated_at: string | null
          taken_tickets: number | null
          thumb_hash: string | null
          total_tickets: number | null
        }
        Relationships: []
      }
      sellers_by_raffle: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: number | null
          name: string | null
          phone: string | null
          raffle_id: number | null
          thumb_hash: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raffles_sellers_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raffles_sellers_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffle_stats"
            referencedColumns: ["raffle_id"]
          },
          {
            foreignKeyName: "raffles_sellers_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "sellers_with_tickets_count_by_raffle"
            referencedColumns: ["raffle_id"]
          },
        ]
      }
      sellers_with_tickets_count: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: number | null
          name: string | null
          phone: string | null
          thumb_hash: string | null
          total_tickets: number | null
          updated_at: string | null
        }
        Relationships: []
      }
      sellers_with_tickets_count_by_raffle: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: number | null
          name: string | null
          phone: string | null
          raffle_id: number | null
          thumb_hash: string | null
          ticket_price: number | null
          total_tickets: number | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_raffle_with_prizes: {
        Args: {
          raffle_data: Json
          prizes_data: Json
        }
        Returns: Json
      }
      delete_raffle_and_associated_data: {
        Args: {
          p_raffle_id: number
        }
        Returns: Json
      }
      sync_user_profiles: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

