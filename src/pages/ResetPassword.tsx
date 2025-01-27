import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src="/lovable-uploads/14905b3c-b496-4a89-a553-9f9a13204bc6.png"
          alt="shsimmobilier"
          className="mx-auto h-24 w-auto"
        />
      </div>

      <div className="mt-8">
        <ResetPasswordForm />
      </div>
    </div>
  );
}