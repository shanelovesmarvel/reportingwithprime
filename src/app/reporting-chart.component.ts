import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'r-chart',
    template: `
        <div class="r-chart" style="margin-left: 20px; margin-top: 10px;">
            <dx-chart
                *ngIf="cOptions?.type !== 'pie'" 
                [dataSource]="cOptions?.dataSource"
                [palette]="cOptions?.palette"
                [title]="cOptions?.title">
                <dxi-series *ngFor="let serie of cOptions?.series"
                    [type]="serie?.type"
                    [argumentField]="serie?.argumentField"
                    [valueField]="serie?.valueField"
                    [axis]="serie?.axis"
                    [name]="serie?.name"
                    [color]="serie?.color">
                </dxi-series>
                <dxo-common-series-settings
                    [type]="cOptions?.commonSeries.type"
                    [argumentField]="cOptions?.commonSeries.argumentField"
                    [axis]="cOptions?.commonSeries.axis"
                    [color]="cOptions?.commonSeries.color">
                </dxo-common-series-settings>
                <dxo-tooltip
                    [enabled]="cOptions?.tooltip.enabled"
                    [format]="cOptions?.tooltip.format"
                    [customizeTooltip]="cOptions?.tooltip.customizeTooltip">
                </dxo-tooltip>
                <dxo-size [height]="cOptions?.height" [width]="cOptions?.width"></dxo-size>
                <dxo-legend 
                    [horizontalAlignment]="cOptions?.legend.horizontalAlignment"
                    [verticalAlignment]="cOptions?.legend.verticalAlignment">
                </dxo-legend>
            </dx-chart>
            <dx-pie-chart
                *ngIf="cOptions?.type === 'pie'"
                [dataSource]="cOptions?.dataSource"
                [palette]="cOptions?.palette"
                [title]="cOptions?.title">
                <dxi-series
                    [type]="cOptions?.series[0].type"
                    [argumentField]="cOptions?.series[0].argumentField"
                    [valueField]="cOptions?.series[0].valueField"
                    [axis]="cOptions?.series[0].axis"
                    [name]="cOptions?.series[0].name"
                    [color]="cOptions?.series[0].color">
                </dxi-series>
                <dxo-tooltip
                    [enabled]="cOptions?.tooltip.enabled"
                    [format]="cOptions?.tooltip.format"
                    [customizeTooltip]="cOptions?.tooltip.customizeTooltip">
                </dxo-tooltip>  
                <dxo-size [height]="cOptions?.height" [width]="cOptions?.width"></dxo-size> 
                <dxo-legend 
                    [horizontalAlignment]="cOptions?.legend.horizontalAlignment"
                    [verticalAlignment]="cOptions?.legend.verticalAlignment">
                </dxo-legend>             
            </dx-pie-chart>
        </div>
    `
})

export class ReportingChartComponent implements OnInit {

    cOptions: IChartOptions = null;

    @Input() set options(optionsValue: IChartOptions) {
        if (!optionsValue) {
            return;
        }
        this.cOptions = optionsValue;
    }

    get options(): IChartOptions {
        return this.cOptions;
    }

    constructor() { }

    ngOnInit() { }

    
}

interface IChartOptions {
    commonSeries?: IChartSeriesOption;
    dataSource?: Array<any> | any;
    height?: number;
    palette?: Array<string> | string;
    series?: Array<IChartSeriesOption>;
    title?: string;
    tooltip?: IChartTooltipOption;
    type?: string;
    width?: number;
}

interface IChartTooltipOption {
    enabled?: boolean;
    format?: any;
    customizeTooltip?: any;
}

interface IChartLegendOption {
    horizontalAlignment?: string;
    verticalAlignment?: string;
}

export interface IChartSeriesOption {
    type?: string;
    argumentField?: string;
    valueField?: string;
    axis?: string;
    name?: string;
    color?: string;
}