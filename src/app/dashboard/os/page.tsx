import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.

  return [
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "999999999",
      equipamento: "Equipamento 1",
      modelo: "Modelo 1",
      tecnico: "Técnico 1",
      valorTec: 100,
      valorCob: 200,
      status: "Orçado",
    },
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "999999999",
      equipamento: "Equipamento 1",
      modelo: "Modelo 1",
      tecnico: "Técnico 1",
      valorTec: 100,
      valorCob: 200,
      status: "Orçamento",
    },
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "999999999",
      equipamento: "Equipamento 1",
      modelo: "Modelo 1",
      tecnico: "Técnico 1",
      valorTec: 100,
      valorCob: 200,
      status: "Autorizado",
    },
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "999999999",
      equipamento: "Equipamento 1",
      modelo: "Modelo 1",
      tecnico: "Técnico 1",
      valorTec: 100,
      valorCob: 200,
      status: "Concluido",
    },
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "999999999",
      equipamento: "Equipamento 1",
      modelo: "Modelo 1",
      tecnico: "Técnico 1",
      valorTec: 100,
      valorCob: 200,
      status: "Concluido",
    },
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "999999999",
      equipamento: "Equipamento 1",
      modelo: "Modelo 1",
      tecnico: "Técnico 1",
      valorTec: 100,
      valorCob: 200,
      status: "Concluido",
    },
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "999999999",
      equipamento: "Equipamento 1",
      modelo: "Modelo 1",
      tecnico: "Técnico 1",
      valorTec: 100,
      valorCob: 200,
      status: "Concluido",
    },
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "999999999",
      equipamento: "Equipamento 1",
      modelo: "Modelo 1",
      tecnico: "Técnico 1",
      valorTec: 100,
      valorCob: 200,
      status: "Concluido",
    },
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "999999999",
      equipamento: "Equipamento 1",
      modelo: "Modelo 1",
      tecnico: "Técnico 1",
      valorTec: 100,
      valorCob: 200,
      status: "Concluido",
    },
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "999999999",
      equipamento: "Equipamento 1",
      modelo: "Modelo 1",
      tecnico: "Técnico 1",
      valorTec: 100,
      valorCob: 200,
      status: "Entregue",
    },
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "999999999",
      equipamento: "Equipamento 1",
      modelo: "Modelo 1",
      tecnico: "Técnico 1",
      valorTec: 100,
      valorCob: 200,
      status: "Concluido",
    },
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "999999999",
      equipamento: "Equipamento 1",
      modelo: "Modelo 1",
      tecnico: "Técnico 2",
      valorTec: 100,
      valorCob: 200,
      status: "Concluido",
    },
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "999999999",
      equipamento: "Equipamento 1",
      modelo: "Modelo 1",
      tecnico: "Técnico 1",
      valorTec: 100,
      valorCob: 200,
      status: "Concluido",
    },
    // ...
  ];
}
const Os = async () => {
  const data = await getData();

  return (
    <div className="p-6">
      <header>
        <h1 className="text-2xl font-bold">
          Ordens de <span className="text-blue-600">Serviço</span>:
        </h1>
      </header>
      <div className=" sm:container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Os;
