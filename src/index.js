import Dispatcher from './Dispatcher';

const defaultOptions = {
  dom: true,
};

export default class {
    constructor(
      breakpoints = {
        mobile: 480,
        tablet: 640,
        small_desktop: 1024,
        large_desktop: 1180,
        x_large_desktop: 1600
      },
      options = {},
    ) {
        this.options = Object.assign(
          {},
          defaultOptions,
          options,
        );

        this.breakpoints    = breakpoints;
        this.getViewportSize();

        this.viewport       = this.getViewportSize();
        this.lastBreakpoint = this.currentBreakpoint();
        if (this.options.dom) {
          window.addEventListener('resize', () => {
              this.viewport = this.getViewportSize();

              let currentBreakpoint = this.currentBreakpoint(),
                  direction;

              if(currentBreakpoint !== this.lastBreakpoint) {
                  Dispatcher.fire('breakpointChange', this.lastBreakpoint, currentBreakpoint);

                  if(this.breakpoints[this.lastBreakpoint] > this.breakpoints[currentBreakpoint]) {
                      direction = 'Down';
                  } else {
                      direction = 'Up';
                  }

                  Dispatcher.fire(`breakpointChange${direction}`, this.lastBreakpoint, currentBreakpoint);

                  this.lastBreakpoint = currentBreakpoint;
              }

          });
        }
    }

    on (event, callback) {
        Dispatcher.on(event, callback);
    }

    off (event) {
        Dispatcher.off(event);
    }

    getViewportSize () {
      if (!this.options.dom) {
        return {
          width: 0,
          height: 0,
        };
      }
      let win = window,
        obj = 'inner';

      if (!('innerWidth' in window)) {
        obj = 'client';
        win = document.documentElement || document.body;
      }

      return {
          width: win[obj + 'Width'],
          height: win[obj + 'Height']
      };
    }

    currentBreakpoint () {
        if(this.isGreaterThan('large_desktop')) {
            return 'x_large_desktop';
        }

        if(this.isMobile()) {
            return 'mobile';
        }

        if(this.isTablet()) {
            return 'tablet';
        }

        if(this.isSmallDesktop()) {
            return 'small_desktop';
        }

        if(this.isLargeDesktop()) {
            return 'large_desktop';
        }
    }

    isBetween (smallBreakpoint, largeBreakpoint) {
        return this.isGreaterThanEqualTo(smallBreakpoint) && this.isLessThan(largeBreakpoint);
    }

    isLessThan (breakpoint) {
        return this.viewport.width < this.breakpoints[breakpoint];
    }

    isGreaterThan (breakpoint) {
        return this.viewport.width > this.breakpoints[breakpoint];
    }

    isLessThanEqualTo (breakpoint) {
        return this.viewport.width <= this.breakpoints[breakpoint];
    }

    isGreaterThanEqualTo (breakpoint) {
        return this.viewport.width >= this.breakpoints[breakpoint];
    }

    isMobile () {
        return this.isLessThan('mobile');
    }

    isTablet () {
        return this.isBetween('mobile', 'tablet');
    }

    isSmallDesktop () {
        return this.isBetween('tablet', 'small_desktop');
    }

    isLargeDesktop () {
        return this.isGreaterThanEqualTo('small_desktop');
    }

};
