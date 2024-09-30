---
title: Pandas
publishDate: 2024-09-30
---

# Pandas

## Note

- `pandas` only for interviews or small datasets. So don't drill down too much on it. Just get familiar with the basic operations, and pass the interview.
- `PySpark`, `Polars` or `DuckDB` for real-world applications, which can use SQL-like syntax and are faster than `pandas`

## Practice

- [pandas-100@github](https://github.com/ajcr/100-pandas-puzzles)

## Common operations

- `merge` performs inner join by default
- `concat` performs outer join by default, either by rows or columns, can join multiple dataframes at once, runs in linear time, allows inner join on the index
- `join` performs left join by default. Note: `join` don't have `left_index`, `right_index`, `left_on`, or `right_on` parameters. It only has `on` parameter. Without `on`, it will join on the index.
- `append` is a shortcut for `concat` by rows

## Data manipulation

### How to create a dataframe from a bunch of numpy arrays with preserved dtypes?

1. Turn each array into a series
2. Concatenate the series into a dataframe along the column axis

```python
arr1 = np.arange(10)
arr2 = np.random.rand(10)
arr3 = np.random.choice(['a', 'b'], 10)
series = map(pd.Series, [arr1, arr2, arr3])
df = pd.concat(series, axis=1)
print(df.types)
```

> Note: `pd.DataFrame(np.c_[arr1, arr2, arr3])` or `pd.DataFrame([arr1, arr2, arr3]).T` do not preserve dtypes, so avoid them.

### How to merge a dataframe and a series?

```python
# rename the series to the column name
df.merge(series.rename('col2'), how='left', left_on='col1', right_index=True)
```
