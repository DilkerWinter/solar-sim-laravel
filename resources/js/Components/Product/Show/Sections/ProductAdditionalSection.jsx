import InverterCard from "../UI/InverterCard";

export default function ProductAdditionalSection({ selectedProductType, onExtraDataChange }) {
    const PRODUCT_COMPONENTS = {
        "inversor": InverterCard,
        "placa solar": <h1>placa</h1>,
    };

    const ProductComponent = PRODUCT_COMPONENTS[selectedProductType.toLowerCase()];
    
    if (!ProductComponent) return null;

    return (
        <section>
            <hr />
            {ProductComponent && (
                <ProductComponent onDataChange={onExtraDataChange} />
            )}
        </section>
    );
}
