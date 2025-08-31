import InverterCreate from "./ExtraProducts/InverterCreate";
import SolarPanelCreate from "./ExtraProducts/SolarPanelCreate";

export default function ProductAdditionalSection({ selectedProductType, onExtraDataChange }) {
    const PRODUCT_COMPONENTS = {
        "inversor": InverterCreate,
        "placa solar": SolarPanelCreate,
    };

    const ProductComponent = PRODUCT_COMPONENTS[selectedProductType.name.toLowerCase()];

    return (
        <section>
            <hr />
            {ProductComponent && (
                <ProductComponent onDataChange={onExtraDataChange} />
            )}
        </section>
    );
}
