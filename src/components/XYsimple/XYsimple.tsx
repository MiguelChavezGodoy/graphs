"use client";

import React from 'react';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { LinearGradient } from '@visx/gradient';

import ExampleControls from './ExampleControls';
import CustomChartBackground from './CustomChartBackground';

export type XYChartProps = {
  width: number;
  height: number;
};

type City = 'San Francisco' | 'New York' | 'Austin';

export default function XYwithControls({ height }: XYChartProps) {
  return (
    <ExampleControls>
      {({
        accessors,
        animationTrajectory,
        config,
        curve,
        data,
        editAnnotationLabelPosition,
        numTicks,
        renderAreaSeries,
        renderAreaStack,
        renderBarGroup,
        enableTooltipGlyph,
        renderTooltipGlyph,
        renderHorizontally,
        renderLineSeries,
        setAnnotationDataIndex,
        setAnnotationDataKey,
        sharedTooltip,
        showHorizontalCrosshair,
        showTooltip,
        showVerticalCrosshair,
        snapTooltipToDatumX,
        snapTooltipToDatumY,
        stackOffset,
        theme,
        xAxisOrientation,
        yAxisOrientation,

        // components are animated or not depending on selection
        AreaSeries,
        AreaStack,
        Axis,
        Grid,
        LineSeries,
        Tooltip,
        XYChart,

        //tests
        onEnter,
        onLeave,
        isHovered,
      }) => (
        <XYChart
          theme={theme}
          xScale={config.x}
          yScale={config.y}
          height={Math.min(400, height)}
          captureEvents={!editAnnotationLabelPosition}
          onPointerUp={(d) => {
            setAnnotationDataKey(d.key as 'Austin');
            setAnnotationDataIndex(d.index);
          }}
        >
          <CustomChartBackground />
          <Grid
            key={`grid-${animationTrajectory}`} // force animate on update
            rows={true}
            columns={false}
            animationTrajectory={animationTrajectory}
            numTicks={numTicks}
          />
          {renderAreaSeries && (
            <>
              <LinearGradient //here you define your gradient background to use in the fill property
                from="#3598DB"
                to="rgba(53, 152, 219, 0.2)"
                id="grad"
              />
              <AreaSeries
                dataKey="Austin" // Key to identify to which series this data chart belongs
                data={data} // The whole data object
                xAccessor={accessors.x.Austin} //this prop give the graph a reference by each item of the data object to go look or calculate (depends on what you need) the value for X of the current item iteration
                yAccessor={accessors.y.Austin} //this prop give the graph a reference by each item of the data object to go look or calculate (depends on what you need) the value for Y of the current item iteration
                fillOpacity={isHovered ? 1 : 0}
                fill={isHovered ? 'url(#grad)' : ''} //handles the svg properties so you can change anything about the graphic
                curve={curve} //tipe of line for the graph
                onPointerMove={onEnter} //handles different events
                onPointerOut={onLeave}
                onAnimationStart={() => console.log('asfsdfsdf')}
              >
                {isHovered && //find better way to build animation
                  <animate id="animation1"
                    attributeName="opacity"
                    from="0" to="1" dur="10s" 
                  />
                }
              </AreaSeries>
            </>
          )}
          {renderAreaStack && (
            <AreaStack curve={curve} offset={stackOffset} renderLine={stackOffset !== 'wiggle'}>
              <AreaSeries
                dataKey="Austin"
                data={data}
                xAccessor={accessors.x.Austin}
                yAccessor={accessors.y.Austin}
                fillOpacity={0.4}
              />
            </AreaStack>
          )}
          {renderLineSeries && (
            <>
              <LineSeries
                dataKey="Austin"
                data={data}
                xAccessor={accessors.x.Austin}
                yAccessor={accessors.y.Austin}
                curve={curve}
              />
            </>
          )}
          <Axis
            key={`time-axis-horizontal`}
            orientation={'bottom'}
            numTicks={numTicks}
            animationTrajectory={animationTrajectory}
          />
          <Axis
            key={`temp-axis-${animationTrajectory}-${renderHorizontally}`}
            label={
              stackOffset == null
                ? 'Temperature (°F)'
                : stackOffset === 'expand'
                ? 'Fraction of total temperature'
                : ''
            }
            orientation={renderHorizontally ? xAxisOrientation : yAxisOrientation}
            numTicks={numTicks}
            animationTrajectory={animationTrajectory}
            // values don't make sense in stream graph
            tickFormat={stackOffset === 'wiggle' ? () => '' : undefined}
          />
          {showTooltip && (
            <Tooltip<CityTemperature>
              showHorizontalCrosshair={showHorizontalCrosshair}
              showVerticalCrosshair={showVerticalCrosshair}
              verticalCrosshairStyle={{strokeDasharray: "10,10"}}
              snapTooltipToDatumX={snapTooltipToDatumX}
              snapTooltipToDatumY={snapTooltipToDatumY}
              showDatumGlyph={(snapTooltipToDatumX || snapTooltipToDatumY) && !renderBarGroup}
              showSeriesGlyphs={sharedTooltip && !renderBarGroup}
              renderGlyph={enableTooltipGlyph ? renderTooltipGlyph : undefined}
              renderTooltip={({ tooltipData, colorScale }) => (
                <>
                  {/** date */}
                  {(tooltipData?.nearestDatum?.datum &&
                    accessors.date(tooltipData?.nearestDatum?.datum)) ||
                    'No date'}
                  <br />
                  <br />
                  {/** temperatures */}
                  {(
                    (sharedTooltip
                      ? Object.keys(tooltipData?.datumByKey ?? {})
                      : [tooltipData?.nearestDatum?.key]
                    ).filter((city) => city) as City[]
                  ).map((city) => {
                    const temperature = 0

                    return (
                      <div key={city}>
                        <em
                          style={{
                            color: colorScale?.(city),
                            textDecoration:
                              tooltipData?.nearestDatum?.key === city ? 'underline' : undefined,
                          }}
                        >
                          {city}
                        </em>{' '}
                        {temperature == null || Number.isNaN(temperature)
                          ? '–'
                          : `${temperature}° F`}
                      </div>
                    );
                  })}
                </>
              )}
            />
          )}
        </XYChart>
      )}
    </ExampleControls>
  );
}
