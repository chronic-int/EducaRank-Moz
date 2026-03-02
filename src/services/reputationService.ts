import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export type Profile = Database['public']['Tables']['profiles']['Row'];

export const getProfile = async (id: string): Promise<Profile | null> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error("Erro ao buscar perfil:", error);
        return null;
    }

    return data;
};

export const getPublicProfiles = async (): Promise<Profile[]> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('reputation_score', { ascending: false });

    if (error) {
        console.error("Erro ao buscar perfis públicos:", error);
        return [];
    }

    return data;
};

export const getReputationBadge = (score: number) => {
    if (score >= 50) return { label: "Confiável", color: "bg-green-500", icon: "ShieldCheck" };
    if (score >= 20) return { label: "Contribuidor", color: "bg-blue-500", icon: "Star" };
    return { label: "Novo Membro", color: "bg-slate-400", icon: "User" };
};
