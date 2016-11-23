# WaterBudget
## Concept
Apply the budgeting 

## Proposed flow
1. User selects their local water supplier from a map.
2. "Budget view":
  - Water usage for the current water year (Oct–Sep) is projected based on current water use data.
  - Projected water usage is compared to state targets.
3. (optional) "Transaction view":
  - User can see water usage for each month in each sector (4 sectors: residential / agricultural / commercial+industrial / unknown) over the past year, and compare to the past year (e.g. residential usage in Oct 2016 vs Oct 2015).
  - If we're being ambitious, we could try some anomaly detection (e.g. Your city is spending a lot more water on industry this October!), but we don't really have very much data to work with.
