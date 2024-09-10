import * as React from "react";
import Stack from "@mui/joy/Stack";
import LinearProgress from "@mui/joy/LinearProgress";

export default function UpProgress({ loader = false }) {
  const [progress, setProgress] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    if (loader) {
      setVisible(true);
      timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 5
        );
      }, 800);
    } else {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 500);
    }

    return () => {
      clearInterval(timer);
    };
  }, [loader]);

  return (
    visible && (
      <div className="loader_bar">
        <LinearProgress
          variant="plain"
          sx={{ height: "3px" }}
          determinate
          value={progress}
        />
      </div>
    )
  );
}
