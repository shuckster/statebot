#!/bin/sh

# Copy logo + min-script over
cp ./_unsorted/logo-full.png ./docs/
cp ./_unsorted/logo-small.png ./docs/
cp ./dist/statebot.min.browser.js ./docs/

# Remove fonts that aren't really monospaced
sed -e 's/Consolas,//g' -i .bak ./docs/assets/styles.min.css
sed -e 's/Inconsolata,//g' -i .bak ./docs/assets/styles.min.css
rm ./docs/assets/*.bak

# documentationjs is case-insensitive, meaning we
# can't distinguish between emit/Emit, or enter/Enter,
# or inState/InState.
#
# This fixes it:
awk -f fix-docs.awk ./docs/index.html > ./docs/index.html.fixed
mv ./docs/index.html.fixed ./docs/index.html
