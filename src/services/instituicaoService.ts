import { Instituicao, Avaliacao } from "@/types";
import { instituicoesMock } from "@/data/instituicoes";

let instituicoes: Instituicao[] = JSON.parse(JSON.stringify(instituicoesMock));

export function getInstituicoes(): Instituicao[] {
  return [...instituicoes].sort((a, b) => b.media - a.media);
}

export function getInstituicaoById(id: string): Instituicao | undefined {
  return instituicoes.find((i) => i.id === id);
}

export function getInstituicoesByTipo(tipo: string): Instituicao[] {
  if (!tipo || tipo === "Todos") return getInstituicoes();
  return getInstituicoes().filter((i) => i.tipo === tipo);
}

export function buscarInstituicoes(query: string): Instituicao[] {
  const q = query.toLowerCase();
  return getInstituicoes().filter((i) => i.nome.toLowerCase().includes(q));
}

export function adicionarAvaliacao(
  instituicaoId: string,
  nota: number,
  comentario: string,
  autor: string = "Utilizador Anónimo"
): Instituicao | undefined {
  const inst = instituicoes.find((i) => i.id === instituicaoId);
  if (!inst) return undefined;

  const novaAvaliacao: Avaliacao = {
    id: `av-${Date.now()}`,
    autor,
    nota,
    comentario,
    data: new Date().toISOString().split("T")[0],
  };

  inst.avaliacoes.unshift(novaAvaliacao);
  inst.total_avaliacoes += 1;

  // Recalculate average
  const soma = inst.avaliacoes.reduce((acc, a) => acc + a.nota, 0);
  inst.media = Math.round((soma / inst.avaliacoes.length) * 10) / 10;

  return { ...inst };
}

export function getDistribuicaoNotas(avaliacoes: Avaliacao[]): number[] {
  const dist = [0, 0, 0, 0, 0];
  avaliacoes.forEach((a) => {
    if (a.nota >= 1 && a.nota <= 5) dist[a.nota - 1]++;
  });
  return dist;
}
