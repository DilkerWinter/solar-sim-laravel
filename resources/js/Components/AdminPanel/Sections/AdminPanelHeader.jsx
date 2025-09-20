export function AdminPanelHeader() {
    return (
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Painel de Administrador
                </h1>
                <p className="text-gray-600">
                    Gerencie parametros do sistema
                </p>
            </div>
        </div>
    );
}
