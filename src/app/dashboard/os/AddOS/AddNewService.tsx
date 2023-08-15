"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/app/tools/components/ui/button";
import NewService from "./NewService";

const AddNewService = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Impede o scroll do body
      document.body.classList.add("overflow-hidden");
      document.body.classList.remove("overflow-auto");

      console.log("isOpen");
    } else {
      document.body.style.overflow = "auto"; // Habilita o scroll do body
      document.body.classList.add("overflow-auto");
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.style.overflow = "auto"; // Certifica-se de reverter o estilo ao desmontar o componente
      document.body.classList.add("overflow-auto");
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return (
    <div className="relative">
      <Button onClick={() => setIsOpen(true)}>Adicionar Serviço</Button>
      <div
        className={`modal-add fixed w-screen h-screen top-0 left-0 bg-dark-bg-lv1 bg-opacity-20 transition-all ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="w-full h-full absolute top-0 left-0  z-40"
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
        <NewService isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default AddNewService;
