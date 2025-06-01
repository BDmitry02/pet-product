"use client";

import { AppDispatch } from "@/tools/redux/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { PaginationMenu } from "@/components/layout/pagination-menu/PaginationMenu";
import { FilterMenu } from "@/components/layout/filter-menu/FilterMenu";
import { muiSx } from "@/tools/constants/ui/mui-styles";
import { useMultiSelectState, useSelectState, useTextState } from "@/tools/hooks/useInputStates";
import { uiTexts } from "@/tools/constants/ui/texts";
import {
    clearPagination,
    getAllProducts,
    getFilteredAndPaginatedProducts,
} from "@/tools/redux/slices/products-slice";
import { elementIds } from "@/tools/constants/test/element-ids";
import { ariaAttributes } from "@/tools/constants/ui/aria-attributes";

export function FiltersAndPaginationMenu() {
    const dispatch = useDispatch<AppDispatch>();

    const {
        textValue: itemsPerPage,
        setTextValue: setItemsPerPage,
        onTextValueChange: onItemsPerPageChange,
    } = useTextState();

    const {
        multiSelectValue: selectedTags,
        setMultiSelectValue: setSelectedTags,
        onMultiSelectValueChange: onTagChange,
    } = useMultiSelectState();

    const {
        selectValue: subscription,
        setSelectValue: setSubscriptions,
        onSelectValueChange: onSubscriptionChange,
    } = useSelectState();

    const { textValue: price, setTextValue: setPrice, onTextValueChange: onPriceChange } = useTextState();

    const onApplyClick = useCallback(() => {
        dispatch(
            getFilteredAndPaginatedProducts({
                itemsPerPage,
                tags: selectedTags,
                subscription,
                price,
            }),
        );
    }, [dispatch, itemsPerPage, price, selectedTags, subscription]);

    const onResetClick = useCallback(() => {
        dispatch(clearPagination());
        dispatch(getAllProducts());
        setItemsPerPage("");
        setSelectedTags([]);
        setSubscriptions("");
        setPrice("");
    }, [dispatch, setItemsPerPage, setPrice, setSelectedTags, setSubscriptions]);

    return (
        <section
            aria-label={ariaAttributes.filterSidebar}
            data-testid={elementIds.filterSidebar}
            className="flex flex-col gap-4"
        >
            <PaginationMenu itemsPerPage={itemsPerPage} onItemsPerPageChange={onItemsPerPageChange} />
            <FilterMenu
                selectedTags={selectedTags}
                onTagChange={onTagChange}
                subscription={subscription}
                onSubscriptionChange={onSubscriptionChange}
                price={price}
                onPriceChange={onPriceChange}
            />
            <div className="flex gap-2">
                <Button
                    variant="outlined"
                    className="w-full"
                    onClick={onApplyClick}
                    sx={muiSx.buttonNoTextTransform}
                    data-testid={elementIds.filterApplyButton}
                    aria-label={ariaAttributes.applyFilters}
                >
                    {uiTexts.apply}
                </Button>
                <Button
                    variant="outlined"
                    className="w-full"
                    onClick={onResetClick}
                    sx={muiSx.buttonNoTextTransform}
                    data-testid={elementIds.filterResetButton}
                    aria-label={ariaAttributes.resetFilters}
                >
                    {uiTexts.reset}
                </Button>
            </div>
        </section>
    );
}
