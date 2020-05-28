/**
 * The AnVIL
 * https://www.anvilproject.org
 *
 * GA dimensions (entity name and entity type only) keyed by href, used in GA/GTM event configuration.  
 */

// App dependencies
import { GAEntityName } from "./ga-entity-name.model";
import { GAEntityType } from "./ga-entity-type.model";

export const GADimensionsByHref = {

    // Home - Hero
    "https://anvil.terra.bio/#workspaces": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.PLATFORM_COMPONENT
    },

    // Home - Roadmap
    "https://dockstore.org/": {
        entityName: GAEntityName.DOCKSTORE,
        entityType: GAEntityType.PLATFORM_COMPONENT
    },

    // Home - Roadmap
    "https://anvil.terra.bio/": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.PLATFORM_COMPONENT
    },

    // Home - Roadmap
    "https://jupyter.org/": {
        entityName: GAEntityName.JUPTYER,
        entityType: GAEntityType.TOOL
    },

    // Home - Roadmap
    "https://software.broadinstitute.org/wdl/": {
        entityName: GAEntityName.WDL,
        entityType: GAEntityType.TOOL
    },
    
    // Home - Roadmap
    "https://gen3.org/": {
        entityName: GAEntityName.GEN3,
        entityType: GAEntityType.PLATFORM_COMPONENT
    },

    // Home - Roadmap
    "https://www.bioconductor.org/": {
        entityName: GAEntityName.BIOCONDUCTOR,
        entityType:  GAEntityType.TOOL
    },

    // Home - Roadmap
    "https://rstudio.com/": {
        entityName: GAEntityName.RSTUDIO,
        entityType: GAEntityType.TOOL
    },

    // Home - Roadmap
    "https://galaxyproject.org/": {
        entityName: GAEntityName.GALAXY,
        entityType: GAEntityType.TOOL
    },

    // Home - Roadmap
    "http://genome.ucsc.edu/": {
        entityName: GAEntityName.UCSC_GENOME_BROWSER,
        entityType: GAEntityType.TOOL
    },

    // Home - Workspaces
    "https://gatk.broadinstitute.org/hc/en-us/sections/360007226651-Best-Practices-Workflows": {
        entityName: GAEntityName.GATK,
        entityType: GAEntityType.REFERENCE
    },

    // Home - Workspaces
    "https://gatk.broadinstitute.org/hc/en-us/articles/360035894731-Somatic-short-variant-discovery-SNVs-Indels-": {
        entityName: GAEntityName.GATK,
        entityType: GAEntityType.REFERENCE
    },

    // Home - Workspaces    
    "https://www.10xgenomics.com/solutions/single-cell": {
        entityName: GAEntityName.TENX_GENOMICS,
        entityType: GAEntityType.REFERENCE
    },

    // Home - Workspaces
    "https://github.com/broadinstitute/inferCNV": {
        entityName: GAEntityName.INFERCNV,
        entityType: GAEntityType.REFERENCE
    },

    // Home - Workspaces
    "https://hail.is": {
        entityName: GAEntityName.HAIL,
        entityType: GAEntityType.REFERENCE
    },


    // Home - Footer
    "https://www.nih.gov": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },
    "https://www.hhs.gov": {
        entityName: GAEntityName.HSS,
        entityType: GAEntityType.REFERENCE
    },
    "https://www.usa.gov": {
        entityName: GAEntityName.USA,
        entityType: GAEntityType.REFERENCE
    },

    // About - Team
    "https://www.broadinstitute.org/bios/anthony-philippakis-0": {
        entityName: GAEntityName.UNSPECIFIED,
        entityType: GAEntityType.BIOGRAPHY
    },

    // About - Team
    "https://waldronlab.io": {
        entityName: GAEntityName.UNSPECIFIED,
        entityType: GAEntityType.BIOGRAPHY
    },
    
    // About - Team
    "http://vjcitn.github.io": {
        entityName: GAEntityName.UNSPECIFIED,
        entityType: GAEntityType.BIOGRAPHY
    },
    
    // About - Team
    "https://www.taylorlab.org": {
        entityName: GAEntityName.UNSPECIFIED,
        entityType: GAEntityType.BIOGRAPHY
    },
    
    // About - Team
    "https://goeckslab.org": {
        entityName: GAEntityName.UNSPECIFIED,
        entityType: GAEntityType.BIOGRAPHY
    },
    
    // About - Team
    "https://nekrut.github.io/lab_site": {
        entityName: GAEntityName.UNSPECIFIED,
        entityType: GAEntityType.BIOGRAPHY
    },

    // About - Team
    "https://bioconductor.org/about/core-team": {
        entityName: GAEntityName.UNSPECIFIED,
        entityType: GAEntityType.BIOGRAPHY
    },

    // About - Team
    "https://cgl.genomics.ucsc.edu/team": {
        entityName: GAEntityName.UNSPECIFIED,
        entityType: GAEntityType.BIOGRAPHY
    },

    // About - Team
    "http://rgrossman.com": {
        entityName: GAEntityName.UNSPECIFIED,
        entityType: GAEntityType.BIOGRAPHY
    },

    // About - Team
    "https://www.vumc.org/dbmi/person/robert-carroll-phd": {
        entityName: GAEntityName.UNSPECIFIED,
        entityType: GAEntityType.BIOGRAPHY
    },

    // About - Team
    "https://www.genome.wustl.edu/research/labs/hall-lab": {
        entityName: GAEntityName.UNSPECIFIED,
        entityType: GAEntityType.BIOGRAPHY
    },
    
    // Data - Data
    "https://www.genome.gov/Funded-Programs-Projects/NHGRI-Genome-Sequencing-Program/Centers-for-Common-Disease-Genomics": {
        entityName: GAEntityName.CCDG,
        entityType: GAEntityType.DATA_CONSORTIUM
    },

    // Data - Data
    "https://www.genome.gov/Funded-Programs-Projects/NHGRI-Genome-Sequencing-Program/Centers-for-Mendelian-Genomics-CMG": {
        entityName: GAEntityName.CMG,
        entityType: GAEntityType.DATA_CONSORTIUM
    },

    // Data - Data
    "https://gtexportal.org/home": {
        entityName: GAEntityName.GTEX,
        entityType: GAEntityType.DATA_CONSORTIUM
    },

    // Data - Data
    "https://www.internationalgenome.org/": {
        entityName: GAEntityName.THOUSAND_GENOMES,
        entityType: GAEntityType.DATA_CONSORTIUM
    },

    // Data - Data
    "https://emerge-network.org/": {
        entityName: GAEntityName.EMERGE,
        entityType: GAEntityType.DATA_CONSORTIUM
    },
    
    // Data - Data
    "https://www.covid19hg.org/": {
        entityName: GAEntityName.COVID19HG,
        entityType: GAEntityType.DATA_CONSORTIUM,
    },

    // Data - Data
    "https://cser-consortium.org/": {
        entityName: GAEntityName.CSER,
        entityType: GAEntityType.DATA_CONSORTIUM,
    },

    // Data - Data
    "https://gtexportal.org/home/": {
        entityName: GAEntityName.GTEX,
        entityType: GAEntityType.DATA_CONSORTIUM,
    },

    // Data - Data
    "https://humanpangenome.org/": {
        entityName: GAEntityName.HPP,
        entityType: GAEntityType.DATA_CONSORTIUM,
    },

    // Data - Data
    "https://www.nia.nih.gov/": {
        entityName: GAEntityName.NIA,
        entityType: GAEntityType.DATA_CONSORTIUM,
    },

    // Data - Data
    "https://nda.nih.gov/": {
        entityName: GAEntityName.NIMH,
        entityType: GAEntityType.DATA_CONSORTIUM
    },

    // Data - Data
    "https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // Data - Data
    "https://www.ncbi.nlm.nih.gov/books/NBK99225/": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // Data - Requesting Access
    "https://wiki.nci.nih.gov/display/TCGA/Application+Process": {
        entityName: GAEntityName.ERA,
        entityType: GAEntityType.REFERENCE
    },

    // Data - Requesting Access
    "https://anvil.terra.bio/#profile": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.PLATFORM_COMPONENT
    },

    // Data - Submitting Data
    "https://docs.google.com/forms/d/e/1FAIpQLSe3NViQ8bTkXexqJ7QukcIcSwe1OLlIirScvaP7YXq4TMqa7A/viewform": {
        entityName: GAEntityName.ANVIL,
        entityType: GAEntityType.REFERENCE
    },

    // Data - Submitting Data
    "mailto:help@anvilproject.org": {
        entityName: GAEntityName.ANVIL,
        entityType: GAEntityType.CONTACT
    }, 
    // Data - Submitting Data
    "https://docs.google.com/document/d/1DxqDw_pslY6DE5SbkZI7RAcjczH8CJM725JdI8rwJQU/edit?usp=sharing": {
        entityName: GAEntityName.ANVIL,
        entityType: GAEntityType.REFERENCE
    },

    // Data - Submitting Data
    "https://www.genome.gov/about-nhgri/Policies-Guidance/Genomic-Data-Sharing": {
        entityName: GAEntityName.NHGRI,
        entityType: GAEntityType.REFERENCE
    },

    // Data - Submitting Data
    "https://docs.google.com/document/d/14wtX83yNb-1Jy79pRn-WJukpzctnSBXwpdZFIlxgmec/edit#": {
        entityName: GAEntityName.ANVIL,
        entityType: GAEntityType.REFERENCE
    },

    // Data - Submitting Data
    "https://github.com/CCDG/Pipeline-Standardization/blob/master/PipelineStandard.md": {
        entityName: GAEntityName.CCDG,
        entityType: GAEntityType.REFERENCE
    },

    // Data - Submitting Data
    "https://docs.google.com/document/d/1VX_tV_VtqkDdBjLIFYELjQK12YcJljzGVlXSKgJYdI8/edit#": {
        entityName: GAEntityName.ANVIL,
        entityType: GAEntityType.REFERENCE
    },
    
    // Tools 
    "https://support.terra.bio/hc/en-us/articles/360030793091-Terra-FireCloud-Security-Posture": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // Tools 
    "mailto:anvil-project-managers@lists.anvilproject.org": {
        entityName: GAEntityName.ANVIL,
        entityType: GAEntityType.CONTACT
    },
    
    // Training - Training
    "https://www.nature.com/articles/sdata201618": {
        entityName: GAEntityName.NATURE,
        entityType: GAEntityType.REFERENCE
    },

    // Training - Guides
    "https://support.terra.bio/": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // Training - Guides
    "https://support.terra.bio/hc/en-us/articles/360022704371-Navigating-in-Terra": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // Training - Guides
    "https://support.terra.bio/hc/en-us/articles/360026775691-Managing-data-privacy-and-access-with-Authorization-Domains": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // Training - Guides
    "https://support.terra.bio/hc/en-us/articles/360028235911-How-to-register-for-a-Terra-account": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // Training - Guides
    "https://support.terra.bio/hc/en-us/articles/360029186611-Setting-up-a-Google-account-with-a-non-Google-email": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // Training - Guides
    "https://support.terra.bio/hc/en-us/articles/360026182251-How-to-set-up-billing-projects-and-Google-Billing-Accounts": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // Training - Guides
    "https://support.terra.bio/hc/en-us/sections/360006459511-Controlling-Cloud-costs": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // Training - Guides
    "https://support.terra.bio/hc/en-us/articles/360027940952-Free-credits-FAQs": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // Training - Guides
    "https://support.terra.bio/hc/en-us/articles/360022716811-The-Workspace-Organize-data-organize-and-run-analysis-tools": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // Training - Guides
    "https://support.terra.bio/hc/en-us/articles/360025851892-Reader-writer-or-owner-Workspace-access-controls-explained": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // Training - Guides
    "https://support.terra.bio/hc/en-us/articles/360029034232-Getting-started-with-GATK-workflows-in-the-cloud-FAQs": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // Training - Guides
    "https://support.terra.bio/hc/en-us/articles/360024898671-Interactive-analysis-with-Jupyter-notebooks": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // Training - Guides
    "https://support.terra.bio/hc/en-us/articles/360029654831-Viewing-IGV-tracks-of-BAM-files-in-your-workspace-data": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },
    
    // Training - Featured Workspaces
    // -- see "Home - Workspaces" above
    
    // News 
    "https://galaxyproject.org/jxtx/": {
        entityType: GAEntityType.REFERENCE
    },

    // News - Dockstore
    "https://docs.google.com/presentation/d/1j4bB_bed5dJ36U3D5HQDHIewkpm_N5T-wSUlAAXj2VA/edit#slide=id.g7a57f04dce_0_151": {
        entityName: GAEntityName.DOCKSTORE,
        entityType: GAEntityType.REFERENCE
    },
    
    // FAQ -  Overview
    "https://www.genome.gov/Funded-Programs-Projects/Computational-Genomics-and-Data-Science-Program/Genomic-Analysis-Visualization-Informatics-Lab-space-AnVIL": {
        entityName: GAEntityName.NHGRI,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Overview
    // AnVIL - see above

    // FAQ -  Overview
    "mailto:help@lists.anvilproject.org": {
        entityName: GAEntityName.ANVIL,
        entityType: GAEntityType.CONTACT
    },

    // FAQ -  Overview
    "https://www.genome.gov/Funded-Programs-Projects/Computational-Genomics-and-Data-Science-Program/Genomic-Analysis-Visualization-Informatics-Lab-space-AnVIL#awards": {
        entityName: GAEntityName.NHGRI,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Overview
    "https://projectreporter.nih.gov/project_info_description.cfm?aid=9788512&icde=46222930&ddparam=&ddvalue=&ddsub=&cr=1&csb=default&cs=ASC&pball=": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Overview
    "https://projectreporter.nih.gov/project_info_description.cfm?aid=9789931&icde=46222940&ddparam=&ddvalue=&ddsub=&cr=2&csb=default&cs=ASC&pball=": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Overview
    "https://www.genome.gov/Funded-Programs-Projects/Computational-Genomics-and-Data-Science-Program/Genomic-Analysis-Visualization-Informatics-Lab-space-AnVIL#externalconsultantcommittee": {
        entityName: GAEntityName.NHGRI,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Data Security
    "https://grants.nih.gov/grants/guide/notice-files/NOT-HG-19-024.html": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Data Security
    "https://osp.od.nih.gov/wp-content/uploads/NIH_GDS_Policy.pdf": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Data Security
    "https://osp.od.nih.gov/wp-content/uploads/NIH_Best_Practices_for_Controlled-Access_Data_Subject_to_the_NIH_GDS_Policy.pdf": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Data Security
    "https://grants.nih.gov/grants/guide/notice-files/NOT-OD-15-086.html": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Data Security
    "https://osp.od.nih.gov/wp-content/uploads/Model_DUC.pdf": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Data Security
    "https://osp.od.nih.gov/wp-content/uploads/NIH_DACs_Chairs.pdf": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Data Security
    "https://osp.od.nih.gov/ufaqs/what-is-the-role-of-nih-data-access-committees-dacs-in-considering-risks-to-individuals-their-families-and-groups-or-populations-associated-with-data-submitted-to-dbgap/": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Data Security
    "http://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/GetPdf.cgi?document_name=GeneralAAInstructions.pdf": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Data Security
    "http://osp.od.nih.gov/wp-content/uploads/Model_DUC.pdf": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Data Security
    "http://osp.od.nih.gov/scientific-sharing/policy-oversight/": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    "https://osp.od.nih.gov/wp-content/uploads/Genomic_Data_User_Code_of_Conduct.pdf": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Data Security
    "https://docs.google.com/document/d/1VX_tV_VtqkDdBjLIFYELjQK12YcJljzGVlXSKgJYdI8/edit": {
        entityName: GAEntityName.ANVIL,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ -  Data Security
    "mailto:anvil@mail.nih.gov": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.CONTACT
    },

    // FAQ -  Data Security
    "mailto:GDS@mail.nih.gov": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.CONTACT
    },

    // FAQ - Data Sharing
    "https://www.genome.gov/about-nhgri/Policies-Guidance/Genomic-Data-Sharing/data-submission": {
        entityName: GAEntityName.NHGRI,
        entityType: GAEntityType.REFERENCE
    },

    "https://osp.od.nih.gov/scientific-sharing/institutional-certifications/": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },
    
    // FAQ - Data Sharing
    // help@lists.anvilproject.org - see above
    
    // FAQ - Data Sharing
    // https://docs.google.com/forms/d/e/1FAIpQLSe3NViQ8bTkXexqJ7QukcIcSwe1OLlIirScvaP7YXq4TMqa7A/viewform - see above

    "https://www.genome.gov/about-genomics/policy-issues/Informed-Consent-for-Genomics-Research/Special-Considerations-for-Genome-Research#6": {
        entityName: GAEntityName.NHGRI,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ - Resources
    "https://cloud.google.com/pricing/": {
        entityName: GAEntityName.GOOGLE,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ - Resources
    "https://support.terra.bio/hc/en-us/articles/360027940952#Free%20Credits%20Overview": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ - Resources
    "https://datascience.nih.gov/strides": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ - Resources
    // mailto x 2 - see above
    
    // FAQ - Using AnVIL
    // Links to tools and platforms - see above

    // FAQ - Using AnVIL
    "https://github.com/anvilproject/client-apis": {
        entityName: GAEntityName.ANVIL,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ - Using AnVIL
    "https://anvil.terra.bio/#library/datasets": {
        entityName: GAEntityName.TERRA,
        entityType: GAEntityType.REFERENCE
    },

    // FAQ - Using AnVIL
    "https://dbgap.ncbi.nlm.nih.gov/": {
        entityName: GAEntityName.NIH,
        entityType: GAEntityType.REFERENCE
    },

    // Help
    "https://broadinstitute.zendesk.com": {
        entityName: GAEntityName.BROAD,
        entityType: GAEntityType.CONTACT
    },

    // Help
    "https://gitter.im/anvil-project/Lobby": {
        entityName: GAEntityName.ANVIL,
        entityType: GAEntityType.GITTER
    }

    // Help
    // mailto - see above
};
