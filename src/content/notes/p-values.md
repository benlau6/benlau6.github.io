---
title: P-values
publishDate: 2024-09-20
---

# P-values

- Composed of 3 parts
  - The probability random chance would result in the observation.
  - The probability of observing something else that is equally rare.
  - The probability of observing something rarer or more extreme.
- Avoid p-hacking
  - Alter the data or confidence level after seeing the p-value
  - Perform [power analysis](/power-analysis.md) before doing the experiment
  - [StatQuest](https://www.youtube.com/watch?v=HDCOUXE3HMM)
- [Bootstrapping p-value](/bootstrap.md)
- Multiple testing
  - If you carry out enough tests, you are bound to see something odd.
  - [StatQuest - FDR](https://www.youtube.com/watch?v=K8LQSvtjcEo)

## Questions to ask yourself

- [Say you flip a coin 10 times and observe only one heads. What would be your null hypothesis and p-value for testing whether the coin is fair or not?](https://datalemur.com/questions/coin-fairness-test)

## Good one liners to summarize

- The p-value assumes the same sampling procedure, it is true only if the exact same experiment is repeated many times. [source](https://www.youtube.com/watch?v=vemZtEM63GY)
- The p-value is the probability of the evidence, given your null hypothesis, which is distinct from the probability that the null hypothesis is true, given your evidence. [source](https://theconversation.com/new-physics-at-the-large-hadron-collider-scientists-are-excited-but-its-too-soon-to-be-sure-157871)
- The definition of a p-value is the probability of observing the sample data, or more extreme data, assuming the null hypothesis is true. [source](https://lakens.github.io/statistical_inferences/01-pvalue.html)
- As Benjamini (2016) notes, a p-value “offers a first line of defense against being fooled by randomness, separating signal from noise”.
- p-values are a statement about the probability of data, not a statement about the probability of a hypothesis or the probability of a theory. Whenever you see p-values interpreted as a probability of a theory or a hypothesis, you know something is not right. [source](https://lakens.github.io/statistical_inferences/01-pvalue.html#sec-misconception1)

## Misconceptions

- [1.7 Preventing common misconceptions about p-values](https://lakens.github.io/statistical_inferences/01-pvalue.html#sec-misconceptions)

## Insights

- A 3-sigma result means there is a roughly 1 in 1,000 probability that observations at least as extreme as those gathered would occur, given the null hypothesis. Physicists don’t usually crack open the champagne until they have a 5-sigma result. A 5-sigma result tells you there would be a chance of less than one in a million. [source](https://theconversation.com/new-physics-at-the-large-hadron-collider-scientists-are-excited-but-its-too-soon-to-be-sure-157871)
- there’s the adage that extraordinary claims require extraordinary evidence. The Standard Model is extremely well confirmed. It will take an extremely striking observation (such as on observation of an event that would be very unlikely if the standard model were true) to reduce confidence in the model. [source](https://theconversation.com/new-physics-at-the-large-hadron-collider-scientists-are-excited-but-its-too-soon-to-be-sure-157871)
- To confirm a discovery, ideally the results need to be replicated using a different experimental set up (one that doesn’t risk also replicating the same errors), preferably more than once. [source](https://theconversation.com/new-physics-at-the-large-hadron-collider-scientists-are-excited-but-its-too-soon-to-be-sure-157871)
- ‘Significant’ means that something is worthy of attention. A hypothesis test is used to distinguish a signal (that is worth paying attention to) from random noise in empirical data. Researchers use a methodological procedure to decide whether to make an ordinal claim or not as a safeguard against confirmation bias. [source](https://lakens.github.io/statistical_inferences/01-pvalue.html)
- It is worth distinguishing statistical significance (denoted by p-values), which is only used to claim whether an observed effect is a signal or noise, from practical significance (denoted by effect sizes), which depends on whether the size of the effect is large enough to have any worthwhile consequences in real life. [source](https://lakens.github.io/statistical_inferences/01-pvalue.html)
- One question that interests scientists is whether measurements that have been collected under different conditions differ, or not. The answer to such a question is an ordinal claim.
- just because data are surprising, does not mean we need to care about it. It is mainly the word ‘significant’ that causes confusion here – it is perhaps less confusing to think of a ‘significant’ effect as a ‘surprising’ effect, but not necessarily as an ‘important’ effect. [source](https://lakens.github.io/statistical_inferences/01-pvalue.html#misconception-3-a-significant-p-value-means-that-a-practically-important-effect-has-been-discovered.)
- the phrase "or more extreme" might be paraphrased as "more favourable towards H1" or "more persuasive of H1".

## Questions to clarify

[Why can't we accept the null hypothesis, but we can accept the alternative hypothesis?](https://stats.stackexchange.com/questions/587383/why-cant-we-accept-the-null-hypothesis-but-we-can-accept-the-alternative-hypot)

[Answer 1](https://stats.stackexchange.com/a/587384)

- Absence of evidence is not evidence of absence
- probability ≠ proof
- The simplest way to understand hypothesis testing (NHST) — at least for me — is to keep in mind that p-values are probabilities about the data (not about the null and alternative hypotheses): Large p-value means that the data is consistent with the null hypothesis, small p-value means that the data is inconsistent with the null hypothesis. NHST doesn't tell us what hypothesis to reject and/or accept so that we have 100% certainty in our decision: hypothesis testing doesn't prove anything٭. The reason is that a p-value is computed by assuming the null hypothesis is true [3].

---

[Answer 2](https://stats.stackexchange.com/a/587633)

We should not accept the research/alternative hypothesis.

The main value of a null hypothesis statistical test is to help the researcher adopt a degree of self-skepticism about their research hypothesis. The null hypothesis is the hypothesis we need to nullify in order to proceed with promulgation of our research hypothesis. It doesn't mean the alternative hypothesis is right, just that it hasn't failed a test - we have managed to get over a (usually fairly low) hurdle, nothing more. I view this a little like naive falsificationism - we can't prove a theory, only disprove it†, so all we can say is that a theory has survived an attempt to refute it. IIRC Popper says that the test "corroborates" a theory, but this is a long way short of showing it is true (or accepting it).

Is it reasonable for the frequentist to "accept" the alternative hypothesis that the sun has gone nova? No!!! In this case, the most obvious reason is that the analysis doesn't consider the prior probabilities of the two hypotheses, which a frequentist would do by setting a much more stringent significance level. But also there may be explanations for the neutrinos that have nothing to do with the sun going nova (perhaps I have just come back from a visit to the Cretaceous to see the dinosaurs, and you've detected my return to this timeline). So rejecting the null hypothesis doesn't mean the alternative hypothesis is true.

A frequentist analysis fundamentally cannot assign a probability to the truth of a hypothesis, so it doesn't give much of a basis for accepting it. The "we reject the null hypothesis" is basically a an incantation in a ritual. It doesn't literally mean that we are discarding the null hypothesis as we are confident that it is false. It is just a convention that we proceed with the alternative hypothesis if we can "reject" the null hypothesis. There is no mathematical requirement that the null hypothesis is wrong. This isn't necessarily a bad thing, it is just best to take it as technical jargon and not read too much into the actual words.

Unfortunately the semantics of Null Hypothesis Statistical Tests are rather subtle, and often not a direct answer to the question we actually want to pose, so I would recommend just saying "we reject the null hypothesis" or "we fail to reject the null hypothesis" and leave it at that. Those that understand the semantics will draw the appropriate conclusion. Those who don't understand the semantics won't be mislead into thinking that the alternative hypothesis has been shown to be true (by accepting it).

---

## Terminology

- rejection region: aka critical region, the set of values of the test statistic for which the null hypothesis is rejected. i.e. if the observed test statistic is in the critical region then we reject the null hypothesis and accept the alternative hypothesis.

## Recommended Readings

- [Improving Your Statistical Inferences](https://lakens.github.io/statistical_inferences/01-pvalue.html#sec-misconceptions)
- [A Dialog Between a Teacher and a Thoughtful Student about p-values](https://stats.stackexchange.com/a/130772)
- [A Dirty Dozen: Twelve P-Value Misconceptions -- Goodman, 2008](https://doi.org/10.1053/j.seminhematol.2008.04.003)
- [p-values: What they are and how to interpret them](https://www.youtube.com/watch?v=vemZtEM63GY)

## Acknowledgements

- [DataLemur](https://datalemur.com)
