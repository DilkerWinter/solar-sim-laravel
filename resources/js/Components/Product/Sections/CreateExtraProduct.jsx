import InverterCreate from "./InverterCreate";
import SolarPanelCreate from "./SolarPanelCreate";

const PRODUCT_COMPONENTS = {
  'inversor': InverterCreate,
  'painel solar': SolarPanelCreate,
};

export default function CreateExtraProduct({ selectedProductType }) {
  if (!selectedProductType || !selectedProductType.name) {
    return (
      <section>
        <hr />
        <h1>Carregando tipo de produto...</h1>
      </section>
    );
  }

  const ProductComponent = PRODUCT_COMPONENTS[selectedProductType.name.toLowerCase()];
  
  return (
    <section>
      <hr />
        <ProductComponent/>
    </section>
  );
}