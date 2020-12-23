var Statebot = statebot.Statebot;
var isStatebot = statebot.isStatebot;
var routeIsPossible = statebot.routeIsPossible;
var assertRoute = statebot.assertRoute;
var decomposeChart = statebot.decomposeChart;

function help() {
  console.info(
    '\nExperiment with Statebot in your browser!\n\n'
  );

  console.info(
    '\nvar machine = Statebot(name, { chart: \'idle -> go | abort\' })\n' +
    '\n' +
    'Hitchers:\n' +
    '  .performTransitions() / .onEvent()\n' +
    '  .onTransitions()\n' +
    '  .onEntering() / .onEntered()\n' +
    '  .onExiting() / .onExited()\n' +
    '  .onSwitching() / .onSwitched()\n' +
    '\n' +
    'Status:\n' +
    '  .canTransitionTo() / .statesAvailableFromHere()\n' +
    '  .currentState() / .previousState() / .history()\n' +
    '  .inState() / .InState()\n' +
    '  .info() / .inspect() / .name()\n' +
    '\n' +
    'Actions:\n' +
    '  .emit() / .Emit()\n' +
    '  .enter() / .Enter()\n' +
    '  .reset()\n' +
    '\n'
  )

  console.info(
    '\nEnter help() to show this message again.\n\n'
  );
}

help();
