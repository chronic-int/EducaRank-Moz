import { Instituicao } from "@/types";
import { supabase } from "@/integrations/supabase/client";

export async function getInstituicoes(): Promise<Instituicao[]> {
  const { data, error } = await supabase
    .from('institutions')
    .select('*, reviews(*, profile:profiles(*))')
    .order('average_rating', { ascending: false });

  if (error) {
    console.error("Erro ao buscar instituições:", error);
    return [];
  }

  return (data as any) || [];
}

export async function getInstituicaoById(id: string): Promise<Instituicao | null> {
  const { data, error } = await supabase
    .from('institutions')
    .select('*, reviews(*, profile:profiles(*))')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Erro ao buscar instituição ${id}:`, error);
    return null;
  }

  return (data as any) || null;
}

export async function getInstituicoesByTipo(tipo: string): Promise<Instituicao[]> {
  let query = supabase
    .from('institutions')
    .select('*, reviews(*, profile:profiles(*))')
    .order('average_rating', { ascending: false });

  if (tipo && tipo !== "Todos") {
    query = query.eq('type', tipo);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Erro ao buscar instituições do tipo ${tipo}:`, error);
    return [];
  }

  return (data as any) || [];
}

export async function buscarInstituicoes(searchQuery: string): Promise<Instituicao[]> {
  const { data, error } = await supabase
    .from('institutions')
    .select('*, reviews(*, profile:profiles(*))')
    .ilike('name', `%${searchQuery}%`)
    .order('average_rating', { ascending: false });

  if (error) {
    console.error(`Erro ao buscar instituições por "${searchQuery}":`, error);
    return [];
  }

  return (data as any) || [];
}

export async function adicionarAvaliacao(
  institutionId: string,
  rating: number,
  comment: string
): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from('reviews')
    .insert({
      institution_id: institutionId,
      user_id: user.id,
      rating,
      comment
    });

  if (error) {
    console.error("Erro ao adicionar avaliação:", error);
    return false;
  }

  return true;
}

export function getDistribuicaoNotas(avaliacoes: any[]): number[] {
  const dist = [0, 0, 0, 0, 0];
  if (!avaliacoes) return dist;
  avaliacoes.forEach((a) => {
    if (a.rating >= 1 && a.rating <= 5) dist[a.rating - 1]++;
  });
  return dist;
}
