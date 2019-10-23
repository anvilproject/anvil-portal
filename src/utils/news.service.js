/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic news service.
 */

const newsIntroductionSlug = "/news/news-intro";

/**
 * Returns Date instance of a date string.
 *
 * @param date
 * @returns {Date}
 */
function getDate(date) {

	return new Date(date);
}

export function getNewsArticles(posts) {

	if ( !posts ) {

		return [];
	}

	const newsPost = posts.filter(post => {

		if ( !post ) {

			return [];
		}

		const slug = post.fields.slug;

		return slug !== newsIntroductionSlug;
	});

	return orderNewsArticles(newsPost);
}

/**
 * Returns the news introduction.
 *
 * @param posts
 */
export function getNewsIntroductionPost(posts) {

	if ( !posts ) {

		return [];
	}

	const newsPost = posts.filter(post => {

		if ( !post ) {

			return [];
		}

		const slug = post.fields.slug;

		return slug === newsIntroductionSlug;
	});

	return newsPost[0];
}

/**
 * Order news articles by date.
 * @param articles
 */
function orderNewsArticles(articles) {

	if ( !articles ) {

		return [];
	}

	return articles.sort((article1, article2) => {

		const date1 = getDate(article1.frontmatter.date);
		const date2 = getDate(article2.frontmatter.date);

		if ( date1 > date2 ) {

			return 1;
		}

		if ( date1 < date2 ) {

			return -1;
		}

		return 0;
	});
}

