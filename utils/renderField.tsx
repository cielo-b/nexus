import { Key, ReactNode } from "react";
import {
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { FieldError, Noop, RefCallBack } from "react-hook-form";

type Option = {
  flag: string;
  idd: string[];
  name: string;
};

export const renderField = (
  type: string | undefined,
  placeholder: string,
  onChange: (...event: any[]) => void,
  onBlur: Noop,
  value: string,
  name: string,
  ref: RefCallBack,
  icon: ReactNode,
  error: FieldError | undefined,
  options?: Option[]
) => {
  switch (type) {
    case "textarea":
      return (
        <TextareaAutosize
          className="col-span-2 resize-none rounded-sm p-4 font-light outline-none ring-1 ring-gray-500 transition-all hover:ring-black focus:ring-2 focus:ring-blue-700 lg-max:text-sm"
          maxLength={1250}
          maxRows={10}
          minRows={10}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
        />
      );
    case "select":
      return (
        <Select
          value={value}
          displayEmpty
          input={<OutlinedInput />}
          onChange={onChange}
          onBlur={onBlur}
          renderValue={(selected) => {
            return selected;
          }}
        >
          <MenuItem value="" disabled>
            <em>{placeholder}</em>
          </MenuItem>
          {options?.map((option) => {
            return option.idd.map((item: string, idx: Key | null | undefined) => {
              return (
                <MenuItem value={`${option.flag} ${item}`} key={idx}>
                  {option.flag} {item}
                </MenuItem>
              );
            });
          })}
        </Select>
      );
    default:
      return (
        <TextField
          className="md-max2:col-span-2"
          fullWidth
          inputRef={ref}
          variant="outlined"
          size="medium"
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          }}
          sx={{
            ".MuiInputBase-input": {
              fontSize: "0.9rem",
            },
          }}
          error={Boolean(error)}
        />
      );
  }
};
