import { Accordion } from "@databiosphere/findable-ui/lib/components/common/Accordion/accordion";
import { Card } from "@databiosphere/findable-ui/lib/components/common/Card/card";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import publications from "./publications.json";
import { Publications as PublicationsByYear } from "./publications.styles";

export const Publications = (): JSX.Element => {
  const publicationsByYear = publications.reduce(
    (byYear, publication) => {
      (
        byYear[publication.publicationYear] ||
        (byYear[publication.publicationYear] = [])
      ).push(publication);
      return byYear;
    },
    {} as Record<string, typeof publications>
  );

  const { compare } = new Intl.Collator("en");

  return (
    <PublicationsByYear>
      {Object.keys(publicationsByYear)
        .sort()
        .reverse()
        .map((year, i) => (
          <Accordion key={year} expanded={i === 0} title={year}>
            {publicationsByYear[year]
              .sort(
                (a, b) =>
                  compare(a.authors, b.authors) || compare(a.title, b.title)
              )
              .map((publication) => {
                const doiUrl = `https://doi.org/${publication.doi}`;
                const pubMedUrl = `https://pubmed.ncbi.nlm.nih.gov/${publication.pmid}/`;
                return (
                  <Card
                    key={publication.pmid}
                    secondaryTitle={
                      <span>
                        {`${publication.authors} (${publication.publicationYear}). ${publication.journalOrBook}. `}
                        <Link label={doiUrl} url={doiUrl} />
                        {". PMID: "}
                        <Link label={publication.pmid} url={pubMedUrl} />
                        {"."}
                      </span>
                    }
                    title={publication.title}
                  />
                );
              })}
          </Accordion>
        ))}
    </PublicationsByYear>
  );
};
