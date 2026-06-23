"use client";

export interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="ls-title">诗云</div>
      <div className="ls-sub">Poetry Cloud</div>
    </div>
  );
}
