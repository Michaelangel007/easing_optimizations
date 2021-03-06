"use strict";

var Easing = Object.freeze(
{
    NONE            :  0,
    LINEAR          :  1,

// Power
    IN_QUADRATIC    :  2,
    IN_CUBIC        :  3,
    IN_QUARTIC      :  4,
    IN_QUINTIC      :  5,
    IN_SEXTIC       :  6,
    IN_SEPTIC       :  7,
    IN_OCTIC        :  8,

    OUT_QUADRATIC   :  9,
    OUT_CUBIC       : 10,
    OUT_QUARTIC     : 11,
    OUT_QUINTIC     : 12,
    OUT_SEXTIC      : 13,
    OUT_SEPTIC      : 14,
    OUT_OCTIC       : 15,

    IN_OUT_QUADRATIC: 16,
    IN_OUT_CUBIC    : 17,
    IN_OUT_QUARTIC  : 18,
    IN_OUT_QUINTIC  : 19,
    IN_OUT_SEXTIC   : 20,
    IN_OUT_SEPTIC   : 21,
    IN_OUT_OCTIC    : 22,

// Standard
    IN_BACK         : 23,
    IN_OUT_BACK     : 24,
    OUT_BACK        : 25,

    IN_BOUNCE       : 26,
    IN_OUT_BOUNCE   : 27,
    OUT_BOUNCE      : 28,

    IN_CIRCLE       : 29,
    IN_OUT_CIRCLE   : 30,
    OUT_CIRCLE      : 31,

    IN_ELASTIC      : 32,
    IN_OUT_ELASTIC  : 33,
    OUT_ELASTIC     : 34,

    IN_EXPONENT2    : 35,
    IN_OUT_EXPONENT2: 36,
    OUT_EXPONENT2   : 37,

    IN_SINE         : 38,
    IN_OUT_SINE     : 39,
    OUT_SINE        : 40,

// Non-Standard Power
    IN_EXPONENTE    : 41,
    IN_OUT_EXPONENTE: 42,
    OUT_EXPONENTE   : 43,

    IN_LOG10        : 44,
    IN_OUT_LOG10    : 45,
    OUT_LOG10       : 46,

    IN_SQRT         : 47,
    IN_OUT_SQRT     : 48,
    OUT_SQRT        : 49,

    SMOOTHSTEP      : 50, // Has no 'In' not 'Out' since is 'InOut'

    NUM             : 51,
});


/**
 * Given an normalized elapsed time (between 0.0 and 1.0 inclusive)
 * an easing function returns an adjusted, or 'warped', elapsed time
 * For example, a `Linear` function returns the time "as-is".
 * An `Out Quadratic` easing quickly accelerates then deaccelerates
 * as it closes to the final total time.
 *
 * @param {Number} p - Normalized Standard Time Percentage [0.0,1.0] (inclusive)
 * @returns {Number} - Normalized Adjusted Time Percentage
 *
 * @Notes:
 *
 *   Distance = Velocity*Time
 *   d = v*t
 *
 *   Position = Start + (Finish-Start)*(Elapsed/Duration)
 * Or
 *   Position = Min   + (Max-Min)*(Elapsed/Duration)
 */
