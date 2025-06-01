import { useCallback, useState, ChangeEvent } from "react";
import { SelectEventHandler } from "@/tools/types/event-handlers-types";

export function useSelectState(initialValue: string = "") {
    const [selectValue, setSelectValue] = useState<string>(initialValue);

    const onSelectValueChange = useCallback((event: SelectEventHandler) => {
        setSelectValue(event.target.value as string);
    }, []);

    return { selectValue, setSelectValue, onSelectValueChange };
}

export function useMultiSelectState(initialValue: string[] = []) {
    const [multiSelectValue, setMultiSelectValue] = useState<string[]>(initialValue);

    const onMultiSelectValueChange = useCallback((event: SelectEventHandler) => {
        setMultiSelectValue(event.target.value as string[]);
    }, []);

    return { multiSelectValue, setMultiSelectValue, onMultiSelectValueChange };
}

export function useTextState(initialValue: string = "") {
    const [textValue, setTextValue] = useState<string>(initialValue);

    const onTextValueChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTextValue(e.target.value);
    }, []);

    return { textValue, setTextValue, onTextValueChange };
}
