import { Button } from "./callToAction.styles";

const GET_STARTED = "/learn";

interface CallToActionProps {
  portalURL: string;
}

export const CallToAction = ({ portalURL }: CallToActionProps): JSX.Element => {
  return (
    <Button
      color="primary"
      href={`${portalURL}${GET_STARTED}`}
      size="medium"
      variant="contained"
    >
      Get Started
    </Button>
  );
};
