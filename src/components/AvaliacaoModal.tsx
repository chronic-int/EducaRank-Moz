import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "@/components/StarRating";
import { adicionarAvaliacao } from "@/services/instituicaoService";
import { Instituicao } from "@/types";
import { toast } from "sonner";

interface AvaliacaoModalProps {
  instituicao: Instituicao;
  open: boolean;
  onClose: () => void;
  onUpdate: (updated: Instituicao) => void;
}

const AvaliacaoModal = ({ instituicao, open, onClose, onUpdate }: AvaliacaoModalProps) => {
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");

  const handleSubmit = () => {
    if (nota === 0) {
      toast.error("Selecione uma nota de 1 a 5 estrelas.");
      return;
    }
    const updated = adicionarAvaliacao(instituicao.id, nota, comentario);
    if (updated) {
      onUpdate(updated);
      toast.success("Avaliação enviada com sucesso!");
      setNota(0);
      setComentario("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Avaliar {instituicao.nome}</DialogTitle>
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
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Enviar Avaliação</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvaliacaoModal;
