---
title: Database Modeling
publishDate: 2025-02-22
---

# Database Modeling

## Star schema

- It is a data model for data warehouse
- Star schema makes things modular, you can update smaller tables when things change and the changes get propagated.
- [Fact vs. Dimension Tables Explained](https://www.montecarlodata.com/blog-fact-vs-dimension-tables-in-data-warehousing-explained/) - Fact tables capture the quantitative essence of business events – sales, clicks, shipments. Dimension tables provide the crucial context – who, what, where, when. Together, they transform data from a source of frustration into a navigable landscape of business intelligence.
  - You can use different types of dimension tables within your data warehouse: Conformed Dimensions, [Role-Playing Dimensions](https://learn.microsoft.com/en-us/power-bi/guidance/star-schema#role-playing-dimensions), and [Slowly Changing Dimensions](https://learn.microsoft.com/en-us/power-bi/guidance/star-schema#slowly-changing-dimensions) (SCD)
    - Type 1 SCD overwrite old data, while type 2 SCD append data, with additional colummns which are start_date, end_date, and is_current
    - A role-playing dimension is a dimension that can filter related facts differently.
- A fact table contains the quantitative data or facts of a business process, such as sales or revenue. The fact table typically consists of numerical values and foreign keys that link to dimension tables.
- Dimension tables provide context or descriptive information about the data in the fact table. They contain attributes or characteristics that help to categorize or classify the data, such as product, customer, location, and time. Dimension tables are usually smaller than fact tables and contain unique values for each attribute.
- Resources
  - [The Bible](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/data-warehouse-dw-toolkit/)
  - [Data Modeling – The Unsung Hero of Data Engineering: Modeling Approaches and Techniques (Part 2)](https://airbyte.com/blog/data-modeling-unsung-hero-data-engineering-approaches-and-techniques)
  - [Benefits from reddit users](https://www.reddit.com/r/dataengineering/comments/1gsscul/comment/lxhi9ir/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
  - [Design Tip #95 Patterns to Avoid when Modeling Header/Line Item Transactions](https://www.kimballgroup.com/2007/10/design-tip-95-patterns-to-avoid-when-modeling-headerline-item-transactions/)

### Star schema vs normalized data

- Star schema: Faster queries, simpler to understand, great for analysis and basic reporting, but can be redundant and inflexible.
- Normalized data: Less storage, better data integrity, but complex queries and less analysis-friendly.

## Medallion Architecture

- Three-Tier data
  - Bronze: raw data as-is from source systems, table like structure with some relevant metadata. It could be a data lake, or it could be right after data lake, which data lake contains raw json, csv and excel files instead of tables
  - Silver: cleansed and conformed data, dimension and fact tables (dim, fct) from star schema could be applied
  - Gold: curated business-level tables ready for business consumption , report table (rpt) from star schema could be applied
  - Resources
    - [Multi-tier architecture of Data Warehouse](https://www.geeksforgeeks.org/multi-tier-architecture-of-data-warehouse/)
    - [databricks - What is a medallion architecture?](https://www.databricks.com/glossary/medallion-architecture)
