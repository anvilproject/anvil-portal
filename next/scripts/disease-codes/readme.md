## Info
- `consent_abbrev_mapping.tsv` is the input file
- `disease_abbrev_mapping.tsv` is the output file

## Setup
- Run `python -m venv ./venv` to create a new environment under `./venv`
- Run `source ./venv/bin/activate` to activate the environment
- Run `pip install -r ./requirements.txt` to install requirements
- To make the environment available as an option for notebooks, run `ipython kernel install --user --name=anvil-disease-codes`
    - Make sure that the path listed by Jupyter for the kernel is to the virtual environment

## Deactivating/reactivating
- To deactivate the environment, run `deactivate`
- To activate the environment again, run `source ./venv/bin/activate`