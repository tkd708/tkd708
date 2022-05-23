---
layout: post
title: 'Generalized Additive Models (GAMs) in R'
author: [Naoya]
image: ../img/r_logo.png
date: '2022-02-15T23:42:37.121Z'
draft: false
tags:
  - Research
  - Statistics
  - R
  - GAM
excerpt: A post summarising Generalized Additive Models (GAMs) in R for ecology research together with materials and references.
---

I've been using Generalized Additive Models (GAMs) in my research.
It's such a powerful tool to analyse data in ecology and many other fields.
R package "mgcv" (Wood, 2006) is probably the most popular option to implement GAMs.
The package has got great flexibility, allowing (and forcing) users to configure the implementation of GAMs depending on the nature of the data and the purpose of the analysis.
In this blog post, I introduce and summarise useful materials to implement GAMs using mgcv together with example studies in ecology research.

<br>

## Introduction

> A generalized additive model (Hastie and Tibshirani, 1986, 1990) is a generalized linear model (GLM) with a linear predictor involving a sum of smooth functions of covariates.

There are good introductions of GAM itself... needless to say the book written by the package developer (Wood, 2017) as well as well-summarised materials on the internet.

- https://multithreaded.stitchfix.com/blog/2015/07/30/gam/
- https://m-clark.github.io/generalized-additive-models/
- https://noamross.github.io/gams-in-r-course/

Also summarised materials from the package developper

- https://statistique.cuso.ch/fileadmin/statistique/part-4.pdf

Further examples

- http://environmentalcomputing.net/intro-to-gams/
- https://kevintshoemaker.github.io/NRES-746/Generalized%20Additive%20Models%20(GAMs).pdf

<br>

## Smooth parameters

For each smooth term, you can specify many parameters to regulate smoothing.
**bs** is the argument to choose the type of smoother such as thin plate splines, cubic regression, etc.
**sp** controles the smoothness of the curve, optimised by GCV or REML unless specified. The higher the value, the smoother the curve.
**k** is the argument to choose the number of knots, determining the wiggliness of the curve.

- https://stat.ethz.ch/R-manual/R-devel/library/mgcv/html/smooth.terms.html
- https://statistique.cuso.ch/fileadmin/statistique/part-5.pdf

Further explanation and examples

- https://statistique.cuso.ch/fileadmin/statistique/part-2.pdf
- https://maths-people.anu.edu.au/~johnm/r-book/xtras/autosmooth.pdf

On the other hand, you can also impose restrictions on the shape of smooth term manually, using the **shape constrained generalized additive model (SCAM)** framework (Pya & Wood, 2015).
De Rosa et al. (2021) applied SCAM using R package "scam" to predict pasture biomass.

- https://cran.r-project.org/web/packages/scam/scam.pdf
- https://www.rdocumentation.org/packages/scam/versions/1.2-5
- https://rdrr.io/cran/scam/man/scam.html

<br>

## Tensor products

In ecology research, there are often several explanatory variables (e.g. soil moisture, temperature, etc.) and their interaction effect on the response variable would be of interest.
In application of GAMs, you can specify them in a tensor product **"te()"** (or ti() and t2()).

- https://astrostatistics.psu.edu/su07/R/library/mgcv/html/te.html

> Tensor product smooths often perform better than isotropic smooths when the covariates of a smooth are not naturally on the same scale, so that their relative scaling is arbitrary. For example, if smoothing with repect to time and distance, an isotropic smoother will give very different results if the units are cm and minutes compared to if the units are metres and seconds. A tensor product smooth will give the same answer in both cases.

- https://stats.stackexchange.com/questions/277341/when-are-tensor-products-preferable-to-s-smooths-in-gamms
- https://stats.stackexchange.com/questions/45446/intuition-behind-tensor-product-interactions-in-gams-mgcv-package-in-r

Buchen et al. (2017) examined N<sub>2</sub>O fluxes by a tensor product of nitrate concentration and soil gravimetric watercontent as well as other smooth terms.
The use of tensor products in mgcv can be found in Takeda et al. (2021a; 2021b) as well.

