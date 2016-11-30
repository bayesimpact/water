import pandas as pd


def load_uw_supply_data(path):

    with open(path) as fname:
        df = pd.read_excel(fname)

    # long column names:


    col_rename_dict = {'Supplier Name': 'supplier_name',
    "REPORTED Units": "reported_units",
    "CALCULATED Total Monthly Potable Water Production Reporting Month Gallons (Values calculated by Water Board staff. REPORTED Total Monthly Potable Water Production Reporting Month - REPORTED Monthly Ag Use Reporting Month; converted to gallons.)": "calculated_total_production",
    "CALCULATED Monthly CII Reporting Month (Subset of CALCULATED Total Monthly Potable Water Production Reporting Month Gallons)": "calculated_cii",
    "REPORTED Monthly Ag Use Reporting Month (This value is removed from REPORTED Total Monthly Potable Water Production Reporting Month by Water Board staff to obtain CALCULATED Total Monthly Potable Water Production Reporting Month Gallons)": "ag_use",
    'Stage Invoked': 'stage_invoked',
    'Mandatory Restrictions': 'mandatory_restrictions',
    'Reporting Month': 'reporting_month',
    'REPORTED Total Monthly Potable Water Production Reporting Month': 'reporting_total_month',
    'REPORTED Total Monthly Potable Water Production 2013': 'reporting_total_month_2013',
    'Qualification': 'qualifications',
    'Total Population Served': 'total_population_served',
    'REPORTED Residential Gallons-per-Capita-Day (R-GPCD) (starting in September 2014)': 'r_gpc',
    'Conservation Standard (starting in June 2015)\n*Adjusted in March 2016\n**Revised in June 2016': 'conservation_standard',
    '% Residential Use': 'percent_residential_use',
    'Hydrologic Region': 'hydrologic_region',
    'Warnings Issued': 'warnings_issued',
    'Rate Penalties Assessed (starting\nDec-15)': 'rate_penalties_assessed',
    'Penalties Assessed': 'penalties_assessed'}
    mini_df = df[col_rename_dict.keys()].rename(columns=col_rename_dict)

    # there are different units of reporting. I'll change everything to Gallons
    unit_dict = {"AF": 325000, "MG": 1e6, "G": 1, "CCF": 748.052}
    mini_df["reported_units"] = mini_df["reported_units"].apply(lambda x: unit_dict[x])

    # Let's fix NA mismatches
    mini_df["ag_use"] = mini_df["ag_use"].replace({'n/a': None, 'na': None, 'not avail.': None}).astype('float')

    # some renamings and new columns
    mini_df["total_res"] = mini_df["r_gpc"] * mini_df["total_population_served"] * 30
    mini_df["total_ag"] = mini_df["ag_use"] * mini_df["reported_units"]

    return mini_df
