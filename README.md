# WaterBudget

#### Live app: https://bayesimpact.github.io/water/
#### GitHub repository: https://github.com/bayesimpact/water

## About
This proof-of-concept project was built by the [Bayes Impact](http://www.bayes.org) team to participate in [California Water Data Challenge](http://waterchallenge.data.ca.gov/). This repository contains the code for data analysis and the front-end. 

## Concept
Water is a scarce and restricted commodity and it has to be managed as such. Inspired by personal finance applications like Mint and Level, and powered by machine-learning and big data techniques, we have created a proof-of-concept application, WaterBudget, to assist water districts  to manage and plan their water usage and conservation plans. By analyzing the historical water usage patterns in each district, WaterBudget predicts total monthly and annual water usage, ancd compares it to the set target. The water usage prediction allows water districts to be proactive and implement necessary water conservation measures to ensure reaching the water conservation targets. In this demo, the targets set by the State were used, however, in practice, they could be set by local administrations too. 

In addition to budgeting and planning purposes, this application allows the residents to easily follow their respective water suppliers' performance in water conservation. 

## User walkthrough
1. User is presented with a map of California, highlighting the water supplier districts.
2. User clicks on the district of their choice, which takes them to the "Budget view".
3. In the "Budget view":
  - Water usage for the current water year (Oct–Sep) is projected based on current water use data and historical usage patterns.
  - Projected water usage is compared to state targets.

## Datasets used
- [Urban Water Supplier Report Dataset](http://www.waterboards.ca.gov/water_issues/programs/conservation_portal/conservation_reporting.shtml)
- [California Environmental Health Tracking Program (CEHTP) Drinking Water Systems Geographic Reporting Tool](http://cehtp.org/page/water/water_system_map_viewer)
- [Mapping of PWD IDs by supplier name to join the datasets](http://www.water.ca.gov/urbanwatermanagement/docs/2010_UWMP_Data_Tables/UWMP_PWS_IDs_07-29-14.xls)

## Technical details
Since June 2014, California water suppliers have been reporting their monthly water usage data. Using that dataset, we built simple linear regression models to predict the water usage for each water supplier in the future. This was done with Python, the `pandas` library, and Jupyter notebooks (see [`water_usage_prediction.ipynb`](https://github.com/bayesimpact/water/blob/master/exploration/water_usage_prediction.ipynb)).

Our simple user interface is built with [Materialize](http://materializecss.com/) and [Google Charts](https://developers.google.com/chart/interactive/docs/gallery), hosted via GitHub Pages.

## Next steps

### Uses for more data

The datasets we have are still temporally limited (going back to 2014). If older data were made available, we could build far more powerful machine-learning models, activating the full suite of modern predictive tools.

### Future extensions to the app

* Create a water budget and help the suppliers to plan their conservation efforts accordingly.
* Create dashboards for the public to audit their water suppliers’ conservation plans.
* Create personalized water conservation/budget tools for residents to participate.

## About the team

[**Bayes Impact**](http://www.bayes.org) is a data science and software engineering 501c3 nonprofit. We take a mission-driven approach to provide agency clients with impactful solutions for pressing social challenges. Our team consists of full-time software engineers, data scientists, designers, and project managers from leading Silicon Valley companies. We leverage our experience building the world’s largest data products and infrastructure at companies such as Google, Uber, and Box to provide innovative data and technology solutions for public sector organizations.

The Bayes Impact water team is:

* Alex Nisnevich, Software Engineer. Former Data Engineer at Workday, MS UC Berkeley.
* Mehdi Jamei, Data Scientist. PhD Computer Science, UC Berkeley.
* Kirtan Upadhyaya, Senior Director. Former Management Consultant at Deloitte. UC Berkeley.
* Everett Wetchler, Chief Technology Officer. Former Senior Engineer at Google. 

-----
Bayes Impact, 2016
