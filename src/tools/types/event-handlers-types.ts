import { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";

export type InputEventHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type SelectEventHandler = SelectChangeEvent<string[] | string>;

export type PaginationEventHandler = ChangeEvent<unknown>;