<br>

## Link function

As GLMs, the regression family and link function can be specified in the same manner as "glm".

**Gaussian family with a log link function** can often be applied to describe exponential responses (or **gamma family with a log link function** for continuous and non-negative response variable).
These cases can be seen in Takeda et al. (2021a) and Webb et al. (2019).

A bit off topic but "Should the response variable be log-transformed or fitted with GLMs?" is a frequently asked questions.
In many cases, the use of GLMs rather than log-transformation is recommended while log-transformation is stil a very common practice in ecology research.

- https://www.theanalysisfactor.com/the-difference-between-link-functions-and-data-transformations/
- https://www.seascapemodels.org/rstats/2018/10/16/understanding-the-glm-link.html
- https://stats.stackexchange.com/questions/47840/linear-model-with-log-transformed-response-vs-generalized-linear-model-with-log/48679
- https://mrkm-a.hatenablog.com/entry/20140513/p1 (In Japanese)

For independent variables ranging from 0 to 1, such as ratio or proportion, **beta regression family** can be applied.

- https://stat.ethz.ch/R-manual/R-patched/library/mgcv/html/Beta.html
- https://stats.stackexchange.com/questions/233366/how-to-fit-a-mixed-model-with-response-variable-between-0-and-1


<br>

## Random effects

In mgcv, we can use Generalized Additive Mixed Models (GAMMs), a combination of "gam" and "lme4" instances to implement GAMs together with random effects.

- https://stat.ethz.ch/R-manual/R-devel/library/mgcv/html/gamm.html
- https://www.rdocumentation.org/packages/mgcv/versions/1.8-40/topics/gamm

The syntax for random effect terms in mgcv::gamm is differnt from the "lmer" style.

- https://stackoverflow.com/questions/25872488/how-to-add-a-random-intercept-and-random-slope-term-to-a-gamm-model-in-r

Also, we can use mgcv::gam with random effect smooths by specifying s(X, bs="re").

- https://fromthebottomoftheheap.net/2021/02/02/random-effects-in-gams/

It should be noted that package incompatibilities are reported with bs="re"

- https://stackoverflow.com/questions/67697378/error-in-model-matrix-formulaform-data-data-must-be-a-data-frame-while-do


bs="fs"

- https://stat.ethz.ch/R-manual/R-patched/library/mgcv/html/smooth.construct.fs.smooth.spec.html

Implementation of GAMMs with tensor products is detailed by Wood et al. (2013).

Examples for diagnosis of autocorrelation and specification of the autocorrelation structure can be found in the followings as well as in Yang et al. (2012) and Yang and Moyer (2020).

- https://jroy042.github.io/nonlinear/week4.html
- https://statistique.cuso.ch/fileadmin/statistique/part-1.pdf

Further examples

- https://drmowinckels.io/blog/2018-04-05-gamm-random-effects/
- https://fromthebottomoftheheap.net/2014/05/09/modelling-seasonal-data-with-gam/
- https://www.r-bloggers.com/2017/07/generalized-addictive-models-and-mixed-effects-in-agriculture/
- https://arxiv.org/pdf/1703.05339.pdf

<br>

## Quality check & Tips

There are heaps of ways to check the configuration of GAMs using mgcv.

- https://statistique.cuso.ch/fileadmin/statistique/part-3.pdf

One of them, **concurvity** is roughly equivalent to **multicollinearity** issues in normal multi variable regressions.
Checking the worst case is recommended and if the value is high (say, over 0.8), inspect your model more carefully.

- https://stat.ethz.ch/R-manual/R-devel/library/mgcv/html/concurvity.html

Model selection by an additional penalty term ("select"=TRUE)
- https://people.bath.ac.uk/man54/SAMBa/ITTs/ITT2/EDF/WoodGAM.pdf
- https://stats.stackexchange.com/questions/405129/model-selection-for-gam-in-r
- https://osf.io/wgc4f/wiki/mgcv:%20model%20selection/
- https://stackoverflow.com/questions/38571145/variable-selection-with-mgcv
- https://stackoverflow.com/questions/52724440/how-to-see-the-performance-of-all-gam-models-when-model-select-true

AIC vs deviance explained
- https://stats.stackexchange.com/questions/325832/gam-mgcv-aic-vs-deviance-explained

Convergence
- https://astrostatistics.psu.edu/su07/R/html/mgcv/html/gam.convergence.html
- https://astrostatistics.psu.edu/su07/R/html/mgcv/html/gam.outer.html
- https://astrostatistics.psu.edu/su07/R/html/mgcv/html/gam.control.html
- https://stats.stackexchange.com/questions/97834/warning-messages-from-mixed-model-glmer
- https://stackoverflow.com/questions/60564119/convergence-issues-glmer-how-to-interpret-allfit-outcomes-and-comparing-models
- https://stats.stackexchange.com/questions/304132/glmer-not-converging

Some other tips should also be noted.

- https://www.seascapemodels.org/rstats/2021/03/27/common-GAM-problems.html
- Order of the penalty: https://www.seascapemodels.org/rstats/2021/03/27/GAMs-interpolation.html
- Posterior predictions: https://www.seascapemodels.org/rstats/2020/02/19/spatial-gam-predictions.html

<br>

## Interpretation and visualisation

**Partial dependence (PD)** plots are the most common way to show the shape of each smooth term (feature) and thus the partial effect of the feature.
Partial dependence plots of individual variables can be seen in De Rosa et al., (2020) and Fuchs et al. (2018) and those of interactive smooth terms can be found in Takeda et al. (2021a; 2021b) and Webb et al. (2019).
**plot.gam()** function can provide a PD plot for each feature and **vis.gam()** function can be useful to visualise partial effects of two features.
**too.far** argument in vis.gam() determines plot grid nodes that are too far from the points defined by the variables given in view can be excluded from the plot.
The grid is scaled into the unit square along with the view variables and then grid nodes more than too.far from the predictor variables are excluded, as seen in Buchen et al. (2017).

Partial dependence plots are intuitive but assume independence of the feature(s) of interest from the other features.
**Accumulated Local Effects (ALE)** plots can handle correlations and demonstrate unbiased effects of the features, as seen in De Rosa et al. (2021).
The effects can be either a main effect for an individual predictor (length(J) = 1) or a secondorder interaction effect for a pair of predictors (length(J) = 2).

- https://christophm.github.io/interpretable-ml-book/ale.html
- https://cran.r-project.org/web/packages/ALEPlot/ALEPlot.pdf
- https://rdrr.io/cran/ALEPlot/src/R/ALEPlot.R
- https://www.slideshare.net/kato_kohaku/how-to-use-in-r-modelagnostic-data-explanation-with-dalex-iml

**Individual Conditional Expectation (ICE)** plots can show the dependence of the prediction on a feature for each instance separately (one line per instance), compared to one line overall in PD plots.

- https://christophm.github.io/interpretable-ml-book/ice.html#ice
- https://www.rdocumentation.org/packages/iml/versions/0.9.0/topics/FeatureEffect
- https://cran.r-project.org/web/packages/iml/iml.pdf
- https://qiita.com/gnbrganchan/items/de452da1f19666e8d132

Since interaction between features matters for the choice of plots and interpretation of the feature effects, **Friedman’s H-statistic** aids in quantitatively overviewing interaction between features.

- https://christophm.github.io/interpretable-ml-book/interaction.html

<br>

## References

- Buchen, C., Well, R., Helfrich, M., Fuß, R., Kayser, M., Gensior, A., ... & Flessa, H. (2017). Soil mineral N dynamics and N2O emissions following grassland renewal. Agriculture, Ecosystems & Environment, 246, 325-342. https://doi.org/10.1016/j.agee.2017.06.013
- De Rosa, D., Rowlings, D. W., Fulkerson, B., Scheer, C., Friedl, J., Labadz, M., & Grace, P. R. (2020). Field-scale management and environmental drivers of N2O emissions from pasture-based dairy systems. Nutrient Cycling in Agroecosystems, 117(3), 299-315. https://doi.org/10.1007/s10705-020-10069-7
- De Rosa, D., Basso, B., Fasiolo, M., Friedl, J., Fulkerson, B., Grace, P. R., & Rowlings, D. W. (2021). Predicting pasture biomass using a statistical model and machine learning algorithm implemented with remotely sensed imagery. Computers and Electronics in Agriculture, 180, 105880. https://doi.org/10.1016/j.compag.2020.105880
- Friedl, J., De Rosa, D., Rowlings, D. W., Grace, P. R., Müller, C., & Scheer, C. (2018). Dissimilatory nitrate reduction to ammonium (DNRA), not denitrification dominates nitrate reduction in subtropical pasture soils upon rewetting. Soil Biology and Biochemistry, 125, 340-349. https://doi.org/10.1016/j.soilbio.2018.07.024
- Fuchs, K., Hörtnagl, L., Buchmann, N., Eugster, W., Snow, V., & Merbold, L. (2018). Management matters: testing a mitigation strategy for nitrous oxide emissions using legumes on intensively managed grassland. Biogeosciences, 15(18), 5519-5543. https://doi.org/10.5194/bg-15-5519-2018
- Hastie, Trevor and Tibshirani, Robert. (1990), Generalized Additive Models, New York: Chapman and Hall.
- Hastie, Trevor and Tibshirani, Robert. (1986), Generalized Additive Models, Statistical Science, Vol. 1, No 3, 297-318.
- Pya, N., & Wood, S.N. (2015). Shape constrained additive mod- els. Statistics and Computing, 25,543–559. https://doi.org/10.1007/s11222-013-9448-7
- Takeda, N., Friedl, J., Rowlings, D., De Rosa, D., Scheer, C., & Grace, P. (2021a). Exponential response of nitrous oxide (N2O) emissions to increasing nitrogen fertiliser rates in a tropical sugarcane cropping system. Agriculture, Ecosystems & Environment, 313, 107376. https://doi.org/10.1016/j.agee.2021.107376
- Takeda, N., Friedl, J., Rowlings, D., De Rosa, D., Scheer, C., & Grace, P. (2021b). No sugar yield gains but larger fertiliser 15N loss with increasing N rates in an intensive sugarcane system. Nutrient Cycling in Agroecosystems, 121(1), 99-113. https://doi.org/10.1007/s10705-021-10167-0
- Webb, J. R., Hayes, N. M., Simpson, G. L., Leavitt, P. R., Baulch, H. M., & Finlay, K. (2019). Widespread nitrous oxide undersaturation in farm waterbodies creates an unexpected greenhouse gas sink. Proceedings of the National Academy of Sciences, 116(20), 9814-9819. https://doi.org/10.1073/pnas.1820389116
- Wood, S.N. (2006). Generalized Additive Models: An Introduction with R (1st ed.). Chapman and Hall/CRC. https://doi.org/10.1201/9781420010404
- Wood, S.N. (2017). Generalized Additive Models: An Introduction with R (2nd ed.). Chapman and Hall/CRC. https://doi.org/10.1201/9781315370279
- Wood, S.N., Scheipl, F. & Faraway, J.J. (2013). Straightforward intermediate rank tensor product smoothing in mixed models. Stat Comput 23, 341–360. https://doi.org/10.1007/s11222-012-9314-z
- Yang, G., & Moyer, D. L. (2020). Estimation of nonlinear water-quality trends in high-frequency monitoring data. Science of the Total Environment, 715, 136686. https://doi.org/10.1016/j.scitotenv.2020.136686
- Yang, L., Qin, G., Zhao, N. et al. (2012). Using a generalized additive model with autoregressive terms to study the effects of daily temperature on mortality. BMC Med Res Methodol 12, 165. https://doi.org/10.1186/1471-2288-12-165
