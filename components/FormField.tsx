import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { FormControl } from "@mui/material";
import InputField from "@/components/InputField"; // Adjust the import path as necessary
import { FormFieldProps } from "@/types";

const FormField: FC<FormFieldProps> = ({
  control,
  name,
  placeholder,
  inputStyles,
  icon,
  type,
  options,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => (
        <FormControl className={inputStyles}>
          <InputField
            icon={icon}
            label={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            name={name}
            error={error}
            style="dark" // or any other prop you need to pass
          />
        </FormControl>
      )}
    />
  );
};

export default FormField;