NODE_BIN = ./node_modules/.bin

licenses:
	${NODE_BIN}/license-report --only=prod --package=./package.json --output=json > ./licenseBuild/licenses.json
	
#${NODE_BIN}/license-checker --json --production --customPath ./licenseBuild/customFormat.json > ./licenseBuild/licenses.json

changelog:
	${NODE_BIN}/standard-changelog -i CHANGELOG.md --same-file

dev: licenses
	${NODE_BIN}/webpack

prod: licenses
	${NODE_BIN}/webpack --mode production

openApp: generateDebugApp openDebugApp

openDebugApp:
	adb shell am start -n "com.dergoogler.mmrl.debug/com.dergoogler.mmrl.MainActivity" -a android.intent.action.MAIN -c android.intent.category.LAUNCHER

generateDebugApp: dev
	cd .. && cd Android && ./gradlew installDebug
