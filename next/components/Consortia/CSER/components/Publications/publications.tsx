import { Accordion } from "@clevercanary/data-explorer-ui/lib/components/common/Accordion/accordion";
import { Card } from "@clevercanary/data-explorer-ui/lib/components/common/Card/card";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { Publications as PublicationsByYear } from "./publications.styles";

export const Publications = (): JSX.Element => {
  return (
    <PublicationsByYear>
      <Accordion title="2023">
        <Card
          secondaryTitle={
            <span>
              Kraft SA, Russell H, Bensen JT, Bonini KE, Robinson JO,
              Sahin-Hodoglugil N, Renna K, Hindorff LA, Kaufman D, Horowitz CR,
              Waltz M, Zepp JM, Knight SJ. (2023). Am J Med Genet A.{" "}
              <Link
                label="https://doi.org/10.1002/ajmg.a.63033"
                url="https://doi.org/10.1002/ajmg.a.63033"
              />
            </span>
          }
          title="Conducting clinical genomics research during the COVID-19 pandemic: Lessons learned from the CSER consortium experience"
        />
        <Card
          secondaryTitle={
            <span>
              Odgis JA, Gallagher KM, Rehman AU, Marathe PN, Bonini KE, Sebastin
              M, Di Biase M, Brown K, Kelly NR, Ramos MA, Thomas-Wilson A, Guha
              S, Okur V, Ganapathi M, Elkhoury L, Edelmann L, Zinberg RE,
              Abul-Husn NS, Diaz GA, Greally JM, Suckiel SA, Jobanputra V,
              Horowitz CR, Kenny EE, Wasserstein MP, Gelb BD. (2023). Am J Med
              Genet A.{" "}
              <Link
                label="https://doi.org/10.1002/ajmg.a.63062"
                url="https://doi.org/10.1002/ajmg.a.63062"
              />
            </span>
          }
          title="Detection of mosaic variants using genome sequencing in a large pediatric cohort"
        />
      </Accordion>
      <Accordion title="2022">
        <Card
          secondaryTitle={
            <span>
              Amendola LM, Shuster E, Leo MC, Dorschner MO, Rolf BA, Shirts BH,
              Gilmore MJ, Okuyama S, Zepp JM, Kauffman TL, Mittendorf KF,
              Bellcross C, Jenkins CL, Joseph G, Riddle L, Syngal S, Ukaegbu C,
              Goddard KAB, Wilfond BS, Jarvik GP; CHARM Study. (2022). Genet
              Med.{" "}
              <Link
                label="https://doi.org/10.1016/j.gim.2022.02.006"
                url="https://doi.org/10.1016/j.gim.2022.02.006"
              />
            </span>
          }
          title="Laboratory-related outcomes from integrating an accessible delivery model for hereditary cancer risk assessment and genetic testing in populations with barriers to access"
        />
      </Accordion>
    </PublicationsByYear>
  );
};
