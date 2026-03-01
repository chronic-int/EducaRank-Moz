import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, TrendingUp, CheckCircle, AlertCircle, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotaBadge from "@/components/NotaBadge";

const InstitutionDashboard = () => {
    const { user } = useAuth();

    const { data: institution, isLoading } = useQuery({
        queryKey: ['institution-dashboard', user?.id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('institutions')
                .select('*')
                .eq('owner_id', user?.id)
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            return data;
        },
        enabled: !!user?.id,
    });

    if (isLoading) {
        return <Skeleton className="h-96 w-full rounded-xl" />;
    }

    if (!institution) {
        return (
            <Card className="card-shadow border-none p-10 text-center">
                <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
                <CardTitle className="mb-2">Nenhuma Instituição Associada</CardTitle>
                <p className="text-muted-foreground mb-6">
                    Você ainda não possui uma instituição vinculada ao seu perfil. Se você é um representante institucional, entre em contato com o suporte.
                </p>
                <Button>Solicitar Vinculação</Button>
            </Card>
        );
    }

    return (
        <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="card-shadow border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Status de Verificação</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {institution.verified ? (
                            <div className="flex items-center gap-2 text-success font-semibold">
                                <CheckCircle className="h-5 w-5" /> Verificado
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-warning font-semibold">
                                <AlertCircle className="h-5 w-5" /> Pendente
                            </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                            {institution.verified ? "Sua instituição é confiável." : "Aguardando aprovação do administrador."}
                        </p>
                    </CardContent>
                </Card>

                <Card className="card-shadow border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Média Global</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{institution.average_rating || 0}</div>
                        <NotaBadge nota={institution.average_rating || 0} size="md" />
                    </CardContent>
                </Card>

                <Card className="card-shadow border-none">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{institution.total_reviews || 0}</div>
                        <TrendingUp className="h-5 w-5 text-primary" />
                    </CardContent>
                </Card>
            </div>

            {/* Profile Management */}
            <Card className="card-shadow border-none">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-primary" />
                        Perfil Institucional
                    </CardTitle>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" /> Editar Perfil
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-muted-foreground uppercase">Nome</label>
                                <p className="font-semibold">{institution.name}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-muted-foreground uppercase">Tipo</label>
                                <p className="font-semibold">{institution.type}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-muted-foreground uppercase">Distrito</label>
                                <p className="font-semibold">{institution.district}</p>
                            </div>
                        </div>
                        <div className="space-y-4 text-center md:text-left">
                            <div className="w-24 h-24 bg-muted rounded-xl mx-auto md:mx-0 flex items-center justify-center overflow-hidden">
                                {institution.logo_url ? (
                                    <img src={institution.logo_url} alt="Logo" className="w-full h-full object-cover" />
                                ) : (
                                    <Building className="h-10 w-10 text-muted-foreground" />
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">Logo da Instituição</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default InstitutionDashboard;
