import BackButton from "@/Components/Customer/Create/BackButton";

export default function CreteProductHeader() {
    return (
        <div>
            <div className="relative w-full max-w-5xl mx-auto pt-4">
                <BackButton />
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
                        Cadastro de Produto
                    </h1>
                </div>
            </div>
        </div>
    );
}
