import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Award, MessageSquare, ThumbsUp, ShieldCheck, Star, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import ReputationBadge from "@/components/ReputationBadge";
import NotaBadge from "@/components/NotaBadge";
import { getProfile } from "@/services/reputationService";
import { getReviewsByUserId } from "@/services/instituicaoService";

const ProfilePage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: profile, isLoading: loadingProfile } = useQuery({
        queryKey: ['profile', id],
        queryFn: () => getProfile(id || ""),
        enabled: !!id,
    });

    const { data: reviews, isLoading: loadingReviews } = useQuery({
        queryKey: ['user-reviews', id],
        queryFn: () => getReviewsByUserId(id || ""),
        enabled: !!id,
    });

    if (loadingProfile) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <Navbar />
                <div className="container py-10">
                    <Skeleton className="h-48 w-full rounded-2xl mb-8" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Skeleton className="h-64 rounded-2xl" />
                        <Skeleton className="md:col-span-2 h-96 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container py-20 text-center">
                    <h2 className="text-2xl font-bold">Usuário não encontrado</h2>
                    <Button asChild className="mt-4">
                        <Link to="/">Voltar ao Ranking</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <div className="container py-8 md:py-12">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Voltar ao Ranking
                </Link>

                {/* Hero Profile Decor */}
                <div className="relative mb-8 pt-16 pb-8 md:pt-24 md:pb-12 rounded-3xl overflow-hidden shadow-2xl bg-[#0F172A]">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

                    <div className="relative px-8 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-10">
                        {/* Avatar Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary to-blue-400 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500" />
                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#1E293B] bg-[#1E293B] flex items-center justify-center overflow-hidden shadow-2xl">
                                {profile.avatar_url ? (
                                    <img src={profile.avatar_url} alt={profile.full_name || ""} className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="h-16 w-16 text-slate-500" />
                                )}
                            </div>
                            {profile.is_trusted && (
                                <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-full border-4 border-[#0F172A] shadow-lg">
                                    <ShieldCheck className="h-6 w-6 text-white" />
                                </div>
                            )}
                        </motion.div>

                        {/* Info Container */}
                        <div className="text-center md:text-left flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">{profile.full_name || "Membro EducaRank"}</h1>
                                <ReputationBadge score={profile.reputation_score} className="h-7 px-4 text-xs font-black self-center md:self-auto" />
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-y-3 gap-x-6 text-slate-400 font-medium">
                                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-primary" /> {profile.reputation_score} Reputation Score</span>
                                <span className="flex items-center gap-1.5"><MessageSquare className="h-4 w-4 text-green-400" /> {profile.total_reviews} Avaliações feitas</span>
                                <span className="flex items-center gap-1.5"><ThumbsUp className="h-4 w-4 text-blue-400" /> {profile.helpful_votes_received} Votos de utilidade</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-card rounded-2xl p-6 border shadow-sm"
                        >
                            <h3 className="font-bold flex items-center gap-2 mb-6">
                                <Award className="h-5 w-5 text-primary" /> Estatísticas do Perfil
                            </h3>

                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Reviews totais</span>
                                    <span className="text-sm font-black">{profile.total_reviews}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Votos recebidos</span>
                                    <span className="text-sm font-black text-green-600">{profile.helpful_votes_received}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Votos dados</span>
                                    <span className="text-sm font-black">{profile.helpful_votes_given}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Denúncias</span>
                                    <span className="text-sm font-black text-red-500">{profile.reports_received}</span>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-muted/30 rounded-xl border border-dashed">
                                <p className="text-[10px] text-muted-foreground leading-relaxed text-center font-medium">
                                    Atividade verificada desde {new Date(profile.created_at).toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content - Reviews History */}
                    <div className="lg:col-span-3 space-y-6">
                        <h3 className="text-xl font-bold px-1 flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" /> Histórico de Avaliações
                        </h3>

                        <div className="space-y-4">
                            {loadingReviews ? (
                                Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)
                            ) : !reviews || reviews.length === 0 ? (
                                <div className="py-16 text-center bg-card rounded-2xl border border-dashed">
                                    <p className="text-muted-foreground font-medium">Este usuário ainda não fez nenhuma avaliação pública.</p>
                                </div>
                            ) : (
                                reviews.map((review, idx) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-card rounded-2xl p-6 border shadow-sm hover:border-primary/20 transition-all group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <Link to={`/instituicao/${review.institution_id}`} className="group-hover:text-primary transition-colors">
                                                <h4 className="font-bold text-lg">{review.institution?.name}</h4>
                                                <span className="text-xs text-muted-foreground">{review.institution?.district}</span>
                                            </Link>
                                            <NotaBadge nota={review.rating} size="sm" />
                                        </div>

                                        <p className="text-sm text-foreground/80 leading-relaxed italic mb-4">"{review.comment || "Sem comentário."}"</p>

                                        <div className="flex items-center justify-between pt-4 border-t text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                            <span>Publicado em {new Date(review.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
