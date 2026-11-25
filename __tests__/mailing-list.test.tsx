import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { render, screen } from "@testing-library/react";
import { MAILING_LIST_URL } from "../components/common/MailingListButton/constants";
import { MailingListButton } from "../components/common/MailingListButton/mailingListButton";
import { NAV_LINKS } from "../site-config/anvil-portal/dev/footer";

describe("mailing list sign-up", () => {
  it("links the Join the Mailing List button to the sign-up page in a new tab, and says so to screen readers", () => {
    render(<MailingListButton />);
    const link = screen.getByRole("link", {
      name: "Join the Mailing List (opens in a new tab)",
    });
    expect(link).toHaveAttribute("href", MAILING_LIST_URL);
    expect(link).toHaveAttribute("target", ANCHOR_TARGET.BLANK);
    expect(link).toHaveTextContent(/^Join the Mailing List$/);
  });

  // findable-ui's footer opens nav links in the same tab unless the link sets a target
  it("adds a Mailing List footer link that opens the sign-up page in a new tab, and says so to screen readers", () => {
    const navLink = NAV_LINKS.find(({ url }) => url === MAILING_LIST_URL);
    expect(navLink?.target).toBe(ANCHOR_TARGET.BLANK);
    render(<a href={MAILING_LIST_URL}>{navLink?.label}</a>);
    expect(
      screen.getByRole("link", { name: "Mailing List (opens in a new tab)" })
    ).toBeInTheDocument();
  });
});
