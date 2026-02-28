import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, BarChart3, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import NotaBadge from "@/components/NotaBadge";
import PosicaoBadge from "@/components/PosicaoBadge";
import StarRating from "@/components/StarRating";
import { getInstituicoes } from "@/services/instituicaoService";

const tiposFiltro = ["Todos", "Universidade", "Instituto", "Escola Secundária"];

const Index = () => {
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [busca, setBusca] = useState("");

  const instituicoes = useMemo(() => {
    let list = getInstituicoes();
    if (filtroTipo !== "Todos") list = list.filter((i) => i.tipo === filtroTipo);
    if (busca.trim()) list = list.filter((i) => i.nome.toLowerCase().includes(busca.toLowerCase()));
    return list;
  }, [filtroTipo, busca]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="hero-gradient text-primary-foreground py-16 md:py-24">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-sm font-medium">
            <BarChart3 className="h-4 w-4" />
            Plataforma de Ranking Educacional
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Ranking Educacional da<br />Cidade de Maputo
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Avalie e compare instituições de ensino. Ajude a comunidade estudantil a fazer escolhas informadas.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="container -mt-8 relative z-10">
        <div className="bg-card rounded-xl card-shadow p-5 flex flex-col md:flex-row gap-4 items-center">
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
        </div>
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
            <Link
              key={inst.id}
              to={`/instituicao/${inst.id}`}
              className={`grid grid-cols-1 md:grid-cols-[60px_1fr_160px_80px_120px] gap-2 md:gap-4 px-6 py-4 border-b last:border-b-0 items-center hover:bg-muted/40 transition-colors animate-fade-in ${
                idx < 3 ? "bg-accent/30" : ""
              }`}
              style={{ animationDelay: `${idx * 40}ms` }}
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
