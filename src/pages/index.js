/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - home page wrapper.
 */

// Core dependencies
import React from "react";

// App dependencies
import Home from "../components/home/home";
import Layout from "../components/layout";

class IndexPage extends React.Component {

    render() {
        const description = "AnVIL – an Analysis, Visualization, and Informatics Lab-space for democratizing genomic data access, sharing and computing across large genomic-related data sets.",
            title = "Cloud-based Genomic Data Science";
        return (
            <Layout description={description} homePage={true} title={title}>
                <Home/>
            </Layout>
        );
    }
}

export default IndexPage;
