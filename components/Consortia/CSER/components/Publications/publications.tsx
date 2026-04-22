import { JSX } from "react";
import { Publications as ConsortiumPublications } from "../../../components/Publications/publications";
import publications from "./publications.json";

export const Publications = (): JSX.Element => {
  return <ConsortiumPublications publications={publications} />;
};
