interface FallBackProps {
  isLoading: boolean;
  icon: string;
}
export default function FallBackIcon({ isLoading, icon }: FallBackProps) {
  return (
    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
      {isLoading ? (
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      ) : (
        <span className="text-3xl">{icon}</span>
      )}
    </div>
  );
}
