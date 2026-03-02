import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, BarChart3, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import NotaBadge from "@/components/NotaBadge";
import PosicaoBadge from "@/components/PosicaoBadge";
import StarRating from "@/components/StarRating";
import { getInstituicoes } from "@/services/instituicaoService";
import { useAuth } from "@/contexts/AuthContext";

const tiposFiltro = ["Todos", "Universidade", "Instituto", "Escola Secundária"];

const Index = () => {
  const { user } = useAuth();

  const { data: rawInstituicoes, isLoading } = useQuery({
    queryKey: ['instituicoes'],
    queryFn: getInstituicoes,
  });

  const topInstituicoes = useMemo(() => {
    if (!rawInstituicoes) return [];
    return [...rawInstituicoes].sort((a, b) => b.average_rating - a.average_rating).slice(0, 5);
  }, [rawInstituicoes]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="hero-gradient text-primary-foreground py-16 md:py-24">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-sm font-medium"
          >
            <BarChart3 className="h-4 w-4" />
            Plataforma de Ranking Educacional
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
          >
            O Futuro da Educação na<br />Cidade de Maputo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            A plataforma líder para avaliar, comparar e descobrir as melhores instituições de ensino. Tome decisões informadas com base em experiências reais.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" variant="secondary" asChild className="font-bold shadow-xl h-12 px-8">
              <Link to="/instituicoes">
                Explorar Instituições <Search className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {!user && (
              <Button size="lg" variant="ghost" asChild className="text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/10 h-12 px-8 font-semibold">
                <Link to="/registar">Criar Conta Grátis</Link>
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="container py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Melhores Avaliadas
            </h2>
            <p className="text-muted-foreground mt-1">Instituições em destaque na Cidade de Maputo.</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex group">
            <Link to="/instituicoes" className="flex items-center gap-1">
              Ver Ranking Completo <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="bg-card rounded-2xl card-shadow overflow-hidden border">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[80px_1fr_180px_100px_140px] gap-4 px-8 py-4 border-b bg-muted/30 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <span>Posição</span>
            <span>Instituição</span>
            <span>Tipo</span>
            <span>Nota</span>
            <span className="text-right">Avaliadores</span>
          </div>

          {isLoading ? (
            <div className="p-8 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 items-center">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-[40%]" />
                    <Skeleton className="h-3 w-[20%]" />
                  </div>
                  <Skeleton className="h-12 w-24" />
                </div>
              ))}
            </div>
          ) : (
            topInstituicoes.map((inst, idx) => (
              <motion.div
                key={inst.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
              >
                <Link
                  to={`/instituicao/${inst.id}`}
                  className={`grid grid-cols-1 md:grid-cols-[80px_1fr_180px_100px_140px] gap-2 md:gap-4 px-8 py-6 border-b last:border-b-0 items-center hover:bg-primary/5 transition-all group`}
                >
                  <div className="flex items-center gap-3">
                    <PosicaoBadge posicao={idx + 1} />
                    <span className="md:hidden font-bold text-foreground group-hover:text-primary transition-colors text-lg">{inst.name}</span>
                  </div>
                  <div className="hidden md:flex flex-col">
                    <span className="font-bold text-foreground group-hover:text-primary transition-colors text-lg leading-tight">{inst.name}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{inst.district}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {inst.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <NotaBadge nota={inst.average_rating} size="sm" />
                    <span className="md:hidden"><StarRating rating={inst.average_rating} size="sm" /></span>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground md:text-right">
                    {inst.total_reviews} avaliações
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Button variant="outline" asChild className="w-full h-11">
            <Link to="/instituicoes">Ver Ranking Completo</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 EducaRank Moz — Ranking Educacional da Cidade de Maputo
        </div>
      </footer>
    </div>
  );
};

export default Index;
