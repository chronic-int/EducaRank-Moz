import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, BarChart3, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import NotaBadge from "@/components/NotaBadge";
import PosicaoBadge from "@/components/PosicaoBadge";
import StarRating from "@/components/StarRating";
import { getInstituicoes } from "@/services/instituicaoService";
import { useAuth } from "@/contexts/AuthContext";

const tiposFiltro = ["Todos", "Universidade", "Instituto", "Escola Secundária"];

const Index = () => {
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [busca, setBusca] = useState("");
  const { user } = useAuth();

  const instituicoes = useMemo(() => {
    let list = getInstituicoes();
    if (filtroTipo !== "Todos") list = list.filter((i) => i.tipo === filtroTipo);
    if (busca.trim()) list = list.filter((i) => i.nome.toLowerCase().includes(busca.toLowerCase()));
    return list;
  }, [filtroTipo, busca]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner — compact */}
      <section className="hero-gradient text-primary-foreground py-10 md:py-14">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 text-sm font-medium"
          >
            <BarChart3 className="h-4 w-4" />
            Plataforma de Ranking Educacional
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3"
          >
            Ranking Educacional da<br />Cidade de Maputo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="text-primary-foreground/80 text-base md:text-lg max-w-xl mx-auto mb-5"
          >
            Avalie e compare instituições de ensino. Ajude a comunidade estudantil.
          </motion.p>

          {!user && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center justify-center gap-3"
            >
              <Button size="lg" variant="secondary" asChild className="font-semibold shadow-lg">
                <Link to="/registar">
                  Criar Conta Grátis <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild className="text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/10">
                <Link to="/login">Entrar</Link>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Filters & Search */}
      <section className="container -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="bg-card rounded-xl card-shadow p-5 flex flex-col md:flex-row gap-4 items-center"
        >
          <div className="flex gap-2 flex-wrap">
            {tiposFiltro.map((tipo) => (
              <Button
                key={tipo}
                size="sm"
                variant={filtroTipo === tipo ? "default" : "outline"}
                onClick={() => setFiltroTipo(tipo)}
                className="text-sm"
              >
                {tipo}
              </Button>
            ))}
          </div>
          <div className="relative flex-1 w-full md:max-w-sm ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar instituição..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>
      </section>

      {/* Ranking Table */}
      <section className="container py-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Top {instituicoes.length} Instituições
        </h2>

        <div className="bg-card rounded-xl card-shadow overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[60px_1fr_160px_80px_120px] gap-4 px-6 py-3 border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span>Pos.</span>
            <span>Instituição</span>
            <span>Tipo</span>
            <span>Média</span>
            <span className="text-right">Avaliações</span>
          </div>

          {instituicoes.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">Nenhuma instituição encontrada.</div>
          )}

          {instituicoes.map((inst, idx) => (
            <motion.div
              key={inst.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.35 }}
            >
              <Link
                to={`/instituicao/${inst.id}`}
                className={`grid grid-cols-1 md:grid-cols-[60px_1fr_160px_80px_120px] gap-2 md:gap-4 px-6 py-4 border-b last:border-b-0 items-center hover:bg-muted/40 transition-colors ${
                  idx < 3 ? "bg-accent/30" : ""
                }`}
              >
                <div className="flex items-center gap-3 md:block">
                  <PosicaoBadge posicao={idx + 1} />
                  <span className="md:hidden font-semibold text-foreground">{inst.nome}</span>
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="font-semibold text-foreground">{inst.nome}</span>
                  <span className="text-xs text-muted-foreground">{inst.distrito}</span>
                </div>
                <div>
                  <span className="text-xs md:text-sm font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                    {inst.tipo}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <NotaBadge nota={inst.media} size="sm" />
                  <span className="md:hidden"><StarRating rating={inst.media} size="sm" /></span>
                </div>
                <div className="text-sm text-muted-foreground md:text-right">
                  {inst.total_avaliacoes} avaliações
                </div>
              </Link>
            </motion.div>
          ))}
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
