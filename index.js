const updateRunningClock = ( { Clock }, isRunning ) => {
    if ( isRunning ) {
        document.body.classList = `clocking-${ Clock }`;
    }
};

const updateLineupCount = ( _, time ) => {
    $( '.lineup__countdown' ).html( mmss( time ) );
    $( '.lineup' ).toggleClass( 'warning', time >= 20000 );
};

const updateIntermissionTitle = ( _, title ) => {
    $( '.intermission__title' ).html( title );
};

const updateIntermissionTime = ( _, time ) => {
    $( '.intermission__countdown' ).html( mmss( time ) );
};

const mmss = milliseconds => 
    new Date( milliseconds ).toISOString().substr( 14, 5 );

const init = () => {
    WS.Register( [ "ScoreBoard.Clock(*).Running" ], updateRunningClock );
    WS.Register( [ "ScoreBoard.Clock(Lineup).Time" ], updateLineupCount );
    WS.Register( [ "ScoreBoard.Clock(Intermission).Name" ], updateIntermissionTitle );
    WS.Register( [ "ScoreBoard.Clock(Intermission).Time" ], updateIntermissionTime );

    WS.Connect();
    WS.AutoRegister();
};

$(init);
