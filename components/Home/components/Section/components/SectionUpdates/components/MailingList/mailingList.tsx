import { CardText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardText/cardText";
import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import { JSX } from "react";
import { MailingListButton } from "../../../../../../../common/MailingListButton/mailingListButton";
import { Card, IconWrapper, Text } from "./mailingList.styles";

/**
 * Card inviting visitors to join the AnVIL mailing list, shown at the end of the home page's Updates section.
 * @returns The mailing list card.
 */
export const MailingList = (): JSX.Element => {
  return (
    <Card>
      <IconWrapper>
        <MailOutlineRoundedIcon />
      </IconWrapper>
      <Text>
        <CardTitle component="h3">Get AnVIL news by email</CardTitle>
        <CardText color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}>
          Join the AnVIL mailing list to get these updates in your inbox.
        </CardText>
      </Text>
      <MailingListButton />
    </Card>
  );
};
