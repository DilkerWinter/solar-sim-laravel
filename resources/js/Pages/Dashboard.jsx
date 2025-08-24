import { useToast } from '@/Contexts/ToastContext';
import AppLayout from '@/Layouts/AppLayout';

function Dashboard() {
  const { toast, success, error } = useToast();

  return (
    <>
      <h1> Dashboard do sistema </h1>

      <div className="flex gap-4 mt-6">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => error("Algo deu errado!")}
        >
          Erro
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => toast("Informação importante!", "info")}
        >
          Info
        </button>

        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => success("Operação realizada com sucesso!")}
        >
          Success
        </button>
      </div>
    </>
  );
}

Dashboard.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Dashboard;
