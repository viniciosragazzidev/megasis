"use client";
import { Button } from "@/app/tools/components/ui/button";
import { useToast } from "@/app/tools/components/ui/use-toast";

const Financeiro = () => {
  const { toast } = useToast();

  return (
    <Button
      className=" w-full max-w-[240px] bg-blue-600"
      onClick={() => {
        toast({
          title: "Clicou no botão",
          description: "Descrição do botão financeiro 1",
        });
      }}
      type="button"
    >
      Click
    </Button>
  );
};

export default Financeiro;
