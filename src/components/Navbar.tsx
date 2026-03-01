import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X, LogOut, UserCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const links = [
    { to: "/", label: "Ranking" },
    { to: "/instituicoes", label: "Instituições" },
    { to: "/sobre", label: "Sobre" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-primary">
          <GraduationCap className="h-7 w-7" />
          EducaRank Moz
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(link.to)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="ml-3 flex items-center gap-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/dashboard")
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  Painel
                </Link>
                <span className="text-sm text-muted-foreground flex items-center gap-1.5 ml-2">
                  <UserCircle className="h-4 w-4" />
                  {profile?.full_name || user.email?.split("@")[0]}
                </span>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-1" /> Sair
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button size="sm" asChild className="font-semibold">
                  <Link to="/registar">Criar Conta</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t bg-card px-4 pb-4 overflow-hidden"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-md text-sm font-medium mt-1 ${isActive(link.to)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 pt-3 border-t space-y-2">
              {user ? (
                <Button variant="outline" size="sm" className="w-full" onClick={() => { signOut(); setMenuOpen(false); }}>
                  <LogOut className="h-4 w-4 mr-1" /> Sair
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/login" onClick={() => setMenuOpen(false)}>Entrar</Link>
                  </Button>
                  <Button size="sm" className="w-full font-semibold" asChild>
                    <Link to="/registar" onClick={() => setMenuOpen(false)}>Criar Conta</Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
