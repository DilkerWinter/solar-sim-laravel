import AddressCard from "../UI/AddressCard";

export default function CustomerAddresSection( {customer} ) {
    return (
        <AddressCard
        addresses={customer.addresses}
      />
    );
}