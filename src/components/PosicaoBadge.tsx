import { Trophy } from "lucide-react";

interface PosicaoBadgeProps {
  posicao: number;
}

const PosicaoBadge = ({ posicao }: PosicaoBadgeProps) => {
  if (posicao === 1)
    return (
      <span className="inline-flex items-center gap-1 bg-gold/15 text-gold font-bold px-3 py-1 rounded-full text-sm">
        <Trophy className="h-4 w-4" /> 1º
      </span>
    );
  if (posicao === 2)
    return (
      <span className="inline-flex items-center gap-1 bg-silver/15 text-silver font-bold px-3 py-1 rounded-full text-sm">
        <Trophy className="h-4 w-4" /> 2º
      </span>
    );
  if (posicao === 3)
    return (
      <span className="inline-flex items-center gap-1 bg-bronze/15 text-bronze font-bold px-3 py-1 rounded-full text-sm">
        <Trophy className="h-4 w-4" /> 3º
      </span>
    );

  return <span className="text-muted-foreground font-semibold text-sm">{posicao}º</span>;
};

export default PosicaoBadge;
