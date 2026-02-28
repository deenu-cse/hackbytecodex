import { Badge } from "@/components/ui/badge";

const tierConfig = {
  BRONZE: {
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    gradient: "from-orange-600 to-amber-600"
  },
  SILVER: {
    color: "text-gray-300",
    bg: "bg-gray-500/10",
    border: "border-gray-500/20",
    gradient: "from-gray-500 to-slate-400"
  },
  GOLD: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    gradient: "from-yellow-500 to-amber-500"
  },
  PLATINUM: {
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    gradient: "from-cyan-500 to-blue-500"
  }
};

export default function TierBadge({ tier, showLabel = true, size = "default" }) {
  const config = tierConfig[tier] || tierConfig.BRONZE;
  
  const sizeClasses = {
    small: "px-2 py-0.5 text-xs",
    default: "px-3 py-1 text-sm",
    large: "px-4 py-1.5 text-base"
  };
  
  return (
    <Badge 
      className={`${config.bg} ${config.color} ${config.border} ${sizeClasses[size]} border font-medium capitalize`}
    >
      {showLabel && tier?.toLowerCase()}
    </Badge>
  );
}

export function TierGradient({ tier, children, className = "" }) {
  const config = tierConfig[tier] || tierConfig.BRONZE;
  return (
    <div className={`bg-gradient-to-br ${config.gradient} ${className}`}>
      {children}
    </div>
  );
}
