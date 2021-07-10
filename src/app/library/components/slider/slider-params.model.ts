//The interface responsible for typing additional input parameters
/**
 * All parameters are not required
 * @see suiSliderParams.showMinimalValue - parameter showing the minimum value of the slider
 * @see suiSliderParams.showMaximumValue - parameter showing the maximum value of the slider
 * @see suiSliderParams.setLegend - parameter showing the legend (title) value of the slider
 * @see suiSliderParams.setLegendColor - parameter sets the slider's legen color
 * @see suiSliderParams.setSliderColor - parameter sets the slider's track color
 * @see suiSliderParams.setValuesColor - parameter sets the slider's current track value
 */
export interface suiSliderParams {
    showMinimalValue?: boolean;
    showMaximumValue?: boolean;
    setLegend?: string;
    setLegendColor?: string;
    setSliderColor?: string;
    setValuesColor?: string;
}