var EasingFuncs = // Array of Functions
[
// Power -- grouped by In,Out,InOut
    function None           (p) { return 1;               }, // p^0 Placeholder for no active animation
    function Linear         (p) { return p;               }, // p^1 Note: In = Out = InOut
    function InQuadratic    (p) { return p*p;             }, // p^2 = Math.pow(p,2)
    function InCubic        (p) { return p*p*p;           }, // p^3 = Math.pow(p,3)
    function InQuartic      (p) { return p*p*p*p;         }, // p^4 = Math.pow(p,4)
    function InQuintic      (p) { return p*p*p*p*p;       }, // p^5 = Math.pow(p,5)
    function InSextic       (p) { return p*p*p*p*p*p;     }, // p^6 = Math.pow(p,6)
    function InSeptic       (p) { return p*p*p*p*p*p*p;   }, // p^7 = Math.pow(p,7)
    function InOctic        (p) { return p*p*p*p*p*p*p*p; }, // p^8 = Math.pow(p,8)

    function OutQuadratic   (p) { var m=p-1; return 1-m*m;             },
    function OutCubic       (p) { var m=p-1; return 1+m*m*m;           },
    function OutQuartic     (p) { var m=p-1; return 1-m*m*m*m;         },
    function OutQuintic     (p) { var m=p-1; return 1+m*m*m*m*m;       },
    function OutSextic      (p) { var m=p-1; return 1-m*m*m*m*m*m;     },
    function OutSeptic      (p) { var m=p-1; return 1+m*m*m*m*m*m*m;   },
    function OutOctic       (p) { var m=p-1; return 1-m*m*m*m*m*m*m*m; },

    function InOutQuadratic (p) { var m=p-1,t=p*2; if (t < 1) return p*t;             return 1-m*m            *  2; },
    function InOutCubic     (p) { var m=p-1,t=p*2; if (t < 1) return p*t*t;           return 1+m*m*m          *  4; },
    function InOutQuartic   (p) { var m=p-1,t=p*2; if (t < 1) return p*t*t*t;         return 1-m*m*m*m        *  8; },
    function InOutQuintic   (p) { var m=p-1,t=p*2; if (t < 1) return p*t*t*t*t;       return 1+m*m*m*m*m      * 16; },
    function InOutSextic    (p) { var m=p-1,t=p*2; if (t < 1) return p*t*t*t*t*t;     return 1-m*m*m*m*m*m    * 32; },
    function InOutSeptic    (p) { var m=p-1,t=p*2; if (t < 1) return p*t*t*t*t*t*t;   return 1+m*m*m*m*m*m*m  * 64; },
    function InOutOctic     (p) { var m=p-1,t=p*2; if (t < 1) return p*t*t*t*t*t*t*t; return 1-m*m*m*m*m*m*m*m*128; },

// Standard -- grouped by Type
    function InBack         (p) { var              k = 1.70158        ;              return p*p*(p*(k+1) - k);                                        },
    function InOutBack      (p) { var m=p-1,t=p*2, k = 1.70158 * 1.525; if (p < 0.5) return p*t*(t*(k+1) - k); else return 1 + 2*m*m*(2*m*(k+1) + k); }, // NOTE: Can go negative! i.e. p = 0.008
    function OutBack        (p) { var m=p-1,       k = 1.70158        ;                                             return 1 +   m*m*(  m*(k+1) + k); },

    function InBounce       (p) { return 1 - EasingFuncs[ Easing.OUT_BOUNCE ]( 1-p ); },
    function InOutBounce    (p) {
                                    var t = p*2;
                                    if (t < 1) return 0.5 - 0.5*EasingFuncs[ Easing.OUT_BOUNCE ]( 1 - t );
                                    return            0.5 + 0.5*EasingFuncs[ Easing.OUT_BOUNCE ]( t - 1 );
                                },
    function OutBounce      (p) {
                                    var r  = 1  / 2.75; // reciprocal
                                    var k1 =         r; // 36.36%
                                    var k2 = 2     * r; // 72.72%
                                    var k3 = 1.5   * r; // 54.54%
                                    var k4 = 2.5   * r; // 90.90%
                                    var k5 = 2.25  * r; // 81.81%
                                    var k6 = 2.625 * r; // 95.45%
                                    var k0 = 7.5625, t;

                                    /**/ if (p < k1) {             return k0 * p*p;            }
                                    else if (p < k2) { t = p - k3; return k0 * t*t + 0.75;     } // 48/64
                                    else if (p < k4) { t = p - k5; return k0 * t*t + 0.9375;   } // 60/64
                                    else             { t = p - k6; return k0 * t*t + 0.984375; } // 63/64
                                },

    function InCircle       (p) {                             return  1-Math.sqrt( 1 - p*p );                                                      },
    function InOutCircle    (p) { var m=p-1,t=p*2; if (t < 1) return (1-Math.sqrt( 1 - t*t ))*0.5; else return (Math.sqrt( 1 - 4*m*m ) + 1) * 0.5; },
    function OutCircle      (p) { var m=p-1      ;                                                      return  Math.sqrt( 1 -   m*m );            },

    function InElastic      (p) { var m = p-1; return  - Math.pow( 2,10*m  ) * Math.sin( ( m*40 - 3) * Math.PI/6  ); },
    function InOutElastic   (p) {
                                    var s = 2*p-1;                 // remap: [0,0.5] -> [-1,0]
                                    var k = (80*s-9) * Math.PI/18; // and    [0.5,1] -> [0,+1]

                                    if (s < 0) return   -0.5*Math.pow(2, 10*s) * Math.sin( k );
                                    else       return 1 +0.5*Math.pow(2,-10*s) * Math.sin( k );
                                },
    function OutElastic     (p) {              return 1+(Math.pow( 2,10*-p ) * Math.sin( (-p*40 - 3) * Math.PI/6 )); },

    // NOTE: 'Exponent2' needs clamping for 0 and 1 respectively
    function InExponent2    (p) {   if (p <= 0) return 0; return   Math.pow( 2,  10*(p-1) ); },
    function InOutExponent2 (p) {
                                    if (p <= 0) return 0;
                                    if (p >= 1) return 1;
                                    if (p <0.5) return             Math.pow( 2,  10*(2*p-1)-1);
                                    else        return           1-Math.pow( 2, -10*(2*p-1)-1);
                                },
    function OutExponent2   (p)  {   if (p >= 1) return 1; return 1-Math.pow( 2, -10* p    ); },


    function InSine         (p) { return      1 - Math.cos( p * Math.PI*0.5 );  },
    function InOutSine      (p) { return 0.5*(1 - Math.cos( p * Math.PI     )); },
    function OutSine        (p) { return          Math.sin( p * Math.PI*0.5 );  },

// Non-Standard
    function InExponentE    (p) {   if (p <= 0) return 0; return   Math.pow( Math.E, -10*(1-p) ); }, // Scale 0..1 -> p^-10 .. p^0
    function InOutExponentE (p) {
                                    var t = p*2;
                                    if (t < 1) return 0.5 - 0.5*EasingFuncs[ Easing.OUT_EXPONENTE ]( 1 - t );
                                    return            0.5 + 0.5*EasingFuncs[ Easing.OUT_EXPONENTE ]( t - 1 );
                                },
    function OutExponentE   (p) { return 1 - EasingFuncs[ Easing.IN_EXPONENTE ]( 1-p ); },


    function InLog10        (p) { return 1 - EasingFuncs[ Easing.OUT_LOG10 ]( 1-p ); },
    function InOutLog10     (p) {
                                    var t = p*2;
                                    if (t < 1) return 0.5 - 0.5*EasingFuncs[ Easing.OUT_LOG10      ]( 1 - t );
                                    return            0.5 + 0.5*EasingFuncs[ Easing.OUT_LOG10      ]( t - 1 );
                                },
    function OutLog10       (p) { return Math.log10( (p*9)+1 ); }, // Scale 0..1 -> Log10( 1 ) .. Log10( 10 )

    function InSquareRoot   (p) { return 1 - EasingFuncs[ Easing.OUT_SQRT       ]( 1-p ); },
    function InOutSquareRoot(p) {
                                    var t = p*2;
                                    if (t < 1) return 0.5 - 0.5*EasingFuncs[ Easing.OUT_SQRT       ]( 1 - t );
                                    return            0.5 + 0.5*EasingFuncs[ Easing.OUT_SQRT       ]( t - 1 );
                                },
    function OutSquareRoot  (p) { return Math.sqrt( p ) },

    function Smoothstep(t,x0,x1){
        if( x0 === undefined ) x0 = 0;
        if( x1 === undefined ) x1 = 1;

        var p = (t - x0) / (x1 - x0);
        if( p < 0 ) p = 0;
        if( p > 1 ) p = 1;

        return p*p*(3-2*p);
    },

/*
// Alternative: Standard -- Grouped by In, Out, InOut

    function InBack      (p) { var k = 1.70158; return p*p*(p*(k+1) - k); },
    function InBounce    (p) { return 1 - EasingFuncs[ 'easeOutBounce' ]( 1-p ); },
    function InCirc      (p) { return 1 - Math.sqrt( 1 - p*p ); },
    function InElastic   (p) { var m = p-1; return  - Math.pow( 2,10*m  ) * Math.sin( ( m*40 - 3) * Math.PI/6 ); },
    function InExpo      (p) { if (p <= 0) return 0; return  Math.pow( 2, 10*(p-1) ); },
    function InSine      (p) { return      1 - Math.cos( p * Math.PI*0.5 );  },

    function OutBack     (p) { var m=p-1, k = 1.70158; return 1 + m*m*( m*(k+1) + k); },
    function OutBounce   (p) {
                                var k1 = 1   / 2.75; // 36.36%
                                var k2 = 2     * k1; // 72.72%
                                var k3 = 1.5   * k1; // 54.54%
                                var k4 = 2.5   * k1; // 90.90%
                                var k5 = 2.25  * k1; // 81.81%
                                var k6 = 2.625 * k1; // 95.45%
                                var k0 = 7.5625, t;

                                     if (p < k1) {             return k0 * p*p;            }
                                else if (p < k2) { t = p - k3; return k0 * t*t + 0.75;     } // 48/64
                                else if (p < k4) { t = p - k5; return k0 * t*t + 0.9375;   } // 60/64
                                else             { t = p - k6; return k0 * t*t + 0.984375; } // 63/64
                             },
    function OutCirc     (p) { var m=p-1; return Math.sqrt( 1 - m*m ); },
    function OutElastic  (p) { return 1 + (Math.pow( 2,10*-p ) * Math.sin( (-p*40 - 3) * Math.PI/6 )); },
    function OutExpo     (p) { return 1 - Math.pow( 2, -10* p ); },
    function OutSine     (p) { return Math.sin( p * Math.PI*0.5 ); },

    function InOutBack   (p) { var m=p-1,t=p*2, k = 1.70158 * 1.525; if (p < 0.5) return p*t*(t*(k+1) - k); else return 1 + 2*m*m*(2*m*(k+1) + k); },
    function InOutBounce (p) {
                                var t = p*2;
                                if (t < 1) return 0.5 - 0.5*EasingFuncs[ EASEING.OUT_BOUNCE ]( 1 - t );
                                return            0.5 + 0.5*EasingFuncs[ EASEING.OUT_BOUNCE ]( t - 1 );
                             },
    function InOutCirc   (p) { var m=p-1,t=p*2; if (t < 1) return (1-Math.sqrt( 1 - t*t ))*0.5; else return (Math.sqrt( 1 - 4*m*m ) + 1) * 0.5; },
    function InOutElastic(p) {
                                var s = 2*p-1;                 // remap: [0,0.5] -> [-1,0]
                                var k = (80*s-9) * Math.PI/18; // and    [0.5,1] -> [0,+1]
                                if (s < 0) return -0.5*Math.pow(2, 10*s) * Math.sin( k );
                                return          1 +0.5*Math.pow(2,-10*s) * Math.sin( k );
                             },
    function InOutExpo   (p) {
                                if (p <0.5) return   Math.pow( 2,  10*(2*p-1)-1);
                                            return 1-Math.pow( 2, -10*(2*p-1)-1);
                             },
    function InOutSine   (p) { return 0.5 * (1 - Math.cos( p * Math.PI )); },
*/
];

