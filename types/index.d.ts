export type BreakpointsDefinition = {
  mobile: number;
  tablet: number;
  small_desktop: number;
  large_desktop: number;
  x_large_desktop: number;
};

export type ViewportSize = { width: number; height: number };

export class SimpleBreakpoints {
  breakpoints: BreakpointsDefinition;
  viewport: ViewportSize;
  lastBreakpoint: keyof BreakpointsDefinition;

  constructor(params: BreakpointsDefinition, options?: {
    dom?: boolean,
  });

  on(event: string, callback: AnyFunction): void;

  off(event: string): void;

  getViewportSize(): ViewportSize;

  currentBreakpoint(): keyof BreakpointsDefinition | undefined;

  isBetween(smallBreakpoint: keyof BreakpointsDefinition, largeBreakpoint: keyof BreakpointsDefinition): boolean;

  isLessThan(breakpoint: keyof BreakpointsDefinition): boolean;

  isGreaterThan(breakpoint: keyof BreakpointsDefinition): boolean;

  isLessThanEqualTo(breakpoint: keyof BreakpointsDefinition): boolean;

  isGreaterThanEqualTo(breakpoint: keyof BreakpointsDefinition): boolean;

  isMobile(): boolean;

  isTablet(): boolean;

  isSmallDesktop(): boolean;

  isLargeDesktop(): boolean;
}

export default SimpleBreakpoints;
