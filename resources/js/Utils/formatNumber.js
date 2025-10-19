export function formatDecimal(value) {
    if (value == null || value === "") return "0,00";
    let digits = String(value).replace(/\D/g, "");
    if (digits === "") return "0,00";
    const number = parseFloat(digits) / 100;
    return number.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export function formatMoneyWithPrefix(value) {
    if (value == null || value === "") return "R$ 0,00";
    let digits = String(value).replace(/\D/g, "");
    if (digits === "") return "R$ 0,00";
    const number = parseFloat(digits) / 100;
    return "R$ " + number.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export function parseToCents(value) {
  if (value == null || value === "") return 0;
  let digits = String(value).replace(/\D/g, "");
  return parseInt(digits, 10) || 0; 
};
