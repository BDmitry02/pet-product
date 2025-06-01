import { uiTexts } from "@/tools/constants/ui/texts";
import { CommonTextItem } from "@/components/layout/common-inputs/CommonTextItem";
import { ParamVoidFunc } from "@/tools/types/funcs";
import { InputEventHandler } from "@/tools/types/event-handlers-types";
import { textFieldTypes } from "@/tools/constants/text-field-type";
import { elementIds } from "@/tools/constants/test/element-ids";
import { ariaAttributes } from "@/tools/constants/ui/aria-attributes";

interface PaginationMenuProps {
    itemsPerPage: string;
    onItemsPerPageChange: ParamVoidFunc<InputEventHandler>;
}

export function PaginationMenu({ itemsPerPage, onItemsPerPageChange }: PaginationMenuProps) {
    return (
        <div className="flex w-full flex-col gap-4">
            <div>
                <h4 className="m-0 text-lg font-semibold text-gray-900">Pagination</h4>
            </div>
            <div className="flex flex-col gap-2">
                <CommonTextItem
                    label={uiTexts.itemsPerPage}
                    value={itemsPerPage}
                    onValueChange={onItemsPerPageChange}
                    type={textFieldTypes.number}
                    dataTestId={elementIds.filterItemsPerPageSelection}
                    aria-label={ariaAttributes.itemsPerPageFilter}
                />
            </div>
        </div>
    );
}
