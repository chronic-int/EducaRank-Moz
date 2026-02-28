import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import NotaBadge from "@/components/NotaBadge";
import StarRating from "@/components/StarRating";
import AvaliacaoModal from "@/components/AvaliacaoModal";
import { getInstituicaoById, getDistribuicaoNotas } from "@/services/instituicaoService";
import { Instituicao } from "@/types";

const InstituicaoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [instituicao, setInstituicao] = useState<Instituicao | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const data = getInstituicaoById(id);
      if (data) setInstituicao({ ...data });
    }
  }, [id]);

  if (!instituicao) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center text-muted-foreground">Instituição não encontrada.</div>
      </div>
    );
  }

  const distribuicao = getDistribuicaoNotas(instituicao.avaliacoes);
  const maxDist = Math.max(...distribuicao, 1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar ao ranking
        </Link>

        {/* Header Card */}
        <div className="bg-card rounded-xl card-shadow p-6 md:p-8 mb-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                {instituicao.tipo}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold mt-3 mb-2 text-foreground">{instituicao.nome}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {instituicao.distrito}, Maputo</span>
                <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" /> {instituicao.total_avaliacoes} avaliações</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <NotaBadge nota={instituicao.media} size="lg" />
              <StarRating rating={instituicao.media} size="md" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Distribution Chart */}
          <div className="bg-card rounded-xl card-shadow p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h3 className="font-semibold mb-4">Distribuição de Notas</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((n) => (
                <div key={n} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-8 text-muted-foreground">{n} ★</span>
                  <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        n >= 4 ? "bg-success" : n === 3 ? "bg-warning" : "bg-danger"
                      }`}
                      style={{ width: `${(distribuicao[n - 1] / maxDist) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-6 text-right">{distribuicao[n - 1]}</span>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6" onClick={() => setModalOpen(true)}>
              Avaliar esta Instituição
            </Button>
          </div>

          {/* Comments */}
          <div className="lg:col-span-2 bg-card rounded-xl card-shadow p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Comentários ({instituicao.avaliacoes.length})
            </h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {instituicao.avaliacoes.map((av) => (
                <div key={av.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{av.autor}</span>
                    <span className="text-xs text-muted-foreground">{av.data}</span>
                  </div>
                  <StarRating rating={av.nota} size="sm" />
                  {av.comentario && <p className="text-sm text-muted-foreground mt-2">{av.comentario}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AvaliacaoModal
        instituicao={instituicao}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdate={setInstituicao}
      />
    </div>
  );
};

export default InstituicaoPage;
