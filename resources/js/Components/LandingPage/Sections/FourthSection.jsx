import { useEffect, useRef, useState } from "react";
import { CheckCircle, Clock, Shield, TrendingUp } from "lucide-react";
import SectionTitle from "../UI/SectionTitle";
import BenefitItem from "../UI/BenefitItem";

const benefits = [
  {
    Icon: TrendingUp,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    title: "Aumento nas Vendas",
    description: "Propostas mais rápidas e precisas resultam em maior taxa de conversão",
  },
  {
    Icon: Clock,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Economia de Tempo",
    description: "Automatize processos e reduza o tempo de criação de propostas em 80%",
  },
  {
    Icon: Shield,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    title: "Precisão Técnica",
    description: "Cálculos automáticos garantem propostas tecnicamente corretas",
  },
  {
    Icon: CheckCircle,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Profissionalismo",
    description: "Propostas padronizadas e com visual profissional",
  },
];

export default function FourthSection() {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          benefits.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index]);
            }, 500 * index); 
          });
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="fourth-section" className="py-20 px-4" ref={sectionRef}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle>Por que escolher o SolarSim?</SectionTitle>
            <p className="text-lg text-gray-600 mb-8">
              Transforme sua empresa de energia solar com nossa solução completa e intuitiva
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ease-out transform ${
                    visibleItems.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <BenefitItem {...benefit} />
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-bl from-green-300 to-blue-300 rounded-2xl p-4 shadow-2xl">
              <img
                src="https://placehold.co/600x600/000000/FFFFFF?text=SolarSim+Dashboard&font=roboto"
                alt="SolarSim Features"
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
