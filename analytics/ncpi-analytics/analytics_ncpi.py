import analytics.api as ga
import analytics.charts as ac
from html import escape as escape_html
from googleapiclient.discovery import build
import pandas as pd

yt_service_params = (ga.yt_service_params[0] + ['https://www.googleapis.com/auth/youtube'],) + ga.yt_service_params[1:]

yt_traffic_sources = {"ANNOTATION", "CAMPAIGN_CARD", "END_SCREEN", "HASHTAGS", "LIVE_REDIRECT", "NOTIFICATION", "PLAYLIST", "PROMOTED", "RELATED_VIDEO", "SUBSCRIBER", "YT_CHANNEL", "YT_OTHER_PAGE", "YT_PLAYLIST_PAGE", "YT_SEARCH"}
unknown_traffic_sources = {"NO_LINK_EMBEDDED", "NO_LINK_OTHER"}

yt_data_service = None

videos_info = {}

site_video_views = []
yt_video_views = []

def authenticate_yt(secret_name):
	service_system = ac.authenticate_api(secret_name, yt_service_params)
	global yt_data_service
	yt_data_service = build('youtube', 'v3', credentials=service_system[3])
	return service_system

def get_df_videos_info(df):
	missing_videos = [id for id in df.index if not id in videos_info]
	results = yt_data_service.videos().list(part="snippet,contentDetails,statistics", id=",".join(missing_videos)).execute()
	for item in results["items"]:
		videos_info[item["id"]] = item
	return df

def adjust_table_index_key(val):
	if isinstance(val, str):
		if val[0] == "/":
			return ('<a href="' + escape_html("https://anvilproject.org" + val) + '">' + escape_html(val) + '</a>', True)
	return val

def format_video_key(id):
	return ('<a href="' + escape_html('https://www.youtube.com/watch?v=' + id) + '">' + escape_html(videos_info[id]["snippet"]["title"] if id in videos_info else id) + '</a>', True)


def get_video_duration_text(id):
	text = str(pd.Timedelta(videos_info[id]["contentDetails"]["duration"]))
	if text[:7] == "0 days ":
		text = text[7:]
	return text

def format_video_stats_table(df, column_defs):
	df = df.copy(deep=True)
	watch_percent_column = df["Average watch %"]
	df.drop(columns=watch_percent_column.name, inplace=True)
	df["Average watch time (minutes)"] /= 60
	total_views_column = pd.Series([videos_info[id]["statistics"]["viewCount"] for id in df.index], index=df.index, name="All-time views")
	duration_column = pd.Series([get_video_duration_text(id) for id in df.index], index=df.index, name="Video duration")
	df.insert(1, total_views_column.name, total_views_column)
	df.insert(3, duration_column.name, duration_column)
	plain_value_processor = lambda v, i, c: ('<div style="text-align: center">' + str(v) + '</div>', True)
	column_defs = {
		**column_defs,
		total_views_column.name: [("minmax(4.5em, min-content)", plain_value_processor)],
		"Average watch time (minutes)": [column_defs[None][0], ("3.8em", lambda v, i, c: ('<div style="color: darkgray">' + "{:.2f}".format(watch_percent_column[i]) + '%</div>', True)), column_defs[None][1]],
		duration_column.name: [("minmax(5.8em, min-content)", plain_value_processor)]
	}
	return (df, column_defs)


def show_value_difference_table(label, values, **other_params):
	df = pd.DataFrame({label: [values[0]]}, index=[label])
	df_prev = pd.DataFrame({label: [values[1]]}, index=[label])
	display(ac.format_table_with_change(df, df_prev, show_symbols=False, hide_index=False, hide_columns=True, **other_params))

def make_subtraction_processor(values):
	values = values[:]
	
	def processor(df):
		df = df.copy(deep=True)
		df.iat[0, 0] = max(df.iat[0, 0] - values[0], 0)
		del values[0]
		return df
	
	return processor


def save_site_video_views(df):
	site_video_views.append(df["ga:hits"].agg("sum"))
	return df

def collapse_yt_sources(df):
	df = pd.DataFrame({df.columns[0]: df.filter(yt_traffic_sources, axis="rows").agg("sum").rename({df.columns[0]: "Views from YouTube"})})
	yt_video_views.append(df.iloc[0, 0])
	return df

def extract_anvil_source(df):
	return df.loc["anvilproject.org":"anvilproject.org"].rename({"anvilproject.org": "Views from AnVIL website"})

def collapse_unknown_sources(df):
	return pd.DataFrame({df.columns[0]: df.filter(unknown_traffic_sources, axis="rows").agg("sum").rename({df.columns[0]: "Views from unknown sources"})})


def show_difference_and_get_top_videos(save_amount, *ordered_params, **other_params):
	top_videos_container = []
	
	def processor(df):
		if len(top_videos_container) == 0:
			top_videos_container.append(",".join(df.index[:save_amount]))
			get_df_videos_info(df)
		return df
	
	ac.show_difference_table(*ordered_params, df_processor=processor, **other_params)
	
	return "video==" + top_videos_container[0]


def plot_yt_over_time(**other_params):
	df = ac.show_plot_over_time(
		"Monthly Activity Overview",
		["Views Per Month"],
		["views"],
		dimensions="day",
		df_filter=lambda df: ac.make_month_filter([])(df)[:-1],
		format_table=False,
		**other_params
	).rename(columns={"Views Per Month": "Views"})
	return ac.format_change_over_time_table(df, pre_render_processor=lambda df, cd: (df[::-1], cd), **other_params)


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

