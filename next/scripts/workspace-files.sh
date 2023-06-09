row="$1"
bucketName=$(cut -f 10 <<< "$row")
workspaceName=$(cut  -f 1 <<< "$row")

echo "$workspaceName"
echo "$bucketName"

gsutil -u anvil-and-terra-development ls -l  gs://"$bucketName"/** | while read -r line ; do
    trimed=$(tr -s ' ' <<< "$line")
    bytes=$(cut -d ' ' -f 1 <<< "$trimed")
    date=$(cut -d  ' ' -f 2 <<< "$trimed")
    out=${date}\,${bytes}
    echo "$out" >> workspace-files/"$workspaceName".csv
done

#gsutil -u anvil-and-terra-development ls -l  gs://"$bucketName"/**   | cut -d , -f 1 > "$workspaceName".csv

#Last run command
# while read in; do ./workspace-files.sh "$in"; done < ../AnVILCatalogWorkspacesPublicMetadataFromTerraAPI-2022-11-07.tsv
