import { Phone, Mail, MapPin } from "lucide-react";
import FeatureCard from "../UI/FeatureCard";

export default function FithSection() {
  return (
    <section id="fith-section" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Entre em Contato</h2>
          <p className="text-xl text-gray-600">
            Nossa equipe está pronta para ajudar você a começar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <FeatureCard
            title="Telefone"
            description={
              <>
                <p className="text-gray-600">(11) 9999-9999</p>
                <p className="text-sm text-gray-500">Seg-Sex, 8h às 18h</p>
              </>
            }
            icon={Phone}
            color="green"
          />

          <FeatureCard
            title="E-mail"
            description={
              <>
                <p className="text-gray-600">contato@solarsim.com.br</p>
                <p className="text-sm text-gray-500">Resposta em até 24h</p>
              </>
            }
            icon={Mail}
            color="blue"
          />

          <FeatureCard
            title="Endereço"
            description={
              <>
                <p className="text-gray-600">São Paulo, SP</p>
                <p className="text-sm text-gray-500">Atendimento nacional</p>
              </>
            }
            icon={MapPin}
            color="green"
          />
        </div>
      </div>
    </section>
  );
}
