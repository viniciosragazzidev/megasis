import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
async function getData() {
  // Fetch data from your API here.

  return [
    {
      id: "1",
      nome: "Ana Carolina",
      contato: "21980534112",
      equipamentos: [
        {
          nomeEq: "Teste",
          modeloEq: "Teste",
          marcaEq: "Teste",
          numeroSerieEq: "Teste",
          tecnico: "Teste",
          valorTec: 0,
          valorCob: 0,
          status: "Orçamento",
          imagem: null,
          descricao: "Teste",
          acessorios: "Teste",
        },
        {
          nomeEq: "Teste2",
          modeloEq: "Teste2",
          marcaEq: "Teste2",
          numeroSerieEq: "Teste2",
          tecnico: "Teste2",
          valorTec: 0,
          valorCob: 0,
          status: "Teste2",
          imagem: null,
          descricao: "Teste2",
          acessorios: "Teste2",
        },
      ],
    },
    {
      id: "2",
      nome: "Ana Carolina",
      contato: "21980534112",
      equipamentos: [
        {
          nomeEq: "Teste3",
          modeloEq: "Teste3",
          marcaEq: "Teste3",
          numeroSerieEq: "Teste3",
          tecnico: "Teste3",
          valorTec: 0,
          valorCob: 0,
          status: "Teste3",
          imagem: null,
          descricao: "Teste3",
          acessorios: "Teste3",
        },
      ],
    },
  ];
}
const Os = async () => {
  const result = await getData();
  const data = result.map((item) => {
    const equipamento = item.equipamentos[0];
    const quantidade = item.equipamentos.length - 1;

    return {
      id: item.id,
      nome: item.nome,
      contato: item.contato,
      ...equipamento,
      quantidadeEquipamentosAdicionais: quantidade > 0 ? quantidade : undefined,
    };
  });
  console.log(data);

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
