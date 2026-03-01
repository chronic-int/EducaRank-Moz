import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "@/components/StarRating";
import { adicionarAvaliacao } from "@/services/instituicaoService";
import { Instituicao } from "@/types";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface AvaliacaoModalProps {
  instituicao: Instituicao;
  open: boolean;
  onClose: () => void;
}

const AvaliacaoModal = ({ instituicao, open, onClose }: AvaliacaoModalProps) => {
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para avaliar.");
      return;
    }
    if (nota === 0) {
      toast.error("Selecione uma nota de 1 a 5 estrelas.");
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await adicionarAvaliacao(instituicao.id, nota, comentario);
      if (success) {
        queryClient.invalidateQueries({ queryKey: ['instituicao', instituicao.id] });
        queryClient.invalidateQueries({ queryKey: ['instituicoes'] });
        toast.success("Avaliação enviada com sucesso!");
        setNota(0);
        setComentario("");
        onClose();
      } else {
        toast.error("Erro ao enviar avaliação. Talvez você já tenha avaliado esta instituição.");
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Avaliar {instituicao.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-2">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">A sua nota</label>
            <StarRating rating={nota} size="lg" interactive onRate={setNota} />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Comentário (opcional)</label>
            <Textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Partilhe a sua experiência..."
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvaliacaoModal;
