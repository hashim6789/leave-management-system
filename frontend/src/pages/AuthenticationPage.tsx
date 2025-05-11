import { LoginForm } from "@/components/login-form";
export function AuthenticationPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gray-100">
      <div className="w-full max-w-md flex flex-col items-center space-y-6">
        <LoginForm />
      </div>
    </div>
  );
}
