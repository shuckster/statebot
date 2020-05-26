BEGIN {
  emit_index=0;
  enter_index=0;
  instate_index=0;
}
{
  if ($0 ~ /#statebotfsmemit/) {
    emit_index++
    if (emit_index==2 || emit_index==5) {
      sub(/#statebotfsmemit/, "#emit-eventname")
    }
  }

  if ($0 ~ /#statebotfsmenter/) {
    enter_index++
    if (enter_index==2 || enter_index==5) {
      sub(/#statebotfsmenter/, "#enter-state")
    }
  }

  if ($0 ~ /#statebotfsminstate/) {
    instate_index++
    if (instate_index==2 || instate_index == 5) {
      sub(/#statebotfsminstate/, "#instate-state-outputwhentrue-1")
    }
  }

  if ($0 ~ /<\/body>/) {
    sub(/<\/body>/, " \
      <script src=\"./statebot.min.browser.js\"></script> \
      <script> \
        var Statebot = statebot.Statebot; \
        var isStatebot = statebot.isStatebot; \
        var routeIsPossible = statebot.routeIsPossible; \
        var assertRoute = statebot.assertRoute; \
        var decomposeChart = statebot.decomposeChart; \
        function help() { \
          console.info( \
            '\\nExperiment with Statebot in your browser!\\n\\n' \
          ); \
          console.info( \
            '\\nvar machine = Statebot(name, { chart: \\'idle -> go | abort\\' })\\n' + \
            '\\n' + \
            'Hitchers:\\n' + \
            '  .performTransitions() / .onEvent()\\n' + \
            '  .onTransitions()\\n' + \
            '  .onEntering() / .onEntered()\\n' + \
            '  .onExiting() / .onExited()\\n' + \
            '  .onSwitching() / .onSwitched()\\n' + \
            '\\n' + \
            'Status:\\n' + \
            '  .canTransitionTo() / .statesAvailableFromHere()\\n' + \
            '  .currentState() / .previousState() / .history()\\n' + \
            '  .inState() / .InState()\\n' + \
            '  .info() / .inspect() / .name()\\n' + \
            '\\n' + \
            'Actions:\\n' + \
            '  .emit() / .Emit()\\n' + \
            '  .enter() / .Enter()\\n' + \
            '  .reset()\\n' + \
            '\\n' \
          ) \
          console.info( \
            '\\nEnter help() to show this message again.\\n\\n' \
          ); \
        } \
        help(); \
      </script> \
    </body> \
    ")
  }

  print
}
