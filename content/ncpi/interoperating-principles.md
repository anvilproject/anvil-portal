# Five Principles for Interoperating Data Platforms

<hero small>The NCPI has adopted the following interoperating principles help guide our efforts.</hero>

Version C April 8, 2020

Over the last few years, a growing number of cloud-based data platforms have been developed that provide the research and translational community with access to data that is integrated with computational resources, services and workspaces, as well as knowledge resources, semantic services and AI services. 

As the number of these platforms grows, it is becoming critical to establish some operating principles so that platforms can interoperate, allowing researchers to access, explore and integrate data from multiple platforms. 

Interoperating data platforms in this way is a critical step towards creating a data ecosystem that benefits: the users of the platform, who can access the data they need for their research; the funders and other supporters of the platforms, whose efforts and investments are leveraged and available to a broader community; and the patients, study participants, and other data contributors whose critical contributions have a greater impact.  

Before we introduce the principles, we need one definition.  A trust relationship is an agreement between two or more data platforms about security, compliance, and liability that provides the foundation for two or more platforms to interoperate.  A trust relationship also includes an agreement about any fees or charges required to access data in the platform.


## Five Principles

1. Form trust relationships and interoperate with other platforms: The first principle is to form trust relationships with other platforms and use these as a basis for interoperating with them.
 
2. Follow the golden rule of data resources: If you access someone else’s data, let them have access to your data, assuming you are operating at the same level of security and compliance. Any restrictions on data access or use (including the ability for data to flow across platforms) should be based on transparent and clearly documented policies. For example, limitations may be imposed by patient consent or data security matters, but not investigator or consortia preferences.
 
3. Support the principle of least restrictive access:  If your data is open access, provide an API.  If your data is controlled access and you have a trust relationship with another platform, provide access to your data in the least restrictive manner possible. Whenever possible, a data resource should provide an API so that an application in another platform can access data directly. If this is not possible, then support the ability for approved queries or analyses to be run over your data and the results returned. Sometimes this is called an analysis or query gateway or a federated analysis or query.
 
4. Agree on standards, compete on implementations: It is important to open up your platform to competition to ensure that it provides the best quality services to end-users. Try to keep your system open so applications can compete to provide the best experience for researchers.  Remember that not all researchers have the same requirements, or the same preferences, and in general a mix of applications, systems and platforms is better than a single one.
 
5. Plan to support patient partnered research: Plan for a future in which individuals can provide their data and have control over it within your platform. Even better, provide such a capability today within your platform.

## Discussion 

As usual, we use the term controlled access if access and use of  data requires the signing of data use or data access agreements that specify specific levels of security, restrictions on how the data is used (secondary use restrictions), or similar types of restrictions.  If this is not the case, we say that the data is open access.

These principles do not circumvent the need for data access controls for all controlled access data on each platform.  Indeed, when two platforms have a trust relationship they agree specifically on the policies, procedures and controls when one platform accesses or transfers controlled access data from the other.  In this way, two interoperating platforms can protect the confidentiality, integrity and availability of controlled access data and yet make this data available across different systems and platforms.

Sometimes platforms impose a requirement that an account be created and fees paid to remove data from their platform, even if the data remains within the same public cloud.  Although there are reasons for this particular architecture choice, this type of platform or vendor lock-in creates significant barriers to researchers using the platform.  In particular these types of fees violate Principle 3.  It is important to note that these types of fees are different from the egress fees charged by cloud service providers.



## Notes

1. Notice that with this definition above of a trust relationship, a data ecosystem is naturally formed by a platform and all the other platforms that have a direct trust relationship with it.

1. We might also consider saying that two systems have a data peering relationship if they have a trust relationship as defined above, allowing them to exchange both open and controlled access data.  Recall that peering between two internet service providers is an agreement supporting the exchange of traffic between users on the two systems.

 
  