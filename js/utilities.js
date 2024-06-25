export function formatNumberWithThousandSeparator(number) {
    // Split the number into integer and decimal parts
    let parts = number.toString().split(".");

    // Format the integer part with thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Join the integer and decimal parts with a comma if there is a decimal part
    return parts.join(",");
}