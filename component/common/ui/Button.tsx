import { Button } from "@mui/joy";

interface CommonButtonProps {
  name?: string;
  type?: string;
  variant?: string;
  color?: string;
  rounded?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  name = "Submit",
  type = "submit",
  variant = "solid",
  color = "primary",
  rounded = false,
  ...props
}) => {
  return (
    <>
      <Button
        sx={{ width: "100%", borderRadius: rounded ? "50vw" : "" }}
        type={type}
        variant={(props as any)?.variant || "solid"}
        color={(props as any)?.color || "primary"}
        {...props}
      >
        {name}
      </Button>
    </>
  );
};

export default CommonButton;
