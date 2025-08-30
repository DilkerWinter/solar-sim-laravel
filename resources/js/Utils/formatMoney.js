export function formatMoney(value) {
    if (value == null || value === "") return "0,00";
    let digits = String(value).replace(/\D/g, "");
    if (digits === "") return "0,00";
    const number = parseFloat(digits) / 100;
    return number.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}