import { ShieldCheck, Star, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { getReputationBadge } from "@/services/reputationService";

interface ReputationBadgeProps {
    score: number;
    className?: string;
    showLabel?: boolean;
}

const ReputationBadge = ({ score, className, showLabel = true }: ReputationBadgeProps) => {
    const badge = getReputationBadge(score);

    const Icon = badge.label === "Confiável" ? ShieldCheck : badge.label === "Contribuidor" ? Star : User;

    return (
        <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white", badge.color, className)}>
            <Icon className="h-3 w-3" />
            {showLabel && <span>{badge.label}</span>}
        </div>
    );
};

export default ReputationBadge;
