import { TextField } from "@mui/material";
import { InputEventHandler } from "@/tools/types/event-handlers-types";
import { ParamVoidFunc } from "@/tools/types/funcs";
import { TextFieldType, textFieldTypes } from "@/tools/constants/text-field-type";

interface FilterTextItemProps {
    value: string;
    onValueChange: ParamVoidFunc<InputEventHandler>;
    label: string;
    type?: TextFieldType;
    dataTestId?: string;
}

export function CommonTextItem({
    value,
    onValueChange,
    label,
    type = textFieldTypes.text,
    dataTestId,
}: FilterTextItemProps) {
    return (
        <TextField
            className="w-full"
            value={value}
            onChange={onValueChange}
            label={label}
            type={type}
            slotProps={{
                input: {
                    id: dataTestId,
                },
            }}
        />
    );
}
