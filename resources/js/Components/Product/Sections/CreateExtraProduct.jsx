import InverterCreate from "./ExtraProducts/InverterCreate";
import SolarPanelCreate from "./ExtraProducts/SolarPanelCreate";

const PRODUCT_COMPONENTS = {
    "inversor": InverterCreate,
    "placa solar": SolarPanelCreate,
};

export default function CreateExtraProduct({ selectedProductType, onExtraDataChange }) {
    const ProductComponent = PRODUCT_COMPONENTS[selectedProductType.name.toLowerCase()];

    const handleExtraDataChange = (extraData) => {
        onExtraDataChange(extraData);
    };

    return (
        <section>
            <hr />
            <ProductComponent />
        </section>
    );
}
