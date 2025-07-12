import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold">Access Denied</h1>
      <p className="mt-2 text-muted-foreground">
        You do not have the necessary permissions to view this page.
      </p>
    </main>
  );
}