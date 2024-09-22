---
title: SQL
publishDate: 2024-09-22
---

# SQL

## Questions to clear concepts

- what are the performance considerations of join queries?
- how to optimize a slow SQL query?
- what is a stored procedure, and when do we use them?
- what is normalization? Why might we want to also denormalize some tables?
- what is an index, and why does it speed up queries? what are the cons of using indexes?
- what is ACID, and how does a database enforce it?
- what is database sharding?
- what are the pros and cons of relational vs NoSQL databases?

## All Commands you need

- SELECT -- which column (could be wrapped by aggregate functions)
- FROM -- which table / view
- WHERE - which rows
- GROUP BY - used to group rows with similar values together, then aggregate function can be applied to each group.; it needs to be placed after `WHERE` and before `HAVING`
- HAVING - condition on values after GROUP BY (cannot use column alias)
- ORDER BY - ASC or DESC
- LIMIT - number of rows to return
- OFFSET - number of rows to skip
- LEFT JOIN / RIGHT JOIN / INNER JOIN / FULL JOIN -- think of it as a Venn diagram
  - ON - condition to join
- UNION / INTERSECT / EXCEPT -- combining queries
  - ALL - keep duplicates

### Conditional statements

- `CASE WHEN ... THEN ... ELSE ... END` -- conditional statement
- `FILTER (WHERE ...)` -- filter rows that satisfy the condition
- `IN` / `IN` / `EXISTS` / `EXISTS` / `BETWEEN` / `LIKE` / `IS NULL`
  - can be appended with `NOT`
- `DISTINCT` -- remove duplicates

### String functions

- `CONCAT(str1, str2)`
- 'str1' || 'str2'

### Numeric functions

- `ROUND(x, n)` -- round to n decimal places

### Casting

- `CAST(x AS type)` -- convert x to type
- `x::type` -- convert to type
- `COALESCE(arg1, arg2, ...)` -- takes multiple inputs and returns the first non-null value.
  - e.g. `COALESCE(NULL, 1, 2)` returns 1
  - e.g. `COALESCE(col, 0)` returns 0 if col is null

## Functions

- date/time functions -- vary by database framework
  - `CAST(x AS DATE)`
  - POSTGRES: NOW, CURRENT_DATE, INTERVAL, DATEDIFF, EXTRACT
    - e.g. `INTERVAL '1 day'`, `EXTRACT('day' FROM date)`

### Most used window functions

- `AVG (col) OVER (PARTITION BY col1 ORDER BY col2 ROWS BETWEEN start AND end)` - rolling average
  - `ROWS BETWEEN start AND end` - window frame
    - possible values: `UNBOUNDED PRECEDING`, `n PRECEDING`, `CURRENT ROW`, `n FOLLOWING`, `UNBOUNDED FOLLOWING`
- `ROW_NUMBER()` - auto increment row number in partition based on the order (outside ORDER BY was neglected)
  - e.g. `ROW_NUMBER() OVER (PARTITION BY column1 ORDER BY column2)`
- `RANK()` - rank in partition based on a column, different from `ROW_NUMBER()` if there are ties
- `DENSE_RANK()` - rank without skipping numbers
- `NTILE(#group)` - divide a partition into n groups
  - e.g. `NTILE(4) OVER (PARTITION BY column1 ORDER BY column2)` gives quartiles
  - e.g. `NTITLE(100) ...` gives percentiles, but inaccurate if there are insufficient rows
- `LAG(col, optional(offset))` - get nth previous row in partition (or no partition)
  - e.g. `LAG(column, 2) OVER (ORDER BY column2)`
  - e.g. `LAG(column) OVER (ORDER BY column2)` gives last row value
- `LEAD()`
- `NTH_VALUE(col, n)` - it may return null if n is out of range

### Most used aggregate functions

- AVG()
- COUNT() - number of rows
- MAX()
- MIN()
- SUM()

### Uncommon advanced aggregate functions

- array_agg()
- string_agg()

## Acknowledgement

- [sql-interview-guide](https://datalemur.com/blog/sql-interview-guide)

```sql
select part
from part_assembly
where finished_date is null
```
