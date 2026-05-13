import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "../ui/utils";

export interface AgentAvatar {
  name: string;
  avatarUrl?: string;
}

export interface AgentAvatarStackProps {
  agents: AgentAvatar[];
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AgentAvatarStack({
  agents,
  max = 3,
  className,
  size = "sm"
}: AgentAvatarStackProps) {
  const displayAgents = agents.slice(0, max);
  const remaining = agents.length - max;

  const sizeClasses = {
    sm: "size-7 text-[10px]",
    md: "size-8 text-xs",
    lg: "size-10 text-sm"
  };

  return (
    <div className={cn("flex items-center -space-x-2.5", className)}>
      {displayAgents.map((agent, i) => (
        <Avatar 
          key={i} 
          className={cn(
            sizeClasses[size], 
            "border-2 border-background ring-1 ring-black/5 shrink-0"
          )}
        >
          {agent.avatarUrl && <AvatarImage src={agent.avatarUrl} alt={agent.name} className="object-cover" />}
          <AvatarFallback className="font-semibold bg-muted text-muted-foreground">
            {agent.name.split(" ").map(n => n[0]).join("").toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
      {remaining > 0 && (
        <div 
          className={cn(
            sizeClasses[size],
            "flex items-center justify-center rounded-full bg-muted border-2 border-background ring-1 ring-black/5 text-muted-foreground font-bold shrink-0 z-10"
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
