import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import { Input } from "@mui/joy";
import { ErrorMessage, FormikProps } from "formik";

interface CommonInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  endDecorator?: React.ReactNode;
  formik?: FormikProps<any> | undefined;
}

const CommonInput: React.FC<CommonInputProps> = ({
  name,
  label,
  type = "text",
  placeholder = "Placeholder",
  helperText = "",
  error,
  endDecorator,
  formik,
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

  return (
    <FormControl error={isError} sx={{ width: "100%" }}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        sx={{
          "&::before": {
            display: "none",
          },
          "&:focus-within": {
            outline: "2px solid var(--Input-focusedHighlight)",
            outlineOffset: "2px",
          },
        }}
        name={name}
        type={type}
        placeholder={placeholder}
        endDecorator={endDecorator}
        {...fieldProps}
        {...props}
      />
      <FormHelperText>
        <ErrorMessage name={name} />
      </FormHelperText>
    </FormControl>
  );
};

export default CommonInput;
