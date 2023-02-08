import pandas as pd
import re

def extract_names(source_file_name, names_file_name, info_file_name=None):
	secondary_symbols = {
		"RS", 
		"RUO",
		"NMDS"
		"GSO",
		"NPU",
		"PUB",
		"COL",
		"IRB",
		"GS", 
		"MOR",
		"TS", 
		"US", 
		"PS", 
		"IS", 
		"MDS",
	}

	def get_names():
		df = pd.read_csv(source_file_name, encoding="cp1252", sep="\t", header=0, keep_default_na=False)
		info_df = df.loc[df["Abbrev"].str.startswith("DS-")].copy(deep=True)
		info_df[["Disease abbrev", "Disease name", "Disease abbrev parts", "Disease name parts", "Unknown following abbrev", "Known in abbrev", "Known in name"]] = info_df.apply(lambda row: pd.Series(get_name_info(*row)), axis=1)
		info_df["Name variations"] = info_df.groupby("Disease abbrev")["Disease name"].transform("nunique")
		mapping_df = info_df.groupby(["Disease abbrev", "Disease name"])["Disease name"].count().rename("Count").to_frame().reset_index(level=1).sort_values("Count").groupby("Disease abbrev").first()
		mapping_df[["Disease name"]].drop("").to_csv(names_file_name, sep="\t")
		if not info_file_name is None:
			info_df.to_csv(info_file_name, sep="\t", index=False)

	def get_name_info(abbrev, text, occurences):
		paren_match = re.match("(?i)^Disease[- ]Specific \\(([^)]*)\\)$", text)

		if paren_match:
			paren_parts = paren_match.group(1).split(", ")
			paren_heads = [(part[:part.index("-")] if "-" in part else part) for part in paren_parts]
			abbrev_parts = abbrev[3:].split("-")

			disease_abbrev_parts = []
			unknown_following_abbrev = ""
			known_in_abbrev = []

			for symbol in abbrev_parts:
				if symbol in paren_heads:
					if not symbol in secondary_symbols:
						unknown_following_abbrev = symbol
					break
				else:
					if symbol in secondary_symbols:
						known_in_abbrev.append(symbol)
					disease_abbrev_parts.append(symbol)
			
			rest_abbrev_parts = abbrev_parts[len(disease_abbrev_parts):]

			disease_name_parts = []
			known_in_name = []

			if disease_abbrev_parts:
				for i, head in enumerate(paren_heads):
					if head in rest_abbrev_parts:
						break
					else:
						if head in secondary_symbols:
							known_in_name.append(head)
						disease_name_parts.append(paren_parts[i])

			return ["-".join(disease_abbrev_parts), ", ".join(disease_name_parts), len(disease_abbrev_parts), len(disease_name_parts), unknown_following_abbrev, known_in_abbrev, known_in_name]
		
		return ["", "", "", "", "", "", ""]


	get_names()