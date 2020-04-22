#Requesting Researcher Data Access

<hero small>The AnVIL is a repository for a number of robust controlled access datasets. While these datasets have significant scientific value, access to them must be controlled in adherence to NIH Policy and in line with the standards set forth in the individual consents involved in each cohort.</hero>
 
 This document intends to explain the process by which external, non-consortium members can gain access to a given cohort that is housed within the AnVIL.

##Goals
1. Inform a novice user how to link their Terra Account to their eRA Commons address.
1. Inform a novice user how to navigate to dbGaP and submit a Data Access Request (DAR).
1. Explain how the AnVIL uses dbGaP telemetry files to grant access.

##Linking Your Terra Account And Your eRA Commons Address
1. Have an eRA Commons or NIH account. Go [here](https://wiki.nci.nih.gov/display/TCGA/Application+Process) for instructions to set up an eRA Commons or NIH account.
1. Establish a link in Terra to your eRA Commons/NIH Account. To link an eRA Commons to your Terra account, go to your [Profile page](https://anvil.terra.bio/#profile) in Terra and log in with your NIH credentials. _(Note: Once per month, you will need to relink these accounts to ensure that you still have proper access)_.

##Submitting A Data Access Request

1. **Identify the phsID of the cohort you wish to access.** A helpful list of datasets can be found on our [datasets](/data) page.
1. **Request Access.** Navigate to the dbGaP page for that study and click “Request Access” near the top of the screen.
1. **Navigate to your DAR.** Follow the prompts for dbGaP Data Download to submit a Data Access Request (DAR). Include as much information as you can, as this will help the Data Access Committee evaluate your application.
1. **Wait for a response.** Each Data Access Committee hand evaluates their own DARs. Depending on the DAC, this can take some time. You will be notified via email when your application is approved or rejected.
1. **Your access is granted!** Using telemetry files, dbGaP informs Terra which users should be given access to each dataset. For more detail, see the section on Telemetry files below.

##Telemetry Files
Once a user has been granted access by the relevant Data Access Committee (DAC), dbGaP will list their eRA Commons ID within that cohort’s telemetry file - a secure list provided to external data sources like the AnVIL.
 
 The names on that list are synced with the relevant workspace using a Terra Authorization Domain, and using the linkage between a user’s Terra Account and their eRA Commons ID, the system automatically grants access when the user attempts to view or access that workspace.
