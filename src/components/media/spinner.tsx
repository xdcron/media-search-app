export default function SelectSpinner() {
  return (
    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
}