var EasingNames = [];
EasingNames.insert = function( elem )
{
    // To insert name 'as-is':
    //     EasingNames.push( elem.name );
    //
    // OR
    //
    // To pretty print by inserting space when:
    //  * prev letter is lowercase, AND
    //  * next letter is uppercase
    var prev = elem.name.substr( 0, 1 );
    var next;

    var t = prev;
    var n = elem.name.length;

    var p;
    var q;

    var isPrevDigit;
    var isNextDigit;

    var isPrevLower;
    var isNextLower;

    var isPrevUpper;
    var isNextUpper;

    for( var i = 1; i < n; ++i )
    {
        next = elem.name.substr( i, 1 );

        p = prev.charCodeAt( 0 );
        q = next.charCodeAt( 0 );

        isPrevDigit = (p >=48) && (p <=  57); // '0' and '9'
        isNextDigit = (q >=48) && (q <=  57);

        isPrevLower = (p > 96) && (p <= 122); // '`' and 'z'
        isPrevUpper = (p > 64) && (p <=  90); // '@' and 'Z'
        isNextUpper = (q > 64) && (q <=  90);

        if( isPrevLower
        &&  isNextUpper )
            t += ' ';

        if( isPrevUpper
        &&  isNextUpper )
            t += ' ';

        if( isPrevDigit
        && !isNextDigit )
            t += ' ';

        t += next;
        prev = next;
    }
    EasingNames.push( t );
};
EasingFuncs.map( EasingNames.insert );

