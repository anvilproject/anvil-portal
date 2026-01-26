import { Card } from "@databiosphere/findable-ui/lib/components/common/Card/card";
import {
  Tabs,
  TabValue,
} from "@databiosphere/findable-ui/lib/components/common/Tabs/tabs";
import { JSX, useState } from "react";
import { PROJECT_TABS } from "./common/constants";
import { PROJECT_VIEW } from "./common/entities";
import { ProjectView } from "./projects.styles";

export const Projects = (): JSX.Element => {
  const [projectView, setProjectView] = useState<string>(PROJECT_VIEW.U_AWARDS);

  // Callback fired when selected tab value changes.
  const onTabChange = (tabValue: TabValue): void => {
    setProjectView(tabValue);
  };

  return (
    <ProjectView>
      <Tabs onTabChange={onTabChange} tabs={PROJECT_TABS} value={projectView} />
      {/* U Awards */}
      {projectView === PROJECT_VIEW.U_AWARDS && (
        <>
          <Card
            media={{
              alt: "CHARM",
              height: 56,
              src: "/consortia/cser/projects/images/charm.png",
            }}
            cardUrl="/consortia/cser/projects/charm"
            secondaryTitle="Kaiser Permanente Northwest: Katrina Goddard, PhD and Ben Wilfond, MD"
            text="The CHARM (Cancer Health Assessment Reaching Many) study will assess the utility of clinical exome sequencing and how it affects care in diverse populations. Our study population includes adults at risk for hereditary cancer syndromes."
            title="Cancer Health Assessments Reaching Many"
          />
          <Card
            media={{
              alt: "Baylor College of Medicine",
              height: 128,
              src: "/consortia/cser/projects/images/bcm.png",
            }}
            cardUrl="/consortia/cser/projects/kidscanseq"
            secondaryTitle="Baylor College of Medicine, Houston: Sharon Plon, MD, PhD; Will Parsons, MD, PhD; and Amy McGuire, PhD"
            text="The Baylor College of Medicine Texas KidsCanSeq Study aims to assess the utility of genome-scale testing, compared with more targeted methods, in diverse pediatric cancer patient populations and diverse healthcare settings in Texas."
            title="Evaluating Utility And Improving Implementation Of Genomic Sequencing For Pediatric Cancer Patients In The Diverse Population And Healthcare Settings Of Texas: The KidsCanSeq Study"
          />
          <Card
            media={{
              alt: "University of North Carolina",
              height: 56,
              src: "/consortia/cser/projects/images/unc.png",
            }}
            cardUrl="/consortia/cser/projects/ncgenes2"
            secondaryTitle="University of North Carolina, Chapel Hill: Jonathan Berg, MD, PhD; Bradford Powell, MD, PhD; and Christine Rini, PhD"
            text="NCGENES 2 will generate evidence regarding the clinical utility of genomic sequencing using a prospective randomized controlled trial comparing exome sequencing to usual care and investigating the use of pre-visit preparation to improve patient-centered outcomes."
            title="North Carolina Clinical Genomic Evaluation by Next-generation Exome Sequencing 2"
          />
          <Card
            media={{
              alt: "Icahn School of Medicine",
              height: 128,
              src: "/consortia/cser/projects/images/nyckidseq.png",
            }}
            cardUrl="/consortia/cser/projects/nyckidseq"
            secondaryTitle="Icahn School of Medicine at Mt Sinai, Eimear Kenny, PhD; Melissa Wasserstein, MD; Carol Horowitz, MD; Bruce Gelb, MD"
            text="NYCKidSeq seeks to advance use of genomic medicine for underserved NYC children and assess improved management of childhood disease."
            title="NYCKidSeq"
          />
          <Card
            media={{
              alt: "University of California",
              src: "/consortia/cser/projects/images/ucsf.png",
              width: 128,
            }}
            cardUrl="/consortia/cser/projects/p3egs"
            secondaryTitle="University of California, San Francisco: Pui-Yan Kwok, MD, Ph.D; Mary Norton, MD; Barbara Koenig, PhD; Anne Slavotinek, MD, PhD; Neil Risch, PhD"
            text="The UCSF Program in Prenatal and Pediatric Genome Sequencing (P3EGS) will study the utility of whole exome sequencing as a tool for 1) diagnosing infants and children with serious developmental disorders, and, 2) providing genetic information to parents when a prenatal study reveals a fetus with a structural anomaly."
            title="Prenatal and Pediatric Genome Sequencing"
          />
          <Card
            media={{
              alt: "SouthSeq",
              src: "/consortia/cser/projects/images/southseq.png",
              width: 128,
            }}
            cardUrl="/consortia/cser/projects/southseq"
            secondaryTitle="HudsonAlpha: Greg Cooper, PhD, Greg Barsh, PhD, Bruce Korf, PhD"
            text='In "SouthSeq", we will perform whole-genome sequencing on newborns suspected to have genetic disorders and develop and test return of results mechanisms to expand access to genetic testing to diverse, especially historically underserved, communities.'
            title="SouthSeq"
          />
        </>
      )}
      {/* NHGRI Intramural */}
      {projectView === PROJECT_VIEW.NHGRI_INTRAMURAL && (
        <>
          <Card
            cardUrl="/consortia/cser/projects/clinseqa2"
            media={{
              alt: "ClinSeq A2",
              height: 56,
              src: "/consortia/cser/projects/images/clinseq.png",
            }}
            secondaryTitle="NHGRI Intramural Project: Leslie Biesecker"
            text="The ClinSeq project is conducting genetic sequencing amongst healthy volunteers in order to study the impact of returning their individual genetic results and to build a resource for genotype-drive research."
            title="ClinSeq A2"
          />
        </>
      )}
      {/* CSER1 */}
      {projectView === PROJECT_VIEW.CSER1 && (
        <>
          <Card
            cardUrl="/consortia/cser/projects/cser1"
            text="The precursor to the current CSER consortium was the Clinical Sequencing Exploratory Research (CSER1) Consortium, a national multi-site research program funded jointly by the National Human Genome Research Institute (NHGRI) and National Cancer Institute (NCI), which conducted multidimensional, translational research to evaluate the integration of genome and exome sequencing into clinical care."
            title="Clinical Sequencing Exploratory Research"
          />
        </>
      )}
    </ProjectView>
  );
};
