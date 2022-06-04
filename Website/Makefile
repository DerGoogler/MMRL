NODE_BIN = ./node_modules/.bin

licenses:
	node license > ./src/utils/licenses.json
	
dev: licenses
	${NODE_BIN}/webpack

prod: licenses
	${NODE_BIN}/webpack --mode production

openApp: generateDebugApp openDebugApp

openDebugApp:
	adb shell am start -n "com.dergoogler.mmrl.debug/com.dergoogler.mmrl.MainActivity" -a android.intent.action.MAIN -c android.intent.category.LAUNCHER

generateDebugApp: dev
	cd .. && cd Android && ./gradlew installDebug


