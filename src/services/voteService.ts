import { supabase } from "@/integrations/supabase/client";

export const voteReview = async (reviewId: string, userId: string, voteType: 'helpful' | 'not_helpful') => {
    const { data, error } = await supabase
        .from('review_votes')
        .upsert({
            review_id: reviewId,
            voted_by: userId,
            vote_type: voteType,
        }, { onConflict: 'review_id,voted_by' });

    if (error) {
        console.error("Erro ao votar na review:", error);
        throw error;
    }

    return data;
};

export const removeVote = async (reviewId: string, userId: string) => {
    const { error } = await supabase
        .from('review_votes')
        .delete()
        .eq('review_id', reviewId)
        .eq('voted_by', userId);

    if (error) {
        console.error("Erro ao remover voto:", error);
        throw error;
    }
};

export const getReviewVotes = async (reviewId: string) => {
    const { data, error } = await supabase
        .from('review_votes')
        .select('vote_type, voted_by')
        .eq('review_id', reviewId);

    if (error) {
        console.error("Erro ao buscar votos da review:", error);
        return [];
    }

    return data;
};
