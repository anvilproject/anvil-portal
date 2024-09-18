## Installing the environment
- Use Python 3.12.4
- Run `python -m venv ./venv` to create a new environment under `./venv`
- Run `source ./venv/bin/activate` to activate the environment
- Run `pip install -r ./requirements.txt` to install requirements
- To make the environment available as an option for notebooks, run `ipython kernel install --user --name=anvil-analytics`

## Deactivating/reactivating
- To deactivate the environment, run `deactivate`
- To activate the environment again, run `source ./venv/bin/activate`

## Resolving Jupyter Book timeout
Jupyter Book may time out while building the PDF. This can be resolved by
manually editing `./venv/lib/python3.9/site-packages/jupyter_book/pdf.py`
to change line 50...
```python
await page.goto(f"file:///{html_file}", {"waitUntil": ["networkidle2"]})
```
...by adding the `"timeout": 0` option:
```python
await page.goto(f"file:///{html_file}", {"waitUntil": ["networkidle2"], "timeout": 0})
```
