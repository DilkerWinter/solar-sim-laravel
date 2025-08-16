import InverterCreate from "./InverterCreate";
import SolarPanelCreate from "./SolarPanelCreate";

const PRODUCT_COMPONENTS = {
    "inversor": InverterCreate,
    "placa solar": SolarPanelCreate,
};

export default function CreateExtraProduct({ selectedProductType }) {
    const ProductComponent = PRODUCT_COMPONENTS[selectedProductType.name.toLowerCase()];

    return (
        <section>
            <hr />
            <ProductComponent />
        </section>
    );
}
