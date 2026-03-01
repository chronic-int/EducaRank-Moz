import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import UserDashboard from "@/components/dashboard/UserDashboard";
import InstitutionDashboard from "@/components/dashboard/InstitutionDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const { user, profile, loading, isAdmin, isInstitution } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container py-10">
                    <Skeleton className="h-12 w-64 mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Skeleton className="h-32 rounded-xl" />
                        <Skeleton className="h-32 rounded-xl" />
                        <Skeleton className="h-32 rounded-xl" />
                    </div>
                    <Skeleton className="h-96 w-full mt-10 rounded-xl" />
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        Olá, {profile?.full_name || user.email?.split('@')[0]}
                    </h1>
                    <p className="text-muted-foreground">
                        {isAdmin ? "Painel de Administração" : isInstitution ? "Painel da Instituição" : "Seu Painel de Atividade"}
                    </p>
                </div>

                {isAdmin ? (
                    <AdminDashboard />
                ) : isInstitution ? (
                    <InstitutionDashboard />
                ) : (
                    <UserDashboard />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
