export interface Avaliacao {
  id: string;
  autor: string;
  nota: number;
  comentario: string;
  data: string;
}

export interface Instituicao {
  id: string;
  nome: string;
  tipo: "Universidade" | "Instituto" | "Escola Secundária";
  distrito: string;
  media: number;
  total_avaliacoes: number;
  avaliacoes: Avaliacao[];
}
