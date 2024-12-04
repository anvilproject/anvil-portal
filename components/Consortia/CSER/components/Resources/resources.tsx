import { Accordion } from "@databiosphere/findable-ui/lib/components/common/Accordion/accordion";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { TextBodyLarge500 } from "../../../../common/Typography/components/TextBodyLarge500/textBodyLarge500";
import { MaterialsCategory } from "../common/materials";
import { Resources as ResourcesList } from "./resources.styles";

export const Resources = (): JSX.Element => {
  return (
    <ResourcesList category={MaterialsCategory.RESOURCES}>
      <Accordion title={"Information About the CSER1 Consortium"}>
        <div>
          <TextBodyLarge500>
            CSER1 Consortium Information Slides
          </TextBodyLarge500>
          <p>
            A slide deck of the basic information about CSER, ranging from the
            purpose & specific aims to a site map to the leadership of various
            aspects of the program:{" "}
          </p>
          <ul>
            <li>
              <a
                download
                href="/consortia/cser/downloads/resources/cser_overview_slides_2017.ppt"
              >
                Overview Slides
              </a>
            </li>
            <li>
              <a
                download
                href="/consortia/cser/downloads/resources/cser_overview_slides_2017.pdf"
              >
                Overview PDF
              </a>
            </li>
          </ul>
        </div>
        <div>
          <TextBodyLarge500>
            CSER1 Consortium Organizational Chart
          </TextBodyLarge500>
          <p>
            A useful diagram of all different components of the CSER Program and
            their relationships to one another:
          </p>
          <ul>
            <li>
              <a
                download
                href="/consortia/cser/downloads/resources/cser_organizational_chart.pdf"
              >
                Organizational Chart PDF
              </a>
            </li>
          </ul>
        </div>
      </Accordion>
      <Accordion title="Software Created by the CSER1 Consortium">
        <div>
          <TextBodyLarge500>
            CSER1 Guide to Interpreting Genomic Reports
          </TextBodyLarge500>
          <p>
            A just-in-time resource toolkit to aid physicians in interpreting
            genomic reports. Created by the CSER Practitioner Education working
            group:
          </p>
          <a
            download
            href="/consortia/cser/downloads/resources/cser_provider_toolkit.pdf"
          >
            CSER Provider Toolkit PDF
          </a>
        </div>
        <div>
          <TextBodyLarge500>MEGA (MEdicine Gene Annotation)</TextBodyLarge500>
          <p>The official CSER1 variant database. Created by NextMed:</p>
          <Link label="https://redcap.iths.org" url="https://redcap.iths.org" />
        </div>
        <div>
          <TextBodyLarge500>
            TARGET (Tumor Alterations releveant for GEnomic-drive Therapy)
          </TextBodyLarge500>
          <p>
            A database of genes that, when somatically altered in cancer, are
            directly linked to a clinical action. Created by CanSeq:
          </p>
          <p>https://www.broadinstitute.org/cancer/cga/target</p>
          {/* <Link */}
          {/*   label="https://www.broadinstitute.org/cancer/cga/target" */}
          {/*   url="https://www.broadinstitute.org/cancer/cga/target" */}
          {/* /> */}
        </div>
        <div>
          <TextBodyLarge500>
            PHIAL (Precision Heuristics for Interpreting the Alteration
            Landscape)
          </TextBodyLarge500>
          <p>
            A heuristic algorithm for clinical interpretation of cancer genome
            sequencing data. Created by CanSeq:
          </p>
          <p>https://www.broadinstitute.org/cancer/cga/phial</p>
          {/* <Link */}
          {/*   label="https://www.broadinstitute.org/cancer/cga/phial" */}
          {/*   url="https://www.broadinstitute.org/cancer/cga/phial" */}
          {/* /> */}
        </div>
        <div>
          <TextBodyLarge500>Cassandra</TextBodyLarge500>
          <p>
            Cassandra combines annovar output with other public datasources to
            output annotated .vcf files. Created by BASIC3:
          </p>
          <Link
            label="https://www.hgsc.bcm.edu/software/cassandra"
            url="https://www.hgsc.bcm.edu/software/cassandra"
          />
        </div>
        <div>
          <TextBodyLarge500>Atlas 2</TextBodyLarge500>
          <p>
            Atlas 2 is a next-generation sequencing suite of variant analysis
            tools specializing in the separation of true SNPs and insertions and
            deletions (indels) from sequencing and mapping errors in Whole Exome
            Capture Sequencing (WECS) data. Created by BASIC3:
          </p>
          <Link
            label="https://www.hgsc.bcm.edu/software/atlas-2"
            url="https://www.hgsc.bcm.edu/software/atlas-2"
          />
        </div>
        <div>
          <TextBodyLarge500>Proband</TextBodyLarge500>
          <p>
            Proband is an app for taking family history pedigrees, designed
            exclusively for the iPad. Created by PediSeq.
          </p>
          {/* <Link label="https://probandapp.com" url="https://probandapp.com" /> */}
        </div>
        <div>
          <TextBodyLarge500>
            Preferences Instrument for Genomic Secondary Results (PIGSR)
          </TextBodyLarge500>
          <p>
            Preferences Instrument for Genomic Secondary Results (PIGSR) is tool
            to allow adults undergoing genomic testing to record their
            preferences about getting incidental or secondary results.
          </p>
          <Link label="https://www.pigsr.org" url="https://www.pigsr.org" />
        </div>
        <div>
          <TextBodyLarge500>
            Interactive Graphic | Genome and Exome Sequencing in Clinical
            Practice
          </TextBodyLarge500>
          <p>
            A NEJM interactive graphic on clinical genome and exome sequencing.
            Created by ClinSeq and MedSeq:
          </p>
          <p>https://www.nejm.org</p>
          {/* <Link */}
          {/*   label="https://www.nejm.org" */}
          {/*   url="https://www.nejm.org/action/showMediaPlayer?doi=10.1056/NEJMra1312543&aid=NEJMra1312543_attach_1" */}
          {/* /> */}
        </div>
      </Accordion>
      <Accordion title="Genetic and Genomic Online CME Courses">
        <div>
          <TextBodyLarge500>
            Dartmouth University&apos;s Interactive Media Laboratory
          </TextBodyLarge500>
          <p>
            An online &quot;Mini-Fellowship&quot; developed to help a general
            clinician learn about Clinical Genetics:
          </p>
          <p>https://www.genetics-cme.com/tour</p>
          {/* <Link */}
          {/*   label="https://www.genetics-cme.com/tour" */}
          {/*   url="https://www.genetics-cme.com/tour" */}
          {/* /> */}
        </div>
        <div>
          <TextBodyLarge500>The Jackson Laboratory</TextBodyLarge500>
          <p>Online courses about using family history in the clinic:</p>
          <Link
            label="Clinical Education at JAX"
            url="https://www.jax.org/education-and-learning/clinical-and-continuing-education"
          />
        </div>
        <div>
          <TextBodyLarge500>Harvard Medical School</TextBodyLarge500>
          <p>
            Online CME courses in a wide range of different topics related to
            health care:
          </p>
          <p>
            https://hms.harvard.edu/education/continuing-education/online-cme-courses
          </p>
          {/* <Link */}
          {/*   label="https://hms.harvard.edu/education/continuing-education/online-cme-courses" */}
          {/*   url="https://hms.harvard.edu/education/continuing-education/online-cme-courses" */}
          {/* /> */}
        </div>
        <div>
          <TextBodyLarge500>Medscape</TextBodyLarge500>
          <p>Medscape offers diverse topics in its online CME library:</p>
          <Link
            label="https://www.medscape.org/resource/genomic-medicine/cme"
            url="https://www.medscape.org/resource/genomic-medicine/cme"
          />
        </div>
      </Accordion>
      <Accordion title="Other Genetic and Genomic Databases and Information Sources">
        <div>
          <TextBodyLarge500>ClinVar</TextBodyLarge500>
          <p>
            A freely accessible, public archive of reports of the relationships
            among human variations and phenotypes with supporting evidence:
          </p>
          <Link
            label="https://www.ncbi.nlm.nih.gov/clinvar"
            url="https://www.ncbi.nlm.nih.gov/clinvar"
          />
        </div>
        <div>
          <TextBodyLarge500>The Exome Variant Server (EVS)</TextBodyLarge500>
          <p>
            The Exome Variant Server (EVS), a data browser for data from the
            Exome Sequencing Project (ESP):
          </p>
          <Link
            label="https://evs.gs.washington.edu/EVS"
            url="https://evs.gs.washington.edu/EVS"
          />
        </div>
        <div>
          <TextBodyLarge500>
            dbGaP (Database of Genotypes and Phenotypes)
          </TextBodyLarge500>
          <p>
            dbGaP (Database of Genotypes and Phenotypes), a database developed
            to archive and distribute the results of studies that have
            investigated the interaction of genotype and phenotype:
          </p>
          <Link
            label="https://www.ncbi.nlm.nih.gov/gap"
            url="https://www.ncbi.nlm.nih.gov/gap"
          />
        </div>
        <div>
          <TextBodyLarge500>The UCSC Genome Browser</TextBodyLarge500>
          <p>
            The UCSC Genome Browser, containing the reference sequence and
            working draft assemblies for a large collection of genomes:
          </p>
          <Link label="https://genome.ucsc.edu" url="https://genome.ucsc.edu" />
        </div>
        <div>
          <TextBodyLarge500>
            OMIM (Online Mendelian Inheritance in Man)
          </TextBodyLarge500>
          <p>
            OMIM (Online Mendelian Inheritance in Man), a comprehensive,
            authoritative compendium of human genes and genetic phenotypes:
          </p>
          <Link
            label="https://www.ncbi.nlm.nih.gov/omim"
            url="https://www.ncbi.nlm.nih.gov/omim"
          />
        </div>
        <div>
          <TextBodyLarge500>GeneReviews</TextBodyLarge500>
          <p>
            GeneReviews, expert-authored, peer-reviewed genetic disease
            descriptions with a clinical focus:
          </p>
          <Link
            label="https://www.genereviews.org"
            url="https://www.genereviews.org"
          />
        </div>
        <div>
          <TextBodyLarge500>Genetics Home Reference</TextBodyLarge500>
          <p>
            Genetics Home Reference, consumer-friendly information about the
            effects of genetic variations on human health:
          </p>
          <Link label="https://ghr.nlm.nih.gov" url="https://ghr.nlm.nih.gov" />
        </div>
        <div>
          <TextBodyLarge500>Center for Mendelian Genomics</TextBodyLarge500>
          <p>
            Center for Mendelian Genomics, will apply next-generation sequencing
            and computational approaches to discover the genes and variants that
            underlie Mendelian conditions:
          </p>
          <Link label="https://mendelian.org/" url="https://mendelian.org" />
        </div>
        <div>
          <TextBodyLarge500>The CSER1 ELSI Literature Archive</TextBodyLarge500>
          <p>
            The CSER1 ELSI literature archive, an ongoing collection of articles
            and other literature relevant to the ethical, legal, and social
            implications of genomic sequencing:
          </p>
          <a
            download
            href="/consortia/cser/downloads/resources/full20bibliography2028may20232c20201429.docx"
          >
            Literature Archive
          </a>
        </div>
      </Accordion>
    </ResourcesList>
  );
};
