export const AddTooltips: DataSourceType = {
    Classification: "Add Classification",
    Column: "Add Column",
    Category: "Add Category",
    Serie: "Add Serie"
};

export const EditTooltips: DataSourceType = {
    Classification: "Edit Classification",
    Column: "Edit Column",
    Category: "Edit Category",
    Serie: "Edit Serie"
};

export const ChartTypes: ChartType = {
    Bar: "bar",
    Line: "line",
    Pie: "pie"
};

export const Titles: DataSourceType = {
    Classification: "Classifications",
    Column: "Columns",
    Category: "Categories",
    Serie: "Series"
};

export const widgetConfig: any = {
    col: 1,
    row: 1,
    sizex: 1,
    sizey: 1,
    minWidth: 400,
    minHeight: 300
};

export const Classifications: Classification = {
    AssetClass: "Asset Class",
    SecurityType: "Security Type",
    Security: "Security",
    Type: "classification"
};

export const DataSourceTypes: DataSourceType = {
    Classification: "classification",
    Column: "column",
    Category: "category",
    Serie: "serie"
};

export const ActionModes: ActionMode = {
    Add: "add",
    Edit: "edit",
    Group: "group",
    Remove: "remove"
};

export const Caption: string = "Name";
export const TEXTBOX_CLASSNAME: string = "tb";
export const TEXTBOX_EDIT_CLASSNAME: string = "tb-edit";
export const Clasifis: string[] = [Classifications.AssetClass, Classifications.Security, Classifications.Security];
export const COLUMNS: string[] = ["Asset Class", "Security Type", "Security", "Quantity", "Unit Cost", "Price", "Total Cost", "Market Value", "% Asset"];

export interface Classification {
    AssetClass?: string;
    SecurityType?: string;
    Security?: string;
    Type?: string;
}

export interface DataSourceType {
    Classification?: string;
    Column?: string;
    Category?: string;
    Serie?: string;
}

export interface ActionMode {
    Add?: string;
    Edit?: string;
    Group?: string
    Remove?: string;
}

export interface ChartType {
    Bar?: string;
    Line?: string;
    Pie?: string;
}

export enum ChartLibType {
    HighCharts = 1, ChartJS, ECharts, PlotyJS
}

export function parseNumber(value: number): string {
    return value === Math.floor(value) ? value.toLocaleString() : Number(value.toFixed(1)).toLocaleString();
}

export const classifications: any = [
    { id: "assetClass", label: "Asset Class" },
    { id: "security", label: "Security" },
    { id: "securityType", label: "Security Type" }
];

export const genericdates: any = [
    {
        name: "{toda}",
        value: "09/06/2017",
        label: "Current Day"
    },
    {
        name: "{yest}",
        value: "09/05/2017",
        label: "Last Calendar Day"
    },
    {
        name: "{last}",
        value: "09/03/2017",
        label: "Last Trading Day"
    },
    {
        name: "{next}",
        value: "09/07/2017",
        label: "Next Trading Day"
    }
];

export const currencies: any = [
    {
        label: "us- US Dollar",
        value: "USD"
    },
    {
        label: "au- Australian Dollar",
        value: "AUD"
    },
    {
        label: "cn- Chinese Yuan",
        value: "CN"
    },
    {
        label: "eu- Euro",
        value: "EU"
    },
    {
        label: "hk- Hong Kong Dollar",
        value: "HK"
    }
];

export const pricesets: any = [
    {
        label: "Standard Price Set",
        value: "sps"
    },
    {
        label: "American Price Set",
        value: "aps"
    },
    {
        label: "European Price Set",
        value: "eps"
    }
];

export const assetClass: string[] = ["Fixed Income", "Equity", "Cash"];

