import { Box, Button } from "@mui/material";
import { navigate } from "gatsby";
import React from "react";
import { Target } from "../../../target/target.model";
import { NavLinkItem } from "../../common/entities";
import { isClientSideNavigation } from "../../common/utils";
import { NavLinkMenu } from "../nav-link-menu/nav-link-menu";

interface Props {
  center?: boolean;
  links: NavLinkItem[];
}

export default function NavLinks({
  center = false,
  links,
}: Props): JSX.Element {
  return (
    <Box
      display="flex"
      flex={1}
      flexDirection={{ desktop: "row", mobile: "column" }}
      gap={2}
      justifyContent={{
        desktop: center ? "center" : "flex-start",
        mobile: undefined,
      }}
      marginLeft={{ desktop: center ? undefined : 6, mobile: undefined }}
    >
      {links.map(({ label, menuItems, target = Target.SELF, url }, i) =>
        menuItems ? (
          <NavLinkMenu key={i} menuItems={menuItems} menuLabel={label} />
        ) : (
          <Button
            key={`${url}${i}`}
            onClick={() =>
              isClientSideNavigation(url)
                ? navigate(url)
                : window.open(url, target)
            }
            sx={{
              justifyContent: { desktop: "unset", mobile: "flex-start" },
            }}
            variant="nav"
          >
            {label}
          </Button>
        )
      )}
    </Box>
  );
}
