export default function CreateExtraProduct( {selectedProductType} ) {
    console.log(selectedProductType)
    return (
        <section>
        <hr />
            <h1>
                {selectedProductType.name}
            </h1>
        </section>
    );
}