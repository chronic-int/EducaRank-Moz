import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, MapPin, Users, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import NotaBadge from "@/components/NotaBadge";
import StarRating from "@/components/StarRating";
import AvaliacaoModal from "@/components/AvaliacaoModal";
import ReputationBadge from "@/components/ReputationBadge";
import VoteButtons from "@/components/VoteButtons";
import { getInstituicaoById, getDistribuicaoNotas } from "@/services/instituicaoService";

const InstituicaoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: instituicao, isLoading, isError } = useQuery({
    queryKey: ['instituicao', id],
    queryFn: () => getInstituicaoById(id || ""),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <Skeleton className="h-6 w-32 mb-6" />
          <Skeleton className="h-64 w-full rounded-xl mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-96 rounded-xl" />
            <Skeleton className="lg:col-span-2 h-96 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !instituicao) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center text-muted-foreground">Instituição não encontrada.</div>
      </div>
    );
  }

  const reviews = instituicao.reviews || [];
  const distribuicao = getDistribuicaoNotas(reviews);
  const maxDist = Math.max(...distribuicao, 1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar ao ranking
        </Link>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-xl card-shadow p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                {instituicao.type}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold mt-3 mb-2 text-foreground">{instituicao.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {instituicao.district}, Maputo</span>
                <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" /> {instituicao.total_reviews} avaliações</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <NotaBadge nota={instituicao.average_rating} size="lg" />
              <StarRating rating={instituicao.average_rating} size="md" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="bg-card rounded-xl card-shadow p-6"
          >
            <h3 className="font-semibold mb-4">Distribuição de Notas</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((n) => (
                <div key={n} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-8 text-muted-foreground">{n} ★</span>
                  <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(distribuicao[n - 1] / maxDist) * 100}%` }}
                      transition={{ delay: 0.3 + n * 0.08, duration: 0.5, ease: "easeOut" }}
                      className={`h-full rounded-full ${n >= 4 ? "bg-success" : n === 3 ? "bg-warning" : "bg-danger"
                        }`}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-6 text-right">{distribuicao[n - 1]}</span>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6" onClick={() => setModalOpen(true)}>
              Avaliar esta Instituição
            </Button>
          </motion.div>

          {/* Comments */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="lg:col-span-2 bg-card rounded-xl card-shadow p-6"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Comentários ({reviews.length})
            </h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {reviews.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">Ainda não existem comentários para esta instituição.</p>
              ) : (
                reviews.map((av: any, i) => (
                  <motion.div
                    key={av.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
                    className={cn(
                      "border rounded-xl p-5 mb-4 transition-all hover:border-primary/30 hover:bg-muted/10",
                      av.profile?.is_trusted && "border-primary/20 bg-primary/[0.02]"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Link to={`/profile/${av.user_id}`} className="hover:opacity-80 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                            {av.profile?.avatar_url ? (
                              <img src={av.profile.avatar_url} alt={av.profile.full_name} className="w-full h-full object-cover" />
                            ) : (
                              <Users className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </Link>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <Link to={`/profile/${av.user_id}`} className="font-bold text-sm hover:text-primary transition-colors">
                              {av.profile?.full_name || "Utilizador"}
                            </Link>
                            <ReputationBadge score={av.profile?.reputation_score || 0} />
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{new Date(av.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <NotaBadge nota={av.rating} size="sm" />
                    </div>

                    <p className="text-sm text-foreground/90 leading-relaxed mb-1">{av.comment || "Sem comentário."}</p>

                    <VoteButtons reviewId={av.id} initialHelpfulCount={0} />
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <AvaliacaoModal
        instituicao={instituicao}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default InstituicaoPage;
