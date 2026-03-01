import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Star, Settings } from "lucide-react";
import StarRating from "@/components/StarRating";

const UserDashboard = () => {
    const { user } = useAuth();

    const { data: userReviews, isLoading } = useQuery({
        queryKey: ['user-reviews', user?.id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('reviews')
                .select('*, institution:institutions(*)')
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        },
        enabled: !!user?.id,
    });

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Skeleton className="h-24 rounded-xl" />
                    <Skeleton className="h-24 rounded-xl" />
                    <Skeleton className="h-24 rounded-xl" />
                </div>
                <Skeleton className="h-64 w-full rounded-xl" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="card-shadow border-none">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Suas Avaliações</CardTitle>
                        <MessageSquare className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userReviews?.length || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total de instituições avaliadas</p>
                    </CardContent>
                </Card>
            </div>

            {/* Reviews History */}
            <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Histórico de Avaliações
                </h2>
                <div className="space-y-4">
                    {userReviews && userReviews.length > 0 ? (
                        userReviews.map((review) => (
                            <Card key={review.id} className="card-shadow border-none hover:bg-muted/30 transition-colors">
                                <CardContent className="p-5">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold text-lg">{review.institution?.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <StarRating rating={review.rating} size="sm" />
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {review.comment && (
                                                <p className="text-sm text-muted-foreground mt-2 italic">"{review.comment}"</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card className="card-shadow border-none p-10 text-center">
                            <p className="text-muted-foreground">Você ainda não avaliou nenhuma instituição.</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
