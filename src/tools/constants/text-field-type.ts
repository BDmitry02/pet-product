export const textFieldTypes = {
    text: "text",
    number: "number",
} as const;

export type TextFieldType = (typeof textFieldTypes)[keyof typeof textFieldTypes];
