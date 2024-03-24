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
      position={'absolute'}
      bg={'#fff'}
      mt={5}
      ml={5}
    >
      Back
    </Button>
  );
}
