import type { ColumnConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { render, type RenderResult, screen } from "@testing-library/react";
import type { Publication } from "../apis/publications/entities";
import { PUBLICATION_CATEGORY_KEY } from "../site-config/anvil-portal/publications/category";
import { publicationsEntityConfig } from "../site-config/anvil-portal/publications/entityConfig";

const PUBLICATION: Publication = {
  authors: ["Ann Author", "Ben Author"],
  citationCount: 1234,
  doi: "https://doi.org/10.1038/s41586-026-10843-7",
  journal: "Nature",
  pmid: "38123456",
  publicationDay: null,
  publicationMonth: 3,
  publicationTimestamp: Date.UTC(2024, 2, 1),
  publicationYear: 2024,
  publisher: "Springer Nature",
  title: "Genomic analysis on AnVIL",
};

/**
 * Render one column of the citations table for a publication, using the column's configured component and view builder.
 * @param id - Column ID.
 * @param publication - Publication to render.
 * @returns The render result.
 */
function renderColumn(id: string, publication: Publication): RenderResult {
  const column = (
    publicationsEntityConfig.list.columns as ColumnConfig<Publication>[]
  ).find((c) => c.id === id);
  if (!column) throw new Error(`No citations column with ID ${id}`);
  const { component: Component, viewBuilder } = column.componentConfig;
  if (!viewBuilder) throw new Error(`Citations column ${id} has no builder`);
  return render(<Component {...viewBuilder(publication)} />);
}

describe("citations table columns", () => {
  it("links the title to the DOI in a new tab", () => {
    renderColumn(PUBLICATION_CATEGORY_KEY.TITLE, PUBLICATION);
    const link = screen.getByRole("link", { name: PUBLICATION.title });
    expect(link).toHaveAttribute("href", PUBLICATION.doi);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("shows the authors", () => {
    renderColumn(PUBLICATION_CATEGORY_KEY.AUTHORS, PUBLICATION);
    expect(screen.getByText("2 Authors")).toBeInTheDocument();
  });

  it("shows the journal", () => {
    renderColumn(PUBLICATION_CATEGORY_KEY.JOURNAL, PUBLICATION);
    expect(screen.getByText("Nature")).toBeInTheDocument();
  });

  it("shows a date with no day as year and month", () => {
    renderColumn(PUBLICATION_CATEGORY_KEY.PUBLICATION_TIMESTAMP, PUBLICATION);
    expect(screen.getByText("2024-03")).toBeInTheDocument();
  });

  it("links the PubMed ID to PubMed", () => {
    renderColumn(PUBLICATION_CATEGORY_KEY.PMID, PUBLICATION);
    expect(screen.getByRole("link", { name: "38123456" })).toHaveAttribute(
      "href",
      "https://pubmed.ncbi.nlm.nih.gov/38123456"
    );
  });

  it("shows no link when there is no PubMed ID", () => {
    renderColumn(PUBLICATION_CATEGORY_KEY.PMID, { ...PUBLICATION, pmid: null });
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("shows the citation count with thousands separators", () => {
    renderColumn(PUBLICATION_CATEGORY_KEY.CITATION_COUNT, PUBLICATION);
    // The builder formats in the default locale, e.g. "1,234" in en-US
    expect(screen.getByText((1234).toLocaleString())).toBeInTheDocument();
  });
});
