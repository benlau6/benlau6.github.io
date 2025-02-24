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
