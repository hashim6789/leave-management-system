import type { Role, ThemeType } from "@/types";

export interface ErrorPageProps {
  role: Role;
  theme: ThemeType;
  onRetry?: () => void;
  onGoBack?: () => void;
  onContactSupport?: () => void;
}
export * from "./MaintanancePage";
export * from "./NotFoundPage";
export * from "./ServerErrorPage";
export * from "./ErrorState";
export * from "./NoContentState";
export * from "./LoadingState";
