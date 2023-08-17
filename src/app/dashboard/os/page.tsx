import { columns } from "./columns";
import { DataTable } from "./data-table";
async function getData() {
  let data;
  if (typeof window !== "undefined") {
    data = localStorage.getItem("data");
  }
  if (data === null || data === undefined) {
    return (data = []);
  }
  const parsedData = JSON.parse(data);
  return parsedData;
}
const Os = async () => {
  const data = await getData();

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
