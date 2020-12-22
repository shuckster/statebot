BEGIN {
  emit_index=0;
  enter_index=0;
  instate_index=0;
}
{
  if ($0 ~ /#statebotfsmemit/) {
    emit_index++
    if (emit_index==2 || emit_index==5) {
      sub(/#statebotfsmemit/, "#emit-eventname-curriedargs")
    }
  }

  if ($0 ~ /#statebotfsmenter/) {
    enter_index++
    if (enter_index==2 || enter_index==5) {
      sub(/#statebotfsmenter/, "#enter-state-curriedargs")
    }
  }

  if ($0 ~ /#statebotfsminstate/) {
    instate_index++
    if (instate_index==2 || instate_index == 5) {
      sub(/#statebotfsminstate/, "#instate-state-outputwhentrue-curriedfnargs")
    }
  }

  if ($0 ~ /<\/body>/) {
    sub(/<\/body>/, "\n\
<script src=\"./statebot.min.browser.js\"></script>\n\
<script src=\"./statebot-console-help.js\"></script>\n\
</body> \
    ")
  }

  print
}
