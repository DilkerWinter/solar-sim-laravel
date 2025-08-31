
export default function ProductAdditionalSection({ selectedProductType, onExtraDataChange }) {
    const PRODUCT_COMPONENTS = {
        "inversor": <h1>,</h1>,
        "placa solar": <h1></h1>,
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
