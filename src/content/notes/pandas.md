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

- `merge` performs inner join by default, note that `how=left` is left outer join, not a left inner join, it is the same for `join` method with default `how='left'`
- `concat` performs outer join by default, either by rows or columns, can join multiple dataframes at once, runs in linear time, allows inner join on the index
- `join` performs left join by default. Note: `join` don't have `left_index`, `right_index`, `left_on`, or `right_on` parameters. It only has `on` parameter. Without `on`, it will join on the index.
- `append` is a shortcut for `concat` by rows
- `str` accessor for string manipulation. Note that it does not change the column into `str` type, and `object` is not a string type. Using it for non-string columns will produce unexpected results. E.g. using `df.col.str.replace('.0', '')` on a object column containing `1.0` will produce `NaN` because pandas trying to use `.strip('.0')` on a float, which cause exception and return `NaN`.
- `df.shape[0]` == `len(df)` != `df.size`
- use `pd.concat([arr1, arr2], axis=1)` instead of `pd.DataFrame([arr1, arr2])` to preserve dtypes

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

### How to turn a string column into a numerical form that could be handled by model?

```python
# for ordinal encoding
df.col.astype('category').cat.reorder_categories(['xs', 'md', 'xl'], order=True).cat.codes
# for one-hot encoding
df.col.str.get_dummies(sep='|')
# for a list of string
df.col.str.join('|').str.get_dummies(sep='|')

# sklearn alternative
# for ordinal encoding, note that categories is for ordering
enc = OrdinalEncoder(categories=[['xs', 'md', 'xl']], dtype=int)
# for one-hot encoding (not for list of string)
enc = OneHotEncoder(sparse_output=False, dtype=int)
# for one-hot encoding (for list of string)
# note it uses single bracket
enc = MultiLabelBinarizer(sparse_output=False)
enc.fit_transform(df.col) # for list column (storing list of strings)
enc.fit_transform(df.col.str.split(" ")) # for string column (storing sentence)

# Note: without sparse_output=False, the transform output will be a sparse matrix
# which can be turned into a dense matrix by calling toarray() method

# Note 2: pd.factorize() is not recommended because it doesn't store the mapping
```

### How to manipulate a column with a list as its value?

1. If it is a list of strings, you can use `str` accessor to manipulate, e.g. `df.col.str.join('|')` to join the strings in the list with a comma. Note that the only function that can be used for a list of strings is `len` and `join`. Other string methods will produce very strange results that you may not catch and make you debugging for hours.
2. If it is a list of numbers, you can use `apply` to turn it into a series, e.g. `df.col.apply(pd.Series).mean(axis=1)` to calculate the mean of the numbers in the list.
