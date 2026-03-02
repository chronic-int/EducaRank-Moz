import { supabase } from "@/integrations/supabase/client";

export const reportReview = async (reviewId: string, userId: string, reason: string) => {
    const { data, error } = await supabase
        .from('review_reports')
        .insert({
            review_id: reviewId,
            reported_by: userId,
            reason,
            status: 'pending'
        });

    if (error) {
        console.error("Erro ao denunciar review:", error);
        throw error;
    }

    return data;
};