export const appraisalData: any[] = [
    { "Asset Class": "Fixed Income", "Security Type": "NULL", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "5786532.7", "Price": "NULL", "Total Cost": "1045088.2", "Market Value": "1045687.575", "% Asset": "0.39515339" },
    { "Asset Class": "Fixed Income", "Security Type": "Government Bonds", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "25085", "Market Value": "25671.875", "% Asset": "0.22203692" },
    { "Asset Class": "Fixed Income", "Security Type": "Government Bonds", "Security": "FEDERAL HOME LN BKS", "Quantity": "25000", "Unit Cost": "100.34", "Price": "102.6875", "Total Cost": "25085", "Market Value": "25671.875", "% Asset": "0.22203692" },
    { "Asset Class": "Fixed Income", "Security Type": "U.S. Municipal Bonds", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "20003.2", "Market Value": "20015.7", "% Asset": "0.17311647" },
    { "Asset Class": "Fixed Income", "Security Type": "U.S. Municipal Bonds", "Security": "CALIFORNIA ST", "Quantity": "10000", "Unit Cost": "100.014", "Price": "100.011", "Total Cost": "10001.4", "Market Value": "10001.1", "% Asset": "0.086499854" },
    { "Asset Class": "Fixed Income", "Security Type": "U.S. Municipal Bonds", "Security": "PORTLAND ORE NEW PUB HSG AUTH", "Quantity": "10000", "Unit Cost": "100.018", "Price": "100.146", "Total Cost": "10001.8", "Market Value": "10014.6", "% Asset": "0.086616616" },
    { "Asset Class": "Equity", "Security Type": "NULL", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "4563498.8", "Price": "NULL", "Total Cost": "5172570.77", "Market Value": "9911044.71", "% Asset": "85.72096273" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "5172570.77", "Market Value": "9911044.71", "% Asset": "85.72096273" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "ADVENT SOFTWARE INC COM", "Quantity": "100000", "Unit Cost": "28.94", "Price": "28.94", "Total Cost": "2894000", "Market Value": "2894000", "% Asset": "25.03030441" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "AGUILA AMERN GOLD LTD COM NEW", "Quantity": "5200", "Unit Cost": "19.905", "Price": "16.54", "Total Cost": "103506", "Market Value": "86008", "% Asset": "0.743886117" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "ALASKA AIR GROUP INC COM", "Quantity": "1300", "Unit Cost": "34.31", "Price": "35.72", "Total Cost": "44603", "Market Value": "46436", "% Asset": "0.401626543" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "ANN INC COM", "Quantity": "1350", "Unit Cost": "7.851851852", "Price": "34.52", "Total Cost": "10600", "Market Value": "46602", "% Asset": "0.403062283" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "ANN INC COM", "Quantity": "4500", "Unit Cost": "6.207777778", "Price": "34.52", "Total Cost": "27935", "Market Value": "155340", "% Asset": "1.343540942" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "AT&T INC COM", "Quantity": "225", "Unit Cost": "138.5388889", "Price": "24.49", "Total Cost": "31171.25", "Market Value": "5510.25", "% Asset": "0.04765834" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "AT&T INC COM", "Quantity": "315", "Unit Cost": "126.7333333", "Price": "24.49", "Total Cost": "39921", "Market Value": "7714.35", "% Asset": "0.066721675" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "BANK NEW YORK MELLON CORP COM", "Quantity": "1200", "Unit Cost": "59.155", "Price": "31.85", "Total Cost": "70986", "Market Value": "38220", "% Asset": "0.33056608" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "BARNES & NOBLE INC COM", "Quantity": "1900", "Unit Cost": "27.0925", "Price": "42.67", "Total Cost": "51475.75", "Market Value": "81073", "% Asset": "0.701203134" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "BAXTER INTL INC COM", "Quantity": "2600", "Unit Cost": "27.265", "Price": "37.65", "Total Cost": "70889", "Market Value": "97890", "% Asset": "0.846653939" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "BLACK & DECKER CORP COM", "Quantity": "1400", "Unit Cost": "37.8425", "Price": "86.96", "Total Cost": "52979.5", "Market Value": "121744", "% Asset": "1.052967996" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "BOISE CASCADE CO", "Quantity": "700", "Unit Cost": "31.53", "Price": "0.49", "Total Cost": "22071", "Market Value": "343", "% Asset": "0.002966619" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "BOISE CASCADE CO", "Quantity": "1400", "Unit Cost": "36.3425", "Price": "0.49", "Total Cost": "50879.5", "Market Value": "686", "% Asset": "0.005933237" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "CHEVRON CORP NEW COM", "Quantity": "2772", "Unit Cost": "37.92532468", "Price": "56.77", "Total Cost": "105129", "Market Value": "157366.44", "% Asset": "1.361067691" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "CONAGRA FOODS INC COM", "Quantity": "2300", "Unit Cost": "29.0925", "Price": "20.28", "Total Cost": "66912.75", "Market Value": "46644", "% Asset": "0.403425542" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "CONSOLIDATED EDISON INC COM", "Quantity": "700", "Unit Cost": "45.5925", "Price": "46.33", "Total Cost": "31914.75", "Market Value": "32431", "% Asset": "0.280496822" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "CONSOLIDATED EDISON INC COM", "Quantity": "800", "Unit Cost": "44.4675", "Price": "46.33", "Total Cost": "35574", "Market Value": "37064", "% Asset": "0.320567796" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "DOW CHEM CO COM", "Quantity": "600", "Unit Cost": "31.84333333", "Price": "43.82", "Total Cost": "19106", "Market Value": "26292", "% Asset": "0.227400402" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "DOW CHEM CO COM", "Quantity": "1500", "Unit Cost": "31.92666667", "Price": "43.82", "Total Cost": "47890", "Market Value": "65730", "% Asset": "0.568501005" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "DOW CHEM CO COM", "Quantity": "1933", "Unit Cost": "27.91278709", "Price": "43.82", "Total Cost": "53955.41744", "Market Value": "84704.06", "% Asset": "0.732608295" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "FREESCALE SEMICONDUCTOR INC CL B", "Quantity": "397", "Unit Cost": "18.2502629", "Price": "25.17", "Total Cost": "7245.35437", "Market Value": "9992.49", "% Asset": "0.086425386" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "GENERAL ELECTRIC CO COM", "Quantity": "500", "Unit Cost": "31.09448", "Price": "35.05", "Total Cost": "15547.24", "Market Value": "17525", "% Asset": "0.151574321" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "GENERAL ELECTRIC CO COM", "Quantity": "5350", "Unit Cost": "3.55", "Price": "35.05", "Total Cost": "18992.5", "Market Value": "187517.5", "% Asset": "1.621845234" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "GOLDMAN SACHS GROUP INC PFD 6.125  CALL", "Quantity": "1131", "Unit Cost": "45.13793103", "Price": "48.15", "Total Cost": "51051", "Market Value": "54457.65", "% Asset": "0.471006067" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "GOLDMAN SACHS GROUP INC PFD 6.125  CALL", "Quantity": "1396", "Unit Cost": "26.55838109", "Price": "48.15", "Total Cost": "37075.5", "Market Value": "67217.4", "% Asset": "0.581365578" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "GOOGLE INC CL C", "Quantity": "900", "Unit Cost": "99.04111111", "Price": "414.86", "Total Cost": "89137", "Market Value": "373374", "% Asset": "3.229324423" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "HEWLETT PACKARD CO COM", "Quantity": "139", "Unit Cost": "229.9802372", "Price": "28.63", "Total Cost": "31967.25296", "Market Value": "3979.57", "% Asset": "0.034419436" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "HOME DEPOT INC COM", "Quantity": "1000", "Unit Cost": "26", "Price": "40.48", "Total Cost": "26000", "Market Value": "40480", "% Asset": "0.350112897" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "HOME DEPOT INC COM", "Quantity": "1000", "Unit Cost": "27", "Price": "40.48", "Total Cost": "27000", "Market Value": "40480", "% Asset": "0.350112897" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "HORACE MANN EDUCATORS CORP NEW COM", "Quantity": "900", "Unit Cost": "35.3425", "Price": "18.96", "Total Cost": "31808.25", "Market Value": "17064", "% Asset": "0.147587116" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "HORACE MANN EDUCATORS CORP NEW COM", "Quantity": "1000", "Unit Cost": "35.28", "Price": "18.96", "Total Cost": "35280", "Market Value": "18960", "% Asset": "0.163985685" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "INGERSOLL-RAND PLC SHS", "Quantity": "200", "Unit Cost": "43.655", "Price": "40.37", "Total Cost": "8731", "Market Value": "8074", "% Asset": "0.069832301" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "INGERSOLL-RAND PLC SHS", "Quantity": "1300", "Unit Cost": "38.5925", "Price": "40.37", "Total Cost": "50170.25", "Market Value": "52481", "% Asset": "0.453909954" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "INTERNATIONAL BUSINESS MACHS COM", "Quantity": "460", "Unit Cost": "72.73125", "Price": "82.2", "Total Cost": "33456.375", "Market Value": "37812", "% Asset": "0.327037274" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "INTERNATIONAL BUSINESS MACHS COM", "Quantity": "50000", "Unit Cost": "1.2", "Price": "82.2", "Total Cost": "60000", "Market Value": "4110000", "% Asset": "35.54752976" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "KELLY SVCS INC CL A", "Quantity": "200", "Unit Cost": "32.78", "Price": "26.22", "Total Cost": "6556", "Market Value": "5244", "% Asset": "0.045355534" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "KELLY SVCS INC CL A", "Quantity": "1800", "Unit Cost": "28.78", "Price": "26.22", "Total Cost": "51804", "Market Value": "47196", "% Asset": "0.408199809" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "LIZ CLAIBORNE INC COM", "Quantity": "4000", "Unit Cost": "25.60875", "Price": "35.82", "Total Cost": "102435", "Market Value": "143280", "% Asset": "1.239233592" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "MERITUS MINERALS LTD COM", "Quantity": "1600", "Unit Cost": "43.3275", "Price": "67.73", "Total Cost": "69324", "Market Value": "108368", "% Asset": "0.937278517" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "MOTOROLA SOLUTIONS INC", "Quantity": "3600", "Unit Cost": "17.18239722", "Price": "22.59", "Total Cost": "61856.63", "Market Value": "81324", "% Asset": "0.703374041" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "OFFICE DEPOT INC COM", "Quantity": "4400", "Unit Cost": "18.03", "Price": "31.4", "Total Cost": "79332", "Market Value": "138160", "% Asset": "1.194950538" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "PACIFICARE HEALTH SYS DEL COM", "Quantity": "600", "Unit Cost": "43.015", "Price": "0.14", "Total Cost": "25809", "Market Value": "84", "% Asset": "0.000726519" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "PACIFICARE HEALTH SYS DEL COM", "Quantity": "1000", "Unit Cost": "35.4525", "Price": "0.14", "Total Cost": "35452.5", "Market Value": "140", "% Asset": "0.001210865" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "PG&E CORP COM", "Quantity": "2100", "Unit Cost": "32.0925", "Price": "37.12", "Total Cost": "67394.25", "Market Value": "77952", "% Asset": "0.674209499" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "RAYTHEON CO COM NEW", "Quantity": "2100", "Unit Cost": "50.7175", "Price": "40.15", "Total Cost": "106506.75", "Market Value": "84315", "% Asset": "0.729243302" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "RIA RES CORP COM", "Quantity": "80", "Unit Cost": "240.4625", "Price": "3.65", "Total Cost": "19237", "Market Value": "292", "% Asset": "0.002525518" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "RIA RES CORP COM", "Quantity": "140", "Unit Cost": "254.525", "Price": "3.65", "Total Cost": "35633.5", "Market Value": "511", "% Asset": "0.004419656" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "RIA RES CORP COM", "Quantity": "200", "Unit Cost": "246.5", "Price": "3.65", "Total Cost": "49300", "Market Value": "730", "% Asset": "0.006313795" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "TEKTRONIX INC COM", "Quantity": "3200", "Unit Cost": "21.015", "Price": "28.21", "Total Cost": "67248", "Market Value": "90272", "% Asset": "0.780765598" },
    { "Asset Class": "Equity", "Security Type": "Common Stock", "Security": "WALGREENS BOOTS ALLIANCE INC COM", "Quantity": "1400", "Unit Cost": "28.3725", "Price": "44.26", "Total Cost": "39721.5", "Market Value": "61964", "% Asset": "0.535928743" },
    { "Asset Class": "Cash", "Security Type": "NULL", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "4526798.1", "Price": "NULL", "Total Cost": "1586466.73", "Market Value": "1586466.73", "% Asset": "13.7214047" },
    { "Asset Class": "Cash", "Security Type": "Cash Accounts", "Security": "NULL", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "1586466.73", "Market Value": "1586466.73", "% Asset": "13.7214047" },
    { "Asset Class": "Cash", "Security Type": "Cash Accounts", "Security": "Dividend Accrual (usd)", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "-11138.55", "Market Value": "-11138.55", "% Asset": "-0.096337698" },
    { "Asset Class": "Cash", "Security Type": "Cash Accounts", "Security": "U.S. DOLLAR", "Quantity": "NULL", "Unit Cost": "NULL", "Price": "NULL", "Total Cost": "1597605.28", "Market Value": "1597605.28", "% Asset": "13.81774239" }
];

