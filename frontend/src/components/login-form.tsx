import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/hooks/useAuth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { register, handleSubmit, errors, login, isLoading, error } = useAuth();

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(login)} // ✅ connection
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          className="border px-3 py-2 rounded-md"
          {...register("role")}
        >
          <option value="">Select your role</option>
          <option value="admin">Admin</option>
          <option value="approver">Approver</option>
          <option value="employee">Employee</option>
        </select>
        {errors.role && (
          <span className="text-red-500 text-sm">{errors.role.message}</span>
        )}
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
      </div>
    </form>
  );
}
