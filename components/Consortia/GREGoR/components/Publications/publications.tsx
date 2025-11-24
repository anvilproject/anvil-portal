import publications from "./publications.json";
import { Publications as ConsortiumPublications } from "../../../components/Publications/publications";

export const Publications = (): JSX.Element => {
  return <ConsortiumPublications publications={publications} />;
};
