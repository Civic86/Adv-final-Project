import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      leftIcon={<ChevronLeftIcon />}
      onClick={handleBack}
      variant="outline"
    >
      Back
    </Button>
  );
}
