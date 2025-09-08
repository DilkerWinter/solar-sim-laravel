export function formatPhone(val) {
        let digits = val.replace(/\D/g, "").slice(0, 11);

        if (digits.length === 0) {
            return "";
        } else if (digits.length <= 2) {
            return `(${digits}`;
        } else if (digits.length <= 6) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        } else {
            return `(${digits.slice(0, 2)}) ${digits.slice(
                2,
                7
            )}-${digits.slice(7)}`;
        }
    }
