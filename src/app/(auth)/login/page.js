import LoginForm from "@/components/auth/login-form";

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const nextPath = params?.next || "/";

  return (
    <div className="flex w-full items-start justify-center py-8">
      <LoginForm nextPath={nextPath} />
    </div>
  );
}
