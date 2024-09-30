---
title: State Space Models
publishDate: 2024-09-20
---

# State Space Models

- Defined in terms of a pair of equations
  - Observation equation: $y_t = Z_t^T \alpha_t + \varepsilon_t$
    - It links the observed data $y_t$ to a latent d-dimensional state vector $\alpha_t$
  - State equation: $\alpha_{t+1} = T_t \alpha_t + R_t \eta_t$
    - It governs the evolution of the state vector $\alpha_t$ through time
