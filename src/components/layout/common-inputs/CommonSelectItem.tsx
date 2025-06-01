import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ParamVoidFunc } from "@/tools/types/funcs";
import { muiSx } from "@/tools/constants/ui/mui-styles";
import { SelectEventHandler } from "@/tools/types/event-handlers-types";

interface FilterSelectItemProps {
    label: string;
    selectOptions: object;
    selectedValue: string[] | string;
    onValueChange: ParamVoidFunc<SelectEventHandler>;
    isMultiline?: boolean;
    dataTestId?: string;
}

export function CommonSelectItem({
    label,
    selectOptions,
    selectedValue,
    onValueChange,
    isMultiline = false,
    dataTestId,
}: FilterSelectItemProps) {
    return (
        <FormControl fullWidth variant="outlined" size="small">
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                multiple={isMultiline}
                value={selectedValue}
                onChange={onValueChange}
                sx={muiSx.burgerMenuSelect}
                data-testid={dataTestId}
            >
                {Object.entries(selectOptions).map(([key, value], i) => (
                    <MenuItem
                        value={key}
                        key={i}
                        data-testid={`${dataTestId}-${value}`}
                        aria-selected={
                            Array.isArray(selectedValue) ? selectedValue.includes(key) : selectedValue === key
                        }
                    >
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
