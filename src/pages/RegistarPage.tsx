import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Mail, Lock, User, Building } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

const RegistarPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState<'user' | 'institution'>('user');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegistar = async (e: FormEvent) => {
    e.preventDefault();
    if (!nome || !email || !senha) {
      toast.error("Preencha todos os campos.");
      return;
    }
    if (senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          full_name: nome,
          role: role
        },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Conta criada! Verifique o seu email para confirmar.");
    navigate("/login");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Erro ao entrar com Google.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container flex items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-card rounded-xl card-shadow p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent text-accent-foreground mb-4">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold">Criar Conta</h1>
            <p className="text-sm text-muted-foreground mt-1">Junte-se à comunidade EducaRank</p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full h-11 font-medium"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Registar com Google
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground">ou</span>
            </div>
          </div>

          <form onSubmit={handleRegistar} className="space-y-4">
            <div className="flex gap-3 mb-2">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${role === 'user'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-muted bg-transparent text-muted-foreground hover:border-muted-foreground/30"
                  }`}
              >
                <User className="h-5 w-5" />
                <span className="text-xs font-semibold">Cidadão</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('institution')}
                className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${role === 'institution'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-muted bg-transparent text-muted-foreground hover:border-muted-foreground/30"
                  }`}
              >
                <Building className="h-5 w-5" />
                <span className="text-xs font-semibold">Instituição</span>
              </button>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Nome da {role === 'institution' ? 'Instituição' : 'Conta'}</label>
              <div className="relative">
                {role === 'institution' ? (
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                ) : (
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
                <Input
                  type="text"
                  placeholder={role === 'institution' ? "Nome oficial da instituição" : "Seu nome completo"}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Já tem conta?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Entrar
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistarPage;
