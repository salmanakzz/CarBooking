
export const handleClickVariant = (message, variant,enqueueSnackbar) => {

  return enqueueSnackbar(message, {
    variant,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
  });
};