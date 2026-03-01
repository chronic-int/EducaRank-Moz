export type UserRole = 'user' | 'institution' | 'admin';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
}

export interface Avaliacao {
  id: string;
  institution_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  moderated: boolean;
  created_at: string;
  profile?: Profile; // Para exibir o autor da avaliação
}

export interface Instituicao {
  id: string;
  name: string;
  type: "Universidade" | "Instituto" | "Escola Secundária";
  district: string;
  description: string | null;
  banner_url: string | null;
  logo_url: string | null;
  website_url: string | null;
  verified: boolean;
  owner_id: string | null;
  average_rating: number;
  total_reviews: number;
  created_at: string;
  reviews?: Avaliacao[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  banner_url: string | null;
  author_id: string | null;
  published: boolean;
  created_at: string;
  author?: Profile;
}
