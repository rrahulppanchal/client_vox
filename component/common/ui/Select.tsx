import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Autocomplete from "@mui/joy/Autocomplete";
import { FormikProps } from "formik";
import { Input } from "@mui/joy";

// Define the props interface
interface CommonSelectProps {
  label?: string;
  name: string;
  placeholder?: string;
  helperText?: string;
  rounded?: boolean;
  error?: boolean;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
  formik?: FormikProps<any>;
  options: { label: string; value: any }[];
}

const CommonSelect: React.FC<CommonSelectProps> = ({
  label,
  name,
  placeholder = "Select options",
  rounded = false,
  helperText = "",
  formik,
  onChange,
  error,
  options,
  ...props
}) => {
  const isError =
    error ?? (formik?.touched[name] && formik?.errors[name] ? true : false);

  const errorMessage =
    helperText ||
    (formik?.touched[name] && formik?.errors[name]
      ? (formik.errors[name] as string)
      : "");

  const fieldProps = formik ? formik.getFieldProps(name) : {};

  const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    if (formik) {
      formik.setFieldValue(name, value?.value || null);
      formik.setFieldTouched(name, true, false);
    }
    if (onChange) {
      onChange(event, value);
    }
  };

  return (
    <FormControl error={isError} sx={{ width: "100%" }}>
      {label && <FormLabel>{label}</FormLabel>}
      <Autocomplete
        {...props}
        // {...fieldProps}
        value={options.find(
          (item) =>
            item.value === formik?.values[name] ||
            item.label === formik?.values[name]
        )}
        options={options}
        placeholder={placeholder}
        getOptionLabel={(option) => option.label}
        onChange={handleChange}
      />
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

export default CommonSelect;
