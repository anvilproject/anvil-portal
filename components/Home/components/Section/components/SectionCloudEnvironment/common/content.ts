import { SectionCard } from "../../../../../common/entities";

export const CARDS: Omit<SectionCard, "links">[] = [
  {
    media: {
      alt: "Reduce Data Transfer Fees",
      height: 48,
      src: "/consortia/cloudBenefits/cloudCheck.svg",
    },
    text: "There is no charge for data transferred from cloud storage to cloud compute within the same region.",
    title: "Reduce Data Transfer Fees",
  },
  {
    media: {
      alt: "Reduce Data Storage Costs",
      height: 48,
      src: "/consortia/cloudBenefits/piggyBank.svg",
    },
    text: "AnVIL hosted datasets are stored free of charge to researchers.",
    title: "Reduce Data Storage Costs",
  },
  {
    media: {
      alt: "Collaborate Securely",
      height: 48,
      src: "/consortia/cloudBenefits/fileShield.svg",
    },
    text: "Securely work with controlled-access data in Terra, AnVIL's FedRAMP Moderate compliant analysis platform.",
    title: "Collaborate Securely",
  },
  {
    media: {
      alt: "Publish Reproducible Results",
      height: 48,
      src: "/consortia/cloudBenefits/megaphone.svg",
    },
    text: "Share analyses and workspaces to demonstrate replicable and repeatable science.",
    title: "Publish Reproducible Results",
  },
];
