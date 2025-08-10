import { BarChart, FileText, Headset, Package, Sun, Users } from "lucide-react";
import FeatureCarousel from "../UI/FeatureCarousel";
import SectionTitle from "../UI/SectionTitle";

const cards = [
    {
        title: "Gestão de Clientes",
        description:
            "Cadastre e gerencie todos os seus clientes com informações detalhadas e histórico completo",
        icon: Users,
        color: "green",
    },
    {
        title: "Catálogo de Produtos",
        description:
            "Mantenha seu inventário organizado com especificações técnicas e preços atualizados",
        icon: Package,
        color: "blue",
    },
    {
        title: "Montagem de Kits",
        description:
            "Sistema inteligente que auxilia na criação de kits solares otimizados para cada cliente",
        icon: Sun,
        color: "green",
    },
    {
        title: "Propostas Personalizadas",
        description:
            "Sistema inteligente que auxilia na criação de kits solares otimizados para cada cliente",
        icon: FileText,
        color: "blue",
    },
    {
        title: "Relatórios Detalhados",
        description:
            "Gere relatórios completos sobre vendas, clientes e desempenho do seu negócio em tempo real",
        icon: BarChart,
        color: "green",
    },
    {
        title: "Suporte e Atendimento",
        description:
            "Suporte rápido e eficiente com chat online e sistema de tickets integrado",
        icon: Headset,
        color: "blue",
    },
];

export default function ThirdSection() {
    return (
        <section id="third-section" className="p-8  relative overflow-hidden bg-gradient-to-r from-blue-200 via-white to-green-200">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <SectionTitle>Funcionalidades Principais</SectionTitle>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Tudo que sua empresa precisa para otimizar o processo de
                    vendas de energia solar, com soluções modernas e eficientes
                    para crescer mais rápido.
                </p>
            </div>
            <FeatureCarousel cards={cards} cardsPerPage={4} />
        </section>
    );
}
