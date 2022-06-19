import analytics.charts as ac
from html import escape as escape_html


def adjust_table_index_key(val):
	if isinstance(val, str):
		if val[0] == "/":
			return ('<a href="' + escape_html("https://anvilproject.org" + val) + '">' + escape_html(val) + '</a>', True)
	return val


def plot_users_over_time(**other_params):
	return ac.show_plot_over_time(
		"Monthly Activity Overview",
		["Users", "Total Unique Pageviews"],
		["ga:30dayUsers", "ga:uniquePageviews"],
		df_filter=ac.make_month_filter(["ga:30dayUsers"]),
		df_processor=lambda df: df[::-1],
		change_dir=-1,
		**other_params
	)

