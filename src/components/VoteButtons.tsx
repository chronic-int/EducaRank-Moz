import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { voteReview, removeVote, getReviewVotes } from "@/services/voteService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface VoteButtonsProps {
    reviewId: string;
    initialHelpfulCount?: number;
}

const VoteButtons = ({ reviewId, initialHelpfulCount = 0 }: VoteButtonsProps) => {
    const { user } = useAuth();
    const [userVote, setUserVote] = useState<'helpful' | 'not_helpful' | null>(null);
    const [helpfulCount, setHelpfulCount] = useState(initialHelpfulCount);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVotes = async () => {
            if (!user) return;
            const votes = await getReviewVotes(reviewId);
            const myVote = votes.find(v => v.voted_by === user.id);
            if (myVote) setUserVote(myVote.vote_type);

            const count = votes.filter(v => v.vote_type === 'helpful').length;
            setHelpfulCount(count);
        };
        fetchVotes();
    }, [reviewId, user]);

    const handleVote = async (type: 'helpful' | 'not_helpful') => {
        if (!user) {
            toast.error("Faça login para votar em avaliações");
            return;
        }

        setLoading(true);
        try {
            if (userVote === type) {
                await removeVote(reviewId, user.id);
                setUserVote(null);
                if (type === 'helpful') setHelpfulCount(prev => prev - 1);
                toast.success("Voto removido");
            } else {
                await voteReview(reviewId, user.id, type);
                if (userVote === 'helpful' && type === 'not_helpful') {
                    setHelpfulCount(prev => prev - 1);
                } else if (userVote !== 'helpful' && type === 'helpful') {
                    setHelpfulCount(prev => prev + 1);
                }
                setUserVote(type);
                toast.success(type === 'helpful' ? "Marcado como útil" : "Marcado como não útil");
            }
        } catch (error) {
            toast.error("Erro ao processar voto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-3 mt-4 pt-4 border-t">
            <div className="flex items-center gap-1.5">
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={loading}
                    onClick={() => handleVote('helpful')}
                    className={cn(
                        "h-8 px-2.5 gap-1.5 text-xs font-medium transition-all rounded-lg",
                        userVote === 'helpful' ? "bg-primary/10 text-primary hover:bg-primary/20" : "hover:bg-muted"
                    )}
                >
                    <ThumbsUp className={cn("h-3.5 w-3.5", userVote === 'helpful' && "fill-current")} />
                    <span>Útil</span>
                    {helpfulCount > 0 && <span className="ml-0.5 opacity-60">({helpfulCount})</span>}
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    disabled={loading}
                    onClick={() => handleVote('not_helpful')}
                    className={cn(
                        "h-8 px-2.5 gap-1.5 text-xs font-medium transition-all rounded-lg",
                        userVote === 'not_helpful' ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" : "hover:bg-muted"
                    )}
                >
                    <ThumbsDown className={cn("h-3.5 w-3.5", userVote === 'not_helpful' && "fill-current")} />
                    <span>Não útil</span>
                </Button>
            </div>

            <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2.5 gap-1.5 text-xs font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all rounded-lg ml-auto"
            >
                <Flag className="h-3.5 w-3.5" />
                <span>Denunciar</span>
            </Button>
        </div>
    );
};

export default VoteButtons;
