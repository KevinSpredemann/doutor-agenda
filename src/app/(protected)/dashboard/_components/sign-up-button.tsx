"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/_components/ui/button";
import { authClient } from "@/lib/auth-client";

const SignUpButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/authentication");
            },
          },
        })
      }
    >
      Sair
    </Button>
  );
};

export default SignUpButton;
