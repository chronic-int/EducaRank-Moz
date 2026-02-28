import { motion } from "framer-motion";
import { GraduationCap, Target, Users, BarChart3, MapPin, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const features = [
  {
    icon: BarChart3,
    title: "Ranking Transparente",
    description: "Rankings baseados em avaliações reais de estudantes e comunidade académica.",
  },
  {
    icon: Users,
    title: "Comunidade Activa",
    description: "Uma comunidade crescente de estudantes que partilham experiências reais.",
  },
  {
    icon: Target,
    title: "Decisões Informadas",
    description: "Ajudamos estudantes a fazer as melhores escolhas para o seu futuro.",
  },
  {
    icon: MapPin,
    title: "Foco em Maputo",
    description: "Cobertura completa das instituições de ensino da Cidade de Maputo.",
  },
];

const SobrePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient text-primary-foreground py-12 md:py-16">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm mb-6"
          >
            <GraduationCap className="h-8 w-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
          >
            Sobre o EducaRank Moz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-primary-foreground/80 text-lg max-w-2xl mx-auto"
          >
            A primeira plataforma de ranking educacional de Moçambique, construída pela comunidade estudantil.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="container py-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="bg-card rounded-xl card-shadow p-8 mb-10"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              A Nossa Missão
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              O EducaRank Moz nasceu da necessidade de criar um espaço transparente onde estudantes
              moçambicanos possam partilhar as suas experiências educacionais. Acreditamos que informação
              de qualidade é a base para decisões acertadas sobre o futuro académico.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              A nossa plataforma permite avaliar universidades, institutos e escolas secundárias da
              Cidade de Maputo, gerando um ranking dinâmico baseado em avaliações reais da comunidade.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="bg-card rounded-xl card-shadow p-6 hover:card-shadow-hover transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-accent-foreground mb-3">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1.5">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 EducaRank Moz — Ranking Educacional da Cidade de Maputo
        </div>
      </footer>
    </div>
  );
};

export default SobrePage;
