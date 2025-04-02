export function formatMobilePhone(value: string | undefined = "") {
  if (!value) return "";

  const checkedValue = value.toUpperCase().replace(/[^\dX]/g, "");
  let joinedValue = "";

  if (checkedValue.length === 10) {
    return checkedValue.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else if (checkedValue.length === 11) {
    return checkedValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (checkedValue.length > 11) {
    return checkedValue
      .slice(0, 11)
      .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else {
    joinedValue = value;
  }

  joinedValue = joinedValue.replace(/^([A-Z]|[a-z])/g, "");

  return joinedValue;
}
