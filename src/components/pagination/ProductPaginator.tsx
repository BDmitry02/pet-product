"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@mui/material";
import { getPaginatedProduct, paginationSelector, setTotalCount } from "@/tools/redux/slices/products-slice";
import { AppDispatch } from "@/tools/redux/store";
import { PaginationEventHandler } from "@/tools/types/event-handlers-types";
import { elementIds } from "@/tools/constants/test/element-ids";
import { ariaAttributes } from "@/tools/constants/ui/aria-attributes";

interface ProductPaginatorProps {
    totalCount: number;
}

export function ProductPaginator({ totalCount }: ProductPaginatorProps) {
    const dispatch = useDispatch<AppDispatch>();
    const pagination = useSelector(paginationSelector);

    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        dispatch(setTotalCount(totalCount));
    }, [dispatch, totalCount]);

    const pageCount = useMemo(() => {
        return Math.ceil(pagination.totalCount / pagination.itemsPerPage);
    }, [pagination.totalCount, pagination.itemsPerPage]);

    const onPageChange = useCallback(
        (event: PaginationEventHandler, page: number) => {
            setPageNumber(page);
            dispatch(getPaginatedProduct(page));
        },
        [dispatch],
    );

    return (
        <Pagination
            count={pageCount}
            variant="outlined"
            page={pageNumber}
            onChange={onPageChange}
            data-testid={elementIds.productPagination}
            aria-label={ariaAttributes.productPagination}
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    id={item.type === "page" ? `page-${item.page}` : `control-${item.type}`}
                    data-testid={elementIds.productPaginationItem}
                    aria-current={item.selected ? "page" : undefined}
                />
            )}
        />
    );
}
