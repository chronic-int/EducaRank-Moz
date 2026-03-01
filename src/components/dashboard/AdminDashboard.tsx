import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ShieldCheck, Users, MessageSquare, Newspaper, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import StarRating from "@/components/StarRating";

const AdminDashboard = () => {
    const queryClient = useQueryClient();

    const { data: institutions, isLoading: loadingInst } = useQuery({
        queryKey: ['admin-institutions'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('institutions')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
    });

    const { data: reviews, isLoading: loadingReviews } = useQuery({
        queryKey: ['admin-reviews'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('reviews')
                .select('*, institution:institutions(name), profile:profiles(full_name)')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
    });

    const verifyInstitution = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('institutions')
                .update({ verified: true })
                .eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-institutions'] });
            toast.success("Instituição verificada com sucesso!");
        },
    });

    if (loadingInst || loadingReviews) {
        return <Skeleton className="h-96 w-full rounded-xl" />;
    }

    return (
        <div className="space-y-6">
            <Tabs defaultValue="institutions" className="w-full">
                <TabsList className="grid w-full lg:w-[600px] grid-cols-4 bg-muted/50 p-1">
                    <TabsTrigger value="institutions" className="gap-2">
                        <ShieldCheck className="h-4 w-4" /> Instituições
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="gap-2">
                        <MessageSquare className="h-4 w-4" /> Moderação
                    </TabsTrigger>
                    <TabsTrigger value="users" className="gap-2">
                        <Users className="h-4 w-4" /> Usuários
                    </TabsTrigger>
                    <TabsTrigger value="blog" className="gap-2">
                        <Newspaper className="h-4 w-4" /> Blog
                    </TabsTrigger>
                </TabsList>

                {/* Institutions Tab */}
                <TabsContent value="institutions" className="mt-6">
                    <Card className="card-shadow border-none">
                        <CardHeader>
                            <CardTitle>Gerenciar Instituições</CardTitle>
                            <CardDescription>Aprove e verifique perfis institucionais.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {institutions?.map((inst) => (
                                    <div key={inst.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="font-bold">{inst.name}</p>
                                            <p className="text-sm text-muted-foreground">{inst.type} • {inst.district}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {inst.verified ? (
                                                <span className="text-success text-sm font-medium flex items-center gap-1">
                                                    <CheckCircle className="h-4 w-4" /> Verificado
                                                </span>
                                            ) : (
                                                <Button size="sm" onClick={() => verifyInstitution.mutate(inst.id)}>
                                                    Verificar
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6">
                    <Card className="card-shadow border-none">
                        <CardHeader>
                            <CardTitle>Moderação de Avaliações</CardTitle>
                            <CardDescription>Remova ou edite avaliações denunciadas.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {reviews?.map((review: any) => (
                                    <div key={review.id} className="p-4 border rounded-lg space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-sm">{review.profile?.full_name || "Desconhecido"} sobre {review.institution?.name}</p>
                                                <StarRating rating={review.rating} size="sm" />
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-destructive h-8 px-2 hover:bg-destructive/10">
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {review.comment && <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Placeholder Tabs */}
                <TabsContent value="users" className="mt-6">
                    <Card className="card-shadow border-none p-10 text-center text-muted-foreground">
                        Funcionalidade de gerenciamento de usuários em desenvolvimento.
                    </Card>
                </TabsContent>
                <TabsContent value="blog" className="mt-6">
                    <Card className="card-shadow border-none p-10 text-center text-muted-foreground">
                        Funcionalidade de Blog em desenvolvimento.
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;
