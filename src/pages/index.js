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
        const description = "Analyze large, open & controlled-access genomic datasets with familiar tools and reproducible workflows in a secure cloud-based execution environment.",
            title = "Migrate Your Genomic Analysis to the Cloud";
        return (
            <Layout description={description} homePage={true} title={title}>
                <Home/>
            </Layout>
        );
    }
}

export default IndexPage;