export const appraisalData2: any[] = [
    {
        quantity: parseNumber(4200),
        security: "APPLE INC COM",
        unitCost: 14.87,
        price: 15.19,
        assets: 2.3
    },
    {
        quantity: parseNumber(139),
        security: "HEWLETT PACKARD CO COM",
        unitCost: 229.98,
        price: 18.63,
        assets: 1.2
    },
    {
        quantity: parseNumber(67800),
        security: "AT&T",
        unitCost: 23.66,
        price: 18.87,
        assets: 3.6
    },
    {
        quantity: parseNumber(75600),
        security: "GOOGLE INC COM",
        unitCost: 23.56,
        price: 20.98,
        assets: 4.5
    },
    {
        quantity: parseNumber(876000),
        security: "ORACLE INC COM",
        unitCost: 17.87,
        price: 34.56,
        assets: 5.8
    }
];

export const files: any[] = [
    {
        "label": "Portfolio Appraisal",
        "data": "Portfolio Appraisal",
        "width": "100%",
        "border": "",
        "expandedIcon": "fa-folder-open",
        "collapsedIcon": "fa-folder",
        "children": [
            {
                "label": "",
                "data": "",
                "border": "2px solid lightgray",
                "margin": "5px 0px 5px -15px",
                "height": "140px",
                "width": "180px",
                "id": "a",
                "color": "white"
            },
            {
                "label": "",
                "data": "",
                "margin": "5px 0px 5px -15px",
                "border": "2px solid lightgray",
                "height": "140px",
                "width": "180px",
                "id": "b",
                "color": "#FFF0F5"
            }
        ]
    },
    {
        "label": "Performance Overview",
        "data": "Performance Overview",
        "width": "100%",
        "border": "",
        "expandedIcon": "fa-folder-open",
        "collapsedIcon": "fa-folder",
        "children": [
            {
                "label": "",
                "data": "",
                "margin": "5px 0px 5px -15px",
                "border": "2px solid lightgray",
                "height": "200px",
                "width": "180px",
                "id": "c",
                "color": "#FFFFF0"
            },
            {
                "label": "",
                "data": "",
                "margin": "5px 0px 5px -15px",
                "border": "2px solid lightgray",
                "height": "200px",
                "width": "180px",
                "id": "d",
                "color": "lightgray"
            }
        ]
    }
];

