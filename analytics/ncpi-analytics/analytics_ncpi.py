import pandas as pd
import analytics.charts as ac
from html import escape as escape_html


def adjust_table_index_key(val):
	if isinstance(val, str):
		if val[0] == "/":
			return ('<a href="' + escape_html("https://anvilproject.org" + val) + '">' + escape_html(val) + '</a>', True)
	return val


def plot_users_over_time(page_filters, **other_params):
	def process_df(df):
		pages_df = ac.get_data_df(["ga:pageviews"], "ga:date", filters=page_filters, **other_params)
		df = pd.concat([df, pages_df], axis="columns")
		return df[::-1]
	
	df = ac.show_plot_over_time(
		"Monthly Activity Overview",
		["Users Per Month", "Total Pageviews Per Month"],
		["ga:30dayUsers"],
		df_processor=process_df,
		change_dir=-1,
		df_filter=ac.make_month_filter(["ga:30dayUsers"]),
		format_table=False,
		**other_params
	).rename(columns={"Users Per Month": "Users", "Total Pageviews Per Month": "Total Pageviews"})
	return ac.format_change_over_time_table(df, **other_params)
