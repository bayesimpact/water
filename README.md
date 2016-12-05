# WaterBudget

## URL
https://bayesimpact.github.io/water/

## About
This proof-of-concept project was built by the [Bayes Impact](https://bayes.org) team to participate in [California Water Data Challenge](http://waterchallenge.data.ca.gov/). This repository contains the code for data analysis and the front-end. 

## Concept
Water is a scarce and restriced commodity and it has to be managed as such. Inspired by personal finance applications like Mint and Level, and powered by machine-learning and big data techniques, we have created a proof-of-concept application, WaterBudget, to assist water districts  to manage and plan their water usage and conservation plans. By analyzing the historical water usage patterns in each district, WaterBudget predicts total monthly and annual water usage, ancd compares it to the set target. The water usuage prediction allows water districts to be pro-active and implement necessary water conservation measures to ensure reaching the water conservation targets. In this demo, the targets set by the State were used, however, in practice, they could be set by local administrations too. 

In addition to budgeting and planning purposes, this application allows the residents to easily follow their respective water suppliers' performance in water conservation. 

## Proposed flow
1. User selects their local water supplier from a map.
2. "Budget view":
  - Water usage for the current water year (Oct–Sep) is projected based on current water use data.
  - Projected water usage is compared to state targets.
3. (optional) "Transaction view":
  - User can see water usage for each month in each sector (4 sectors: residential / agricultural / commercial+industrial / unknown) over the past year, and compare to the past year (e.g. residential usage in Oct 2016 vs Oct 2015).
  - If we're being ambitious, we could try some anomaly detection (e.g. Your city is spending a lot more water on industry this October!), but we don't really have very much data to work with.

## Data Sets
- [Urban Water Supplier Report Dataset](http://www.waterboards.ca.gov/water_issues/programs/conservation_portal/conservation_reporting.shtml)
- [California Environmental Health Tracking Program (CEHTP) Drinking Water Systems Geographic Reporting Tool](http://cehtp.org/page/water/water_system_map_viewer)
- [Mapping of PWD IDs by supplier name to join the datasets](http://www.water.ca.gov/urbanwatermanagement/docs/2010_UWMP_Data_Tables/UWMP_PWS_IDs_07-29-14.xls)

## Technical Details
Since June 2014, California water suppliers have been reporting their monthly water usage data. Using that dataset, we built simple linear regression models to predict the water usage for each water supplier in the future. More complex and accurate machine-learning models could be implemented if more data is available. Our simple user interface is built with [Materialize](http://materializecss.com/) and [Google Charts](https://developers.google.com/chart/interactive/docs/gallery).