export const content1: string = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html>
<head>
<title>Advent Browser Reporting - Summary</title>
<style type="text/css" media=print>
<!--
    tr.S0-FirmName { font-size: 11pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-RepTitle { font-size: 14pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-PortName { font-size: 12pt; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-Date { font-size: 10pt; font-family: "Calibri"; font-weight: normal; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-ColHeader { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-SectHeader { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: avoid; }
    tr.S0-Header { font-size: 10pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: avoid; }
    tr.S0-Detail { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: auto; }
    tr.S0-UnderLine { line-height: 0%; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-SectSubtotal { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: auto; }
    tr.S0-GrandTotal { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: auto; }
    tr.S0-Warning { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-Footnote { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-Footer { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
-->
</style>
<style type="text/css" media=screen>
<!--
    tr.S0-FirmName { font-size: 138%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S0-RepTitle { font-size: 175%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S0-PortName { font-size: 150%; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none;  }
    tr.S0-Date { font-size: 125%; font-family: "Calibri"; font-weight: normal; font-style: italic; text-decoration: none;  }
    tr.S0-ColHeader { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S0-SectHeader { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S0-Header { font-size: 125%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S0-Detail { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S0-UnderLine { line-height: 0%; page-break-before: avoid; page-break-after: avoid; }
    tr.S0-SectSubtotal { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S0-GrandTotal { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S0-Warning { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none;  }
    tr.S0-Footnote { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S0-Footer { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
-->
</style>
<script language="JavaScript" type="text/javascript">
<!--
function fnAdventInit()
{
  // Get Browser Names and Versions //////////////////////////
  var bIsNetscape = false;
  var bIsMicrosoft = false;
  var nVersion = 0;
  var version = navigator.appVersion;
  version = version.toUpperCase();
  var index;
  if(navigator.appName == "Netscape")
  {
    bIsNetscape = true;
    index = version.indexOf(" ");
    if(index != -1)
    {
      version = version.substring(0, index);
      nVersion = parseFloat(version);
    }
  }
  else if(navigator.appName == "Microsoft Internet Explorer")
  {
    bIsMicrosoft = true;
    index = version.indexOf("MSIE");
    if(index != -1)
    {
      version = version.substring(index, version.length);
      index = version.indexOf(" ");
      version = version.substring(index, version.length);
      index = version.indexOf(";");
      if(index != -1)
      {
        version = version.substring(0, index);
        nVersion = parseFloat(version);
      }
    }
  }

  // Fix Pagination //////////////////////////////////////////
  var tagPageBreak = "";
  if(bIsNetscape)
  {
    if(nVersion >= 5)
    {
      tagPageBreak = "table";
    }
  }
  else if(bIsMicrosoft)
  {
    if(nVersion >= 5.5)
    {
      tagPageBreak = "table";
    }
    else
    {
      tagPageBreak = "div";
    }
  }
  if(tagPageBreak != "")
  {
    var collTable = document.getElementsByTagName(tagPageBreak);
    if (collTable!=null)
    {
      for (k=0; k<collTable.length; k++)
      {
        if (bIsMicrosoft && nVersion >= 7.0) // IE 7
        {
          if (k != collTable.length - 1)
            collTable[k].style.pageBreakAfter="always";
        }
        else
        {
          if(k > 0 || tagPageBreak == "div") // skip first table
          {
            collTable[k].style.pageBreakBefore="always";
          }
        }
      }
    }
  }
  // Fix Netscape 6.0 Footers ////////////////////////////////
  if(bIsNetscape && nVersion >= 5)
  {
    var collTable = document.getElementsByTagName("table");
    if(collTable == null)
    {
      return;
    }
    for(l=0; l<collTable.length; l++)
    {
      var collTBody = collTable[l].getElementsByTagName("tbody");
      if( collTBody == null)
      {
        break;
      }
      var collTFoot = collTable[l].getElementsByTagName("tfoot");
      if( collTFoot == null)
      {
        break;
      }
      if(collTBody.length == collTFoot.length)
      {
        var currentRow;
        var currentCell;
        for(i=0; i<collTBody.length; i++)
        {
          var currentTBody = collTBody.item(i);
          var currentTFoot = collTFoot.item(i);
          var collTR = currentTFoot.childNodes;
          if (collTR!=null)
          {
            for (j=0; j<collTR.length; j++)
            {
              if(collTR.item(j).tagName == "TR")
              {
                currentRow = document.createElement("TR");
                currentCell = document.createElement("TD");
                var collTD = collTR.item(j).childNodes;
                currentCell.appendChild(document.createTextNode(collTD.item(1).firstChild.data));
                currentCell.align = collTD.item(1).align;
                currentCell.colSpan = collTD.item(1).colSpan;
                currentRow.appendChild(currentCell);
                currentTBody.appendChild(currentRow);
                currentTFoot.removeChild(collTR.item(j));
              }
            }
          }
        }
      }
    }
  }
}
//-->
</script>
<script language="JavaScript" type="text/javascript">
<!--
window.onload=fnAdventInit;
//-->
</script>
<style type="text/css" media=print>
<!--
    tr.S1-FirmName { font-size: 11pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-RepTitle { font-size: 14pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-PortName { font-size: 12pt; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-Date { font-size: 10pt; font-family: "Calibri"; font-weight: normal; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-ColHeader { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-SectHeader { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: avoid; }
    tr.S1-Header { font-size: 10pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: avoid; }
    tr.S1-Detail { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: auto; }
    tr.S1-UnderLine { line-height: 0%; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-SectSubtotal { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: auto; }
    tr.S1-GrandTotal { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: auto; }
    tr.S1-Warning { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-Footnote { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-Footer { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
-->
</style>
<style type="text/css" media=screen>
<!--
    tr.S1-FirmName { font-size: 138%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S1-RepTitle { font-size: 175%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S1-PortName { font-size: 150%; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none;  }
    tr.S1-Date { font-size: 125%; font-family: "Calibri"; font-weight: normal; font-style: italic; text-decoration: none;  }
    tr.S1-ColHeader { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S1-SectHeader { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S1-Header { font-size: 125%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S1-Detail { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S1-UnderLine { line-height: 0%; page-break-before: avoid; page-break-after: avoid; }
    tr.S1-SectSubtotal { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S1-GrandTotal { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S1-Warning { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none;  }
    tr.S1-Footnote { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S1-Footer { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
-->
</style>
<style type="text/css" media=print>
<!--
    tr.S2-FirmName { font-size: 11pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-RepTitle { font-size: 14pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-PortName { font-size: 12pt; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-Date { font-size: 10pt; font-family: "Calibri"; font-weight: normal; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-ColHeader { font-size: 10pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-SectHeader { font-size: 10pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: avoid; }
    tr.S2-Header { font-size: 10pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: avoid; }
    tr.S2-Detail { font-size: 10pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: auto; page-break-after: auto; }
    tr.S2-UnderLine { line-height: 0%; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-SectSubtotal { font-size: 10pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: auto; }
    tr.S2-GrandTotal { font-size: 10pt; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: auto; }
    tr.S2-Warning { font-size: 8pt; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-Footnote { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-Footer { font-size: 8pt; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none; page-break-before: avoid; page-break-after: avoid; }
-->
</style>
<style type="text/css" media=screen>
<!--
    tr.S2-FirmName { font-size: 110%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S2-RepTitle { font-size: 140%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S2-PortName { font-size: 120%; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none;  }
    tr.S2-Date { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: italic; text-decoration: none;  }
    tr.S2-ColHeader { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S2-SectHeader { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S2-Header { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S2-Detail { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S2-UnderLine { line-height: 0%; page-break-before: avoid; page-break-after: avoid; }
    tr.S2-SectSubtotal { font-size: 100%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S2-GrandTotal { font-size: 100%; font-family: "Calibri"; font-weight: bold; font-style: normal; text-decoration: none;  }
    tr.S2-Warning { font-size: 80%; font-family: "Calibri"; font-weight: bold; font-style: italic; text-decoration: none;  }
    tr.S2-Footnote { font-size: 80%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
    tr.S2-Footer { font-size: 80%; font-family: "Calibri"; font-weight: normal; font-style: normal; text-decoration: none;  }
-->
</style>
`;

export const content2: string = `
<table width="49%" align=center cellpadding=3% cellspacing=0 class=S2>
    <colgroup>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    </colgroup>
<thead>
<tr class="S2-FirmName">
    <th align=center colspan=49>Advent Asset Management</th>
    </tr>
<tr class="S2-RepTitle">
    <th align=center colspan=49>PERFORMANCE REPORT</th>
    </tr>
<tr class="S2-RepTitle">
    <th align=center colspan=49>NET OF FEES</th>
    </tr>
<tr class="S2-PortName">
    <th align=center colspan=49><HyperLink><AppCommand Caption='Performance by Asset Class' Type='Axys Report' Cmd='rep32 -madvperf1.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Evan Case</a></th>
    </tr>
<tr class="S2-PortName">
    <th align=center colspan=49>CASE</th>
    </tr>
<tr class="S2-PortName">
    <th align=center colspan=49>Fifth Third Bank  990123475</th>
    </tr>
<tr class="S2-Date">
    <th align=center colspan=49>From 09-30-05 to 12-31-05</th>
    </tr>
<tr class="S2-Header">
    <td colspan=49>&nbsp;</td>
    </tr>
</thead>
<tbody>
<tr class="S2-SectSubtotal">
    <td align=left colspan=42>Portfolio Value on 09-30-05</td>
    <td align=right colspan=20>8,396,388</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Accrued Interest</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>18,778</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Significant Contributions/Withdrawals' Type='Axys Report' Cmd='rep32 -madvperf2.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Contributions</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>2,894,000</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Significant Contributions/Withdrawals' Type='Axys Report' Cmd='rep32 -madvperf2.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Withdrawals</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>0</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Date to Date Gain and Loss' Type='Axys Report' Cmd='rep32 -madvperf3.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Realized Gains</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>-42</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Date to Date Gain and Loss' Type='Axys Report' Cmd='rep32 -madvperf3.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Unrealized Gains</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>252,128</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Income and Expenses' Type='Axys Report' Cmd='rep32 -madvperf4.smc -pcase "-b100105 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Interest</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>725</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Income and Expenses' Type='Axys Report' Cmd='rep32 -madvperf4.smc -pcase "-b100105 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee y	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Dividends</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>0</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Change in Accrued Interest</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>8</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-UnderLine">
    <td align=left colspan=23>&nbsp;</td>
    <td align=left colspan=19><hr size=1 noshade></td>
    <td align=left colspan=19>&nbsp;</td>
    </tr>
<tr class="S2-SectSubtotal">
    <td align=left colspan=42>Portfolio Value on 12-31-05</td>
    <td align=right colspan=20>11,543,199</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Accrued Interest</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>18,786</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Average Capital</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>8,446,623</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Total Fees</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>0</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Total Gain after Fees</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>252,819</td>
    </tr>
<tr class="S2-UnderLine">
    <td align=left colspan=23>&nbsp;</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=left colspan=20><hr size=1 noshade></td>
    </tr>
<tr class="S2-GrandTotal">
    <td align=left colspan=23>IRR for 0.25 Years</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>2.99 %</td>
    </tr>
<tr class="S2-GrandTotal">
    <td align=left colspan=23>&nbsp;</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=left colspan=20><hr size=1 noshade></td>
    </tr>
</tbody>
</table>
<div>
<table width="49%" align=center cellpadding=3% cellspacing=0 class=S2>
    <colgroup>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    <col>
    </colgroup>
<thead>
<tr class="S2-FirmName">
    <th align=center colspan=49>Advent Asset Management</th>
    </tr>
<tr class="S2-RepTitle">
    <th align=center colspan=49>PERFORMANCE REPORT</th>
    </tr>
<tr class="S2-RepTitle">
    <th align=center colspan=49>GROSS OF FEES</th>
    </tr>
<tr class="S2-PortName">
    <th align=center colspan=49><HyperLink><AppCommand Caption='Performance by Asset Class' Type='Axys Report' Cmd='rep32 -madvperf1.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Evan Case</a></th>
    </tr>
<tr class="S2-PortName">
    <th align=center colspan=49>CASE</th>
    </tr>
<tr class="S2-PortName">
    <th align=center colspan=49>Fifth Third Bank  990123475</th>
    </tr>
<tr class="S2-Date">
    <th align=center colspan=49>From 09-30-05 to 12-31-05</th>
    </tr>
<tr class="S2-Header">
    <td colspan=49>&nbsp;</td>
    </tr>
</thead>
<tbody>
<tr class="S2-SectSubtotal">
    <td align=left colspan=42>Portfolio Value on 09-30-05</td>
    <td align=right colspan=20>8,396,388</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Accrued Interest</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>18,778</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Significant Contributions/Withdrawals' Type='Axys Report' Cmd='rep32 -madvperf2.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Contributions</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>2,894,000</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Significant Contributions/Withdrawals' Type='Axys Report' Cmd='rep32 -madvperf2.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Withdrawals</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>0</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Date to Date Gain and Loss' Type='Axys Report' Cmd='rep32 -madvperf3.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Realized Gains</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>-42</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Date to Date Gain and Loss' Type='Axys Report' Cmd='rep32 -madvperf3.smc -pcase "-b093005 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Unrealized Gains</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>252,128</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Income and Expenses' Type='Axys Report' Cmd='rep32 -madvperf4.smc -pcase "-b100105 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Interest</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>725</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23><HyperLink><AppCommand Caption='Income and Expenses' Type='Axys Report' Cmd='rep32 -madvperf4.smc -pcase "-b100105 123105" -t -J -x -su -z "-l$fx us	$acb y	$perffee n	$_ann n	$_graph n	$gname11 Evan Case	$__sens Plump npennies nshowai ypmai ntdai nyldmeth yoncost nfxflip nsettle nigroup nsector nadjcost ntdaa npmaa npaycap ?dsclaim  ? curface ytipsadj nlcid  1033 priset  Standard shwsym y"' />
</HyperLink>Dividends</a></td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>0</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Change in Accrued Interest</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>8</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-UnderLine">
    <td align=left colspan=23>&nbsp;</td>
    <td align=left colspan=19><hr size=1 noshade></td>
    <td align=left colspan=19>&nbsp;</td>
    </tr>
<tr class="S2-SectSubtotal">
    <td align=left colspan=42>Portfolio Value on 12-31-05</td>
    <td align=right colspan=20>11,543,199</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Accrued Interest</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>18,786</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Average Capital</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>8,446,623</td>
    </tr>
<tr class="S2-Detail">
    <td colspan=49>&nbsp;</td>
    </tr>
<tr class="S2-Detail">
    <td align=left colspan=23>Total Gain before Fees</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>252,819</td>
    </tr>
<tr class="S2-UnderLine">
    <td align=left colspan=23>&nbsp;</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=left colspan=20><hr size=1 noshade></td>
    </tr>
<tr class="S2-GrandTotal">
    <td align=left colspan=23>IRR for 0.25 Years</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=right colspan=20>2.99 %</td>
    </tr>
<tr class="S2-GrandTotal">
    <td align=left colspan=23>&nbsp;</td>
    <td align=left colspan=19>&nbsp;</td>
    <td align=left colspan=20><hr size=1 noshade></td>
    </tr>
</tbody>
</table>
</div>
</body>
</html>
`;