import InverterCard from "../UI/InverterCard";
import SolarPanelCard from "../UI/SolarPanelCard";

export default function ProductAdditionalSection({ selectedProductType, product, setProduct, isEditing }) {
    const PRODUCT_COMPONENTS = {
        "inversor": InverterCard,
        "placa solar": SolarPanelCard,
    };
    
    const ProductComponent = PRODUCT_COMPONENTS[selectedProductType.toLowerCase()];
    
    if (!ProductComponent) return null;
    
    return (
        <section>
            <hr />
            <ProductComponent
                product={product}
                setProduct={setProduct}
                isEditing={isEditing}
            />
        </section>
    );
}