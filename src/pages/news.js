/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - news page.
 */

// Core dependencies
import React from "react";

// App dependencies
import Layout from "../components/layout";
import Scoops from "../components/scoops/scoops";

class News extends React.Component {

    render() {
        return (
            <Layout>
                <Scoops/>
            </Layout>
        );
    }
}

export default News;
