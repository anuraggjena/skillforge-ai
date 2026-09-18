import React from "react";
import { Info, Lightbulb, AlertTriangle, AlertCircle } from "lucide-react";

export type CalloutType = "info" | "tip" | "warning" | "important";

interface DocsCalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig = {
  info: {
    icon: Info,
    borderColor: "border-[#E8E5D5]/25",
    bgColor: "bg-[#E8E5D5]/[0.03]",
    iconColor: "text-[#E8E5D5]/90",
    defaultTitle: "NOTE",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/[0.04]",
    iconColor: "text-amber-300",
    defaultTitle: "TIP",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-orange-500/30",
    bgColor: "bg-orange-500/[0.04]",
    iconColor: "text-orange-400",
    defaultTitle: "WARNING",
  },
  important: {
    icon: AlertCircle,
    borderColor: "border-rose-500/30",
    bgColor: "bg-rose-500/[0.04]",
    iconColor: "text-rose-400",
    defaultTitle: "IMPORTANT",
  },
};

export function DocsCallout({
  type = "info",
  title,
  children,
}: DocsCalloutProps) {
  const config = calloutConfig[type] || calloutConfig.info;
  const Icon = config.icon;
  const displayTitle = title || config.defaultTitle;

  return (
    <div
      className={`my-6 p-4 sm:p-5 rounded-xl border ${config.borderColor} ${config.bgColor} flex items-start gap-3.5 transition-colors`}
    >
      <Icon className={`w-5 h-5 ${config.iconColor} shrink-0 mt-0.5`} />
      <div className="flex-1 text-xs sm:text-sm text-[#E8E5D5]/80 leading-relaxed space-y-1.5">
        {displayTitle && (
          <div className="font-mono text-[11px] font-semibold tracking-wider text-[#E8E5D5] uppercase">
            {displayTitle}
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
