export function validateFields<T>(
data: T,
requiredFields: readonly (keyof T)[]
): boolean {
return requiredFields.every(field => {
const value = data[field];
 
return (
value !== null &&
value !== undefined &&
value !== ''
);
});
}