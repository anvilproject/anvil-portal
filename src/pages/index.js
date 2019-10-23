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

const IndexPage = () => (
    <Layout homePage={true}>
        <Home/>
    </Layout>
);

export default IndexPage;
