---
title: Scikit-learn
publishDate: 2024-09-30
---

# Scikit-learn

## Note

- sklearn `model.fit(X)` normally accept `df[['var1']]` with double bracket, not single bracket for `X`
- `PCA(n_components: int | float)` float n_compoents can be percentage of variance to be explained
- sklearn `model.transform` normally output `np.ndarray`, not `pd.DataFrame`
- `tn, fp, fn, tp = metrics.confusion_matrix(y_test, y_pred).ravel()`
- `fpr, tpr, thresholds = roc_curve(y_test, y_scores[:,1])`
- Scikit-learn in Python: 100+ Data Science Exercises ex.57: k-means from scratch
- Scikit-learn in Python: 100+ Data Science Exercises ex.68: pca from scratch
- check GridSearch on udemy Scikit-learn in Python: 100+ Data Science Exercises ex.50

  ```python=
  # python code about GridSearch
  X_train, X_test, y_train, y_test = train_test_split(data, target)

  classifier = DecisionTreeClassifier()

  params = {'max_depth': np.arange(1, 10),
               'min_samples_leaf': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20]}

  grid_search = GridSearchCV(
      classifier,
      param_grid=params,
      scoring='accuracy',
      cv=5
  )
  grid_search.fit(X_train, y_train)
  print(grid_search.best_params_)
  ```

## Common Model

- `train_test_split(X, y, test_size=0.33, stratify=y | None)`
- `GridSearch(model, param_grid: dict, scoring: str, cv:int)`
  - `clf.best_params_`
- `RandomForestClassifier`
- `LinearRegression`
  - `coeffs_`
- `LogisticRegression`
- `CountVectorizer(stop_words: list | Literal['english'])` remove words
