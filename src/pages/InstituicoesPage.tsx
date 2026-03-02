import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import NotaBadge from "@/components/NotaBadge";
import StarRating from "@/components/StarRating";
import { getInstituicoes } from "@/services/instituicaoService";

const tiposFiltro = ["Todos", "Universidade", "Instituto", "Escola Secundária"];

const InstituicoesPage = () => {
    const [filtroTipo, setFiltroTipo] = useState("Todos");
    const [busca, setBusca] = useState("");

    const { data: rawInstituicoes, isLoading } = useQuery({
        queryKey: ['instituicoes'],
        queryFn: getInstituicoes,
    });

    const instituicoes = useMemo(() => {
        if (!rawInstituicoes) return [];
        let list = [...rawInstituicoes];
        if (filtroTipo !== "Todos") list = list.filter((i) => i.type === filtroTipo);
        if (busca.trim()) list = list.filter((i) => i.name.toLowerCase().includes(busca.toLowerCase()));
        return list;
    }, [rawInstituicoes, filtroTipo, busca]);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section className="container py-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Descobrir Instituições</h1>
                        <p className="text-muted-foreground">Explore e encontre as melhores instituições de ensino em Maputo.</p>
                    </div>

                    <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por nome..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="pl-10 h-11"
                        />
                    </div>
                </div>

                <div className="flex gap-2 flex-wrap mb-8">
                    {tiposFiltro.map((tipo) => (
                        <Button
                            key={tipo}
                            variant={filtroTipo === tipo ? "default" : "outline"}
                            onClick={() => setFiltroTipo(tipo)}
                            className="rounded-full"
                        >
                            {tipo}
                        </Button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Skeleton key={i} className="h-48 w-full rounded-xl" />
                        ))}
                    </div>
                ) : instituicoes.length === 0 ? (
                    <div className="py-20 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                        Nenhuma instituição encontrada para os filtros aplicados.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {instituicoes.map((inst, idx) => (
                            <motion.div
                                key={inst.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.35 }}
                            >
                                <Link to={`/instituicao/${inst.id}`}>
                                    <div className="group bg-card hover:bg-accent/40 rounded-xl card-shadow border p-5 transition-all flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                                <GraduationCap className="h-6 w-6" />
                                            </div>
                                            <NotaBadge nota={inst.average_rating} size="sm" />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{inst.name}</h3>
                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">{inst.type}</p>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                                {inst.description || `Localizada em ${inst.district}. Oferece diversos cursos e programas educacionais para o seu futuro.`}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t flex items-center justify-between mt-auto">
                                            <StarRating rating={inst.average_rating} size="xs" />
                                            <span className="text-xs text-muted-foreground font-medium">{inst.total_reviews} reviews</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            <footer className="border-t py-10 mt-auto">
                <div className="container text-center text-sm text-muted-foreground">
                    © 2026 EducaRank Moz — Connectando Estudantes a Excelência
                </div>
            </footer>
        </div>
    );
};

export default InstituicoesPage;
