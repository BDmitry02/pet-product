"use client";
import { CommonSelectItem } from "@/components/layout/common-inputs/CommonSelectItem";
import { CommonTextItem } from "@/components/layout/common-inputs/CommonTextItem";
import { uiTexts } from "@/tools/constants/ui/texts";
import { filterTags } from "@/tools/constants/filters/tags";
import { subscriptionFilters } from "@/tools/constants/filters/subscription";
import { ParamVoidFunc } from "@/tools/types/funcs";
import { InputEventHandler, SelectEventHandler } from "@/tools/types/event-handlers-types";
import { textFieldTypes } from "@/tools/constants/text-field-type";
import { elementIds } from "@/tools/constants/test/element-ids";
import { ariaAttributes } from "@/tools/constants/ui/aria-attributes";

interface FilterMenuProps {
    selectedTags: string[];
    onTagChange: ParamVoidFunc<SelectEventHandler>;
    subscription: string;
    onSubscriptionChange: ParamVoidFunc<SelectEventHandler>;
    price: string;
    onPriceChange: ParamVoidFunc<InputEventHandler>;
}

export function FilterMenu({
    selectedTags,
    onTagChange,
    subscription,
    onSubscriptionChange,
    price,
    onPriceChange,
}: FilterMenuProps) {
    return (
        <div className="flex w-full flex-col gap-4">
            <div className="mb-2">
                <h4 className="m-0 text-lg font-semibold text-gray-900">{uiTexts.filters}</h4>
            </div>
            <CommonSelectItem
                label={uiTexts.tags}
                selectOptions={filterTags}
                selectedValue={selectedTags}
                onValueChange={onTagChange}
                isMultiline={true}
                dataTestId={elementIds.filterTagsSelection}
                aria-label={ariaAttributes.tagFilter}
            />
            <CommonSelectItem
                label={uiTexts.subscription}
                selectOptions={subscriptionFilters}
                selectedValue={subscription}
                onValueChange={onSubscriptionChange}
                dataTestId={elementIds.filterSubscriptionSelection}
                aria-label={ariaAttributes.subscriptionFilter}
            />
            <CommonTextItem
                value={price}
                onValueChange={onPriceChange}
                label={uiTexts.price}
                type={textFieldTypes.number}
                dataTestId={elementIds.filterPriceInput}
                aria-label={ariaAttributes.priceFilter}
            />
        </div>
    );
}
