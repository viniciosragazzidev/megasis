"use client";
import { Input } from "@/app/tools/components/ui/input";

import { format } from "date-fns";
import { Button } from "@/app/tools/components/ui/button";
import { Calendar } from "@/app/tools/components/ui/calendar";
import { FaPlus, FaMinus, FaCalendar } from "react-icons/fa";
import { AppContext } from "@/app/tools/context/AppContext";
import { useToast } from "@/app/tools/components/ui/use-toast";
import { cn } from "@/app/tools/libs";
import { z } from "zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/tools/components/ui/popover";

import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useContext,
  useEffect,
} from "react";
import { Equipamento } from "@/app/tools/utils/@types";

interface FormData {
  id: string;
  nome: string;
  contato: number[];

  equipamentos: Equipamento[];
}

const equipamentoSchema = z.object({
  nomeEq: z
    .string()
    .min(2, "Nome do Equipamento deve ter pelo menos 2 caracteres"),
  marcaEq: z.string(),
  modeloEq: z.string(),
  numeroSerieEq: z.string(),
  tecnico: z.string(),
  valorTec: z.number().min(0, "Valor Técnico deve ser no mínimo 0"),
  valorCob: z.number().min(0, "Valor Cobrado deve ser no mínimo 0"),
  status: z.string(),
  acessorios: z.string(),
  descricao: z.string(),
});
// Define Zod schemas for your form fields
const schema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  contato: z.array(
    z.number().min(5, "Contato deve ter pelo menos 5 caracteres")
  ),
  equipamentos: z.array(equipamentoSchema.extend({})),
});
const NewService = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [formData, setFormData] = useState<FormData>({
    id: "",
    nome: "",
    contato: [],
    equipamentos: [
      {
        nomeEq: "",
        modeloEq: "",
        marcaEq: "",
        numeroSerieEq: "",
        tecnico: "",
        valorTec: 0,
        valorCob: 0,
        status: "",
        imagem: null,
        descricao: "",
        acessorios: "",
      },
    ],
  });

  const [errors, setErrors] = useState({}); // Inicialize sem erros

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index?: number
  ) => {
    const { name, value } = event.target;
    if (name === "nome") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    if (
      name === "numeroSerieEq" ||
      name === "marcaEq" ||
      name === "modeloEq" ||
      name === "nomeEq" ||
      name === "valorTec" ||
      name === "valorCob" ||
      name === "status" ||
      name === "imagem" ||
      name === "descricao" ||
      name === "acessorios" ||
      name === "tecnico"
    ) {
      const copyFormDataEquipamentos = [...formData.equipamentos];
      const indexA: number = Number(index);
      copyFormDataEquipamentos[indexA] = {
        ...copyFormDataEquipamentos[indexA],
        [name]: value,
      };

      setEquipamentos(copyFormDataEquipamentos);

      setFormData((prevFormData) => ({
        ...prevFormData,
        equipamentos: copyFormDataEquipamentos,
      }));
    }

    if (name === "contato" && index !== undefined) {
      // set value in obj by index in contatos

      const copyFormDataContatos = [...formData.contato];
      copyFormDataContatos[index] = Number(value);

      setFormData((prevFormData) => ({
        ...prevFormData,
        contato: copyFormDataContatos,
      }));
    }
    // Validate the field and update errors
    // Validate the field and update errors
    const validationResult = schema
      .pick({ [name]: true })
      .safeParse({ [name]: value });

    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: validationResult.success
        ? undefined
        : validationResult.error.issues[0]?.message,
    }));
  };

  const [contatos, setContatos] = useState<number[]>([0]);

  const handleAddMoreContato = () => {
    if (contatos.length < 2) {
      setContatos([Number(formData.contato[0]), 0]);
      formData.contato = [Number(formData.contato[0]), 0];
    } else {
      setContatos([Number(formData.contato[0])]);
    }
  };

  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([
    {
      nomeEq: "",
      modeloEq: "",
      marcaEq: "",
      numeroSerieEq: "",
      tecnico: "",
      valorTec: 0,
      valorCob: 0,
      status: "",
      imagem: null,
      descricao: "",
      acessorios: "",
    },
  ]);
  const handleAddMoreEquipamento = () => {
    setEquipamentos([
      ...equipamentos,
      {
        nomeEq: "",
        modeloEq: "",
        marcaEq: "",
        numeroSerieEq: "",
        tecnico: "",
        valorTec: 0,
        valorCob: 0,
        status: "",
        imagem: null,
        descricao: "",
        acessorios: "",
      },
    ]);
    formData.equipamentos = [
      ...equipamentos,
      {
        nomeEq: "",
        modeloEq: "",
        marcaEq: "",
        numeroSerieEq: "",
        tecnico: "",
        valorTec: 0,
        valorCob: 0,
        status: "",
        imagem: null,
        descricao: "",
        acessorios: "",
      },
    ];
    console.log(equipamentos);
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files && event.target.files[0];
    formData.equipamentos[0].imagem = imageFile || null;
  };
  const { toast } = useToast();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const numericFormData = {
      ...formData,
      equipamentos: formData.equipamentos.map((equipamento) => ({
        ...equipamento,
        valorCob: Number(equipamento.valorCob),
        valorTec: Number(equipamento.valorTec),
      })),
    };
    const validationResult = schema.safeParse(numericFormData);

    if (validationResult.success) {
      setIsOpen(false);
      console.log(formData);
      const DateAndHourFormated = format(new Date(), "dd/MM/yyyy HH:mm");
      toast({
        title: `${formData.nome} foi adicionado com sucesso ✅`,
        description: `⏳ Data e hora: ${DateAndHourFormated}`,
      });
      setFormData({
        id: "",
        nome: "",
        contato: [],
        equipamentos: [
          {
            nomeEq: "",
            modeloEq: "",
            marcaEq: "",
            numeroSerieEq: "",
            tecnico: "",
            valorTec: 0,
            valorCob: 0,
            status: "",
            imagem: null,
            descricao: "",
            acessorios: "",
          },
        ],
      });
    } else {
      console.log(validationResult.error.flatten());
      setErrors(validationResult.error.flatten()); // Use o método flatten para obter os erros em um objeto
      toast({
        title: "Ops! 🚫",
        description: "Preencha os campos corretamente",
      });
    }
  };
  const [date, setDate] = React.useState<Date>();

  const reset = () => {
    setContatos([0]);
    setEquipamentos([
      {
        nomeEq: "",
        modeloEq: "",
        marcaEq: "",
        numeroSerieEq: "",
        tecnico: "",
        valorTec: 0,
        valorCob: 0,
        status: "",
        imagem: null,
        descricao: "",
        acessorios: "",
      },
    ]);
    setFormData({
      id: "",
      nome: "",
      contato: [],
      equipamentos: [
        {
          nomeEq: "",
          modeloEq: "",
          marcaEq: "",
          numeroSerieEq: "",
          tecnico: "",
          valorTec: 0,
          valorCob: 0,
          status: "",
          imagem: null,
          descricao: "",
          acessorios: "",
        },
      ],
    });
  };
  useEffect(() => {
    reset();
  }, [isOpen]);

  const { statusItens, setStatusItens, tecnicosItens, setTecnicosItens } =
    useContext(AppContext);
  return (
    <div
      className={` boxAdd  fixed top-0 right-[0] w-screen sm:max-w-3xl h-screen bg-dark-bg-lv1 z-[99999]  px-5 py-7 text-light-bg-lv2 overflow-y-auto  ${
        isOpen && "open"
      }`}
    >
      <header className="px-4 flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Adicione um novo serviço</h1>
        <p className="text-sm text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </header>
      <div className="content">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col gap-3 pt-6 px-6 "
        >
          <div className="inputArea grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className=" flex flex-1 flex-col gap-2">
              <label htmlFor="nome" className="text-gray-400 text-sm">
                Nome do Cliente
              </label>
              <Input
                name="nome"
                className=""
                onChange={handleInputChange}
                placeholder=""
                value={formData.nome}
              />
            </div>
            <div className=" flex flex-1 flex-col gap-2">
              <div className="inputArea flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="contato" className="text-gray-400 text-sm">
                    Contato
                  </label>
                  {contatos.length == 1 ? (
                    <span
                      className="text-sm active:scale-95 transition-all cursor-pointer"
                      onClick={handleAddMoreContato}
                    >
                      <FaPlus />
                    </span>
                  ) : (
                    <span
                      className="text-sm active:scale-95 transition-all cursor-pointer"
                      onClick={handleAddMoreContato}
                    >
                      <FaMinus />
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {contatos.map((contato, index) => (
                    <Input
                      key={index}
                      name="contato"
                      className=""
                      value={formData.contato[index]}
                      onChange={(e) => {
                        handleInputChange(e, index);
                      }}
                      placeholder=""
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="divide w-full h-[1px] opacity-25 bg-slate-700"></div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold "> Equipamento</h1>
              <div className="buttonsArea flex items-center gap-2">
                <div>
                  {formData.equipamentos.map((equipamento, index) => (
                    <span key={index}>Item {index + 1}</span>
                  ))}
                </div>
                <Button
                  onClick={handleAddMoreEquipamento}
                  type="button"
                  size="sm"
                >
                  <FaPlus />
                </Button>
              </div>
            </div>
            {formData.equipamentos.map((equipamento, index) => (
              <>
                <div className="inputArea grid grid-cols-2 max-sm:grid-cols-1 gap-4">
                  <div className=" flex flex-1 flex-col gap-2">
                    <label htmlFor="nome" className="text-gray-400 text-sm">
                      Nome do Equipamento
                    </label>
                    <Input
                      name="nomeEq"
                      className=""
                      value={formData.equipamentos[index].nomeEq}
                      onChange={(e) => {
                        handleInputChange(e, index);
                      }}
                      placeholder=""
                    />
                  </div>
                  <div className=" flex flex-1 flex-col gap-2">
                    <label htmlFor="nome" className="text-gray-400 text-sm">
                      Marca
                    </label>
                    <Input
                      name="marcaEq"
                      className=""
                      value={formData.equipamentos[index].marcaEq}
                      onChange={(e) => {
                        handleInputChange(e, index);
                      }}
                      placeholder=""
                    />
                  </div>
                  <div className=" flex flex-1 flex-col gap-2">
                    <label htmlFor="nome" className="text-gray-400 text-sm">
                      Modelo
                    </label>
                    <Input
                      name="modeloEq"
                      className=""
                      value={formData.equipamentos[index].modeloEq}
                      onChange={(e) => {
                        handleInputChange(e, index);
                      }}
                      placeholder=""
                    />
                  </div>
                  <div className=" flex flex-1 flex-col gap-2">
                    <label htmlFor="nome" className="text-gray-400 text-sm">
                      Numero de Série
                    </label>
                    <Input
                      name="numeroSerieEq"
                      className=""
                      value={formData.equipamentos[index].numeroSerieEq}
                      onChange={(e) => {
                        handleInputChange(e, index);
                      }}
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="inputArea grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                  <div className=" flex flex-1 flex-col gap-2">
                    <label htmlFor="nome" className="text-gray-400 text-sm">
                      Técnico
                    </label>
                    <select
                      name="tecnico"
                      id="tecnico"
                      value={formData.equipamentos[index].tecnico}
                      onChange={(e) => {
                        handleInputChange(e, index);
                      }}
                      className="bg-transparent border cursor-pointer outline-none border-gray-200 hover:bg-slate-100 hover:text-dark-bg-lv2 transition-all rounded px-2  h-full accent-slate-800"
                    >
                      {tecnicosItens.map((tecnico) => (
                        <option
                          className="accent-slate-800 text-light-bg-lv3 bg-dark-bg-lv2 hover:text-dark-bg-lv2 cursor-pointer "
                          key={tecnico}
                          value={tecnico}
                        >
                          {tecnico}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className=" flex flex-1 flex-col gap-2">
                    <label htmlFor="nome" className="text-gray-400 text-sm">
                      Valor Técnico
                    </label>
                    <Input
                      name="valorTec"
                      className=""
                      value={formData.equipamentos[index].valorTec}
                      onChange={(e) => {
                        handleInputChange(e, index);
                      }}
                      placeholder=""
                    />
                  </div>
                  <div className=" flex flex-1 flex-col gap-2">
                    <label htmlFor="nome" className="text-gray-400 text-sm">
                      Valor Cobrado
                    </label>
                    <Input
                      name="valorCob"
                      className=""
                      value={formData.equipamentos[index].valorCob}
                      onChange={(e) => {
                        handleInputChange(e, index);
                      }}
                      placeholder=""
                    />
                  </div>
                  <div className=" flex flex-1 flex-col gap-2">
                    <label htmlFor="nome" className="text-gray-400 text-sm">
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      value={formData.equipamentos[index].status}
                      onChange={(e) => {
                        handleInputChange(e, index);
                      }}
                      className="bg-transparent border cursor-pointer outline-none border-gray-200 hover:bg-slate-100 hover:text-dark-bg-lv2 transition-all rounded px-2  h-full accent-slate-800"
                    >
                      {statusItens.map((status) => (
                        <option
                          className="accent-slate-800 text-light-bg-lv3 bg-dark-bg-lv2 hover:text-dark-bg-lv2 cursor-pointer "
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>

                    {/* <Input
                name="status"
                value={formData.status}
                className=""
                onChange={handleInputChange}
                placeholder=""
              /> */}
                  </div>
                </div>

                <div className="inputArea grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className=" flex flex-1 flex-col gap-2">
                    <label htmlFor="nome" className="text-gray-400 text-sm">
                      Acessórios
                    </label>
                    <Input
                      name="acessorios"
                      value={formData.equipamentos[index].acessorios}
                      onChange={(e) => {
                        handleInputChange(e, index);
                      }}
                      placeholder=""
                    />
                  </div>
                  <div className=" flex flex-1 flex-col gap-2">
                    <label htmlFor="nome" className="text-gray-400 text-sm">
                      Data de Entrada
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal btnPro",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <FaCalendar className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className=" flex flex-1 flex-col gap-2">
                  <label htmlFor="nome" className="text-gray-400 text-sm">
                    Descrição
                  </label>
                  <textarea
                    name="descricao"
                    id="descricao"
                    value={formData.equipamentos[index].descricao}
                    onChange={(e) => {
                      handleInputChange(e, index);
                    }}
                    className="bg-transparent border border-slate-200 focus:border-blue-500 p-2 rounded-md h-40"
                  />
                </div>
              </>
            ))}
          </div>

          <div className="flex justify-center">
            <Button type="submit" className=" w-full max-w-[240px] bg-blue-600">
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewService;
