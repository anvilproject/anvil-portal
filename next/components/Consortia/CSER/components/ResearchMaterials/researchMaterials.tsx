import { Accordion } from "@clevercanary/data-explorer-ui/lib/components/common/Accordion/accordion";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { TEXT_BODY_LARGE_500 } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import { ResearchMaterials as RMaterials } from "./researchMaterials.styles";

export const ResearchMaterials = (): JSX.Element => {
  return (
    <RMaterials>
      <Accordion title="CSER Phase 2 Consent Forms">
        <div>
          <Typography component="div" variant={TEXT_BODY_LARGE_500}>
            CHARM
          </Typography>
          <ul>
            <li>
              <Link
                label="CHARM Consent Form - Webpages"
                url="https://cser-consortium.net/system/files/research-material/charm_consent_form_-_webpages.pdf"
              />
            </li>
            <li>
              <Link
                label="CHARM Consent Form Spanish - Webpages"
                url="https://cser-consortium.net/system/files/research-material/charm_consent_form_spanish_-_webpages.pdf"
              />
            </li>
          </ul>
        </div>
        <div>
          <Typography component="div" variant={TEXT_BODY_LARGE_500}>
            KIDSCANSEQ
          </Typography>
          <ul>
            <li>
              <Link
                label="KidsCanSeq Age of Majority Consent Form - Germline and Tumor"
                url="https://cser-consortium.net/system/files/research-material/kidscanseq_aom_consent_form_germline_and_tumor_11.9.2020.pdf"
              />
            </li>
            <li>
              <Link
                label="KidsCanSeq Age of Majority Consent Form - Germline ONLY"
                url="https://cser-consortium.net/system/files/research-material/kidscanseq_aom_consent_form_germline_only_11.9.2020.pdf"
              />
            </li>
          </ul>
        </div>
      </Accordion>
      <Accordion title="CSER Phase 2 Protocols and Research Materials">
        <div>
          <Typography component="div" variant={TEXT_BODY_LARGE_500}>
            CHARM
          </Typography>
          <ul>
            <li>
              <Link
                label="CHARM Study Protocol"
                url="https://cser-consortium.net/system/files/research-material/charm_protocol.pdf"
              />
            </li>
          </ul>
        </div>
        <div>
          <Typography component="div" variant={TEXT_BODY_LARGE_500}>
            KIDSCANSEQ
          </Typography>
          <ul>
            <li>
              <Link
                label="Age of Majority Lost to Follow Up Certified Letter"
                url="https://cser-consortium.net/system/files/research-material/aom_lost_to_follow_up_certified_letter_english_final.pdf"
              />
            </li>
            <li>
              <Link
                label="AOM Lost to Follow Up Certified Letter - Spanish"
                url="https://cser-consortium.net/system/files/research-material/kidcanseq_aom_lost_to_follow_up_certified_letter_spanish_final.pdf"
              />
            </li>
            <li>
              <Link
                label="KidsCanSeq Lost to Follow-up Certified Letter (English)"
                url=""
              />
            </li>
            <li>
              <Link
                label="KidsCanSeq Lost to Follow-up Certified Letter (Spanish)"
                url=""
              />
            </li>
            <li>
              <Link label="KidsCanSeq Study Protocol" url="" />
            </li>
          </ul>
        </div>
      </Accordion>
    </RMaterials>
  );
};
