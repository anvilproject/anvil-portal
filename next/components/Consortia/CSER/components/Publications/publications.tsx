import { Accordion } from "@clevercanary/data-explorer-ui/lib/components/common/Accordion/accordion";
import { Card } from "@clevercanary/data-explorer-ui/lib/components/common/Card/card";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { Publications as PublicationsByYear } from "./publications.styles";
import publications from "./publications.json";

export const Publications = (): JSX.Element => {
  const publicationsByYear = publications.reduce((byYear, publication) => {
    (
      byYear[publication.publicationYear] ||
      (byYear[publication.publicationYear] = [])
    ).push(publication);
    return byYear;
  }, {} as Record<string, typeof publications>);

  const { compare } = new Intl.Collator("en");

  return (
    <PublicationsByYear>
      {Object.keys(publicationsByYear)
        .sort()
        .reverse()
        .map((year) => (
          <Accordion key={year} title={year}>
            {publicationsByYear[year]
              .sort(
                (a, b) =>
                  compare(a.authors, b.authors) || compare(a.title, b.title)
              )
              .map((publication) => {
                const doiUrl = `https://doi.org/${publication.doi}`;
                return (
                  <Card
                    key={publication.pmid}
                    secondaryTitle={
                      <span>
                        {`${publication.authors} (${publication.publicationYear}). ${publication.journalOrBook}. `}
                        <Link label={doiUrl} url={doiUrl} />
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
