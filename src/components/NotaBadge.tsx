interface NotaBadgeProps {
  nota: number;
  size?: "sm" | "md" | "lg";
}

const NotaBadge = ({ nota, size = "md" }: NotaBadgeProps) => {
  const colorClass =
    nota >= 4
      ? "bg-success text-success-foreground"
      : nota >= 3
      ? "bg-warning text-warning-foreground"
      : "bg-danger text-danger-foreground";

  const sizeClass =
    size === "lg"
      ? "text-3xl font-extrabold px-5 py-3 rounded-xl"
      : size === "md"
      ? "text-base font-bold px-3 py-1.5 rounded-lg"
      : "text-sm font-semibold px-2 py-1 rounded-md";

  return <span className={`inline-flex items-center ${colorClass} ${sizeClass}`}>{nota.toFixed(1)}</span>;
};

export default NotaBadge;
