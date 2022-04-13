row="$1"
#bucketName=$(cut -d , -f 3 <<< "$row")
#workspaceName=$(cut -d , -f 1 <<< "$row")
bucketName=$(cut -f 9 <<< "$row")
workspaceName=$(cut  -f 1 <<< "$row")

gsutil -u anvil-and-terra-development ls -l  gs://"$bucketName"/** | while read -r line ; do

    trimed=$(tr -s ' ' <<< "$line")
    bytes=$(cut -d ' ' -f 1 <<< "$trimed")
    date=$(cut -d  ' ' -f 2 <<< "$trimed")
    out=${date}\,${bytes}
    echo "$out" >> "$workspaceName".csv
done

#gsutil -u anvil-and-terra-development ls -l  gs://"$bucketName"/**   | cut -d , -f 1 > "$workspaceName".csv

#while read in; do ../workspace-files.sh "$in"; done < ../output-2021-11-15.csv

#while read in; do ../workspace-files.sh "$in"; done < ../AnVILCatalogWorkspacesPublicMetadataFromTerraAPI-2022-03-15.csv